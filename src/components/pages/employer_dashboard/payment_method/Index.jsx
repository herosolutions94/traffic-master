import React, { useState, useEffect } from "react";
import EmployerSidebar from "../../../shared/Employer-Sidebar";
import HeaderLogged from "../../../shared/HeaderLogged";
import { Link } from "react-router-dom";
import { fetchPaymentMethods, deletePaymentMethod } from "../../../../states/actions/paymentMethod";
import { useSelector, useDispatch } from "react-redux";
import LoadingScreen from "../../../common/LoadingScreen";
import { ToastContainer } from "react-toastify";

const PaymentMethod = () => {
  const dispatch = useDispatch();
  const [pushPopup, setPushPopup] = useState(false);
  const data = useSelector((state) => state.paymentMethod.paymentMethods);
  const isLoading = useSelector((state) => state.paymentMethod.isLoading);
  const isDeleting = useSelector((state) => state.paymentMethod.isDeleting);


  // const TogglePush = () => {
  //   setPushPopup(!pushPopup);
  // }

  const handleDelete = (id) => {
    dispatch(deletePaymentMethod(id));
  };

  useEffect(() => {
    dispatch(fetchPaymentMethods());
  }, []);
  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <ToastContainer />
          <HeaderLogged />
          <main dashboard="">
            <section className="dash_outer">
              <div className="inner_dash">
                <div className="side_bar">
                  <EmployerSidebar />
                </div>
                <div className="content_area">
                  <div className="dash_header">
                    <h3>
                      Dashboard <span>/ Payment Method</span>
                    </h3>
                    <div className="bTn">
                      <Link to="/employer/add-payment-method" className="webBtn">Add new payment method</Link>
                    </div>
                  </div>
                  {isDeleting ? (
                    <div className="dash_blk_box text-center" role="alert">
                      Deleting...
                    </div>
                  ) : (
                    <div className="dash_body">
                      <div className="dash_blk_box blockLst payment_tbl">
                        <table>
                          <thead>
                            <tr>
                              <th>Bank Name</th>
                              <th>Account Title</th>
                              <th>Account Number</th>
                              <th>Swift/Routing #</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.length > 0 ? (
                              data.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.bank_name} </td>
                                  <td>{item.account_title}</td>
                                  <td>{item.account_number}</td>
                                  <td>{item.swift_no}</td>
                                  <td>
                                    <span className={`badge ${item.status == 1 ? 'green' : ''}`}>
                                      {item.status == 1 ? 'Default' : 'Make Default'}
                                    </span>
                                  </td>
                                  <td className="dash_actions">
                                    <Link to={`/employer/edit-payment-method/${item.id}`} className="webBtn labelBtn blue-color">Edit</Link>
                                    <Link
                                      onClick={() => { if (window.confirm('Are you sure you wish to delete this payment method?')) handleDelete(item.id) }}
                                      className="webBtn labelBtn red-color"
                                    >
                                      Delete
                                    </Link>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={6} className="text-center">
                                  No Record Found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </main>
        </>
      )}
    </>
  );
};

export default PaymentMethod;