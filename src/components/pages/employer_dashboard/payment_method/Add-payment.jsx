import React, { useState } from "react";
import EmployerSidebar from "../../../shared/Employer-Sidebar";
import HeaderLogged from "../../../shared/HeaderLogged";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { savePaymentMethod } from "../../../../states/actions/paymentMethod";
import FormProcessingSpinner from "../../../common/FormProcessingSpinner";
import { ToastContainer } from "react-toastify";

const AddPaymentMethod = () => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const isFormProcessing = useSelector(
    (state) => state.paymentMethod.isFormProcessing
  );

  const [pushPopup, setPushPopup] = useState(false);
  const TogglePush = () => {
    setPushPopup(!pushPopup);
  }

  const handleSave = (data) => {
    dispatch(savePaymentMethod(data));
  }

  return (
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
                  Dashboard <span>/ Payment Methods </span> <em>/ Add Payment Method</em>
                </h3>
              </div>
              <div className="dash_body">
                <div className="dash_heading_sec">
                  <h2>Add New Payment Method</h2>
                  <Link to="/employer/payment-method">Back to page &gt;&gt;</Link>
                </div>
                <div className="dash_blk_box">
                  <form action method="post" className="frmAjax" id="frmTopic"
                    onSubmit={handleSubmit(handleSave)}
                  >
                    <div className="formRow row">
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">Bank Name</label>
                          <input
                            type="text"
                            className="txtBox"
                            {...register("bank_name", {
                              required: "Bank Name is required",
                            })}

                          />
                          {errors.bank_name && (
                            <span className="validation-error">{errors.bank_name.message}</span>
                          )}

                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">Account Title</label>
                          <input type="text"
                            className="txtBox"
                            {...register("account_title", {
                              required: "Account Title is required",
                            })}
                          />
                          {errors.account_title && (
                            <span className="validation-error">{errors.account_title.message}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">Account Number</label>
                          <input type="number"
                            className="txtBox"
                            {...register("account_number", {
                              required: "Account Number is required",
                            })}
                          />
                          {errors.account_number && (
                            <span className="validation-error">{errors.account_number.message}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">Swift/Routing#</label>
                          <input type="number"
                            className="txtBox"
                            {...register("swift_no", {
                              required: "Swift/Routing# is required",
                            })}
                          />
                          {errors.swift_no && (
                            <span className="validation-error">{errors.swift_no.message}</span>
                          )}

                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">Name on Card</label>
                          <input type="text"
                            className="txtBox"
                            {...register("name_on_card", {
                              required: "Name on Card is required",
                            })}
                          />
                          {errors.name_on_card && (
                            <span className="validation-error">{errors.name_on_card.message}</span>
                          )}

                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">Expiration Date</label>
                          <input type="date"
                            className="txtBox"
                            {...register("expire_date", {
                              required: "Expiration Date is required",
                            })}
                          />
                          {errors.expire_date && (
                            <span className="validation-error">{errors.expire_date.message}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">CVC</label>
                          <input type="text"
                            className="txtBox"
                            {...register("cvc", {
                              required: "CVC is required",
                            })}
                          />
                          {errors.cvc && (
                            <span className="validation-error">{errors.cvc.message}</span>
                          )}

                        </div>
                      </div>
                      <div className="col-md-6">
                        <span>Make Default</span>
                        <div className="switchBtn">
                          <input
                            type="checkbox"
                            name="status"
                            id="full-time"
                            {...register("status")}

                          />
                        </div>
                      </div>
                    </div>
                    {/* <div className="bTn formBtn text-center">
                      <button type="submit" className="webBtn">Submit <i className="spinner hidden" /></button>
                    </div> */}

                    <div className="bTn formBtn text-center">
                      <button
                        type="submit"
                        className="webBtn icoBtn"
                        disabled={isFormProcessing}
                      >
                        Submit
                        <FormProcessingSpinner
                          isFormProcessing={isFormProcessing}
                        />
                      </button>
                    </div>


                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AddPaymentMethod;