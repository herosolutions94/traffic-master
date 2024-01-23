import React, { useState } from "react";
import Sidebar from "../../../shared/Sidebar";
import HeaderLogged from "../../../shared/HeaderLogged";
import { Link } from "react-router-dom";

const PaymentMethodCandidate = () => {
  const [pushPopup, setPushPopup] = useState(false);
  const TogglePush = () => {
    setPushPopup(!pushPopup);
  }
  return (
    <>
      <HeaderLogged />
      <main dashboard="">
        <section className="dash_outer">
          <div className="inner_dash">
            <div className="side_bar">
              <Sidebar />
            </div>
            <div className="content_area">
              <div className="dash_header">
                <h3>
                  Dashboard <span>/ Payment Method</span>
                </h3>
                <div className="bTn">
                  <Link to="/candidate/add-payment-method" className="webBtn">Add new payment method</Link>
                </div>
              </div>
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
                      <tr>
                        <td>HSBC </td>
                        <td>John Doe</td>
                        <td>************3345</td>
                        <td>138742947283</td>
                        <td><span className="badge green">Default</span></td>
                        <td className="dash_actions">
                          <Link to="/" className="webBtn labelBtn blue-color">Edit</Link>
                          <Link to="/" onclick="return confirm('Are you sure?');" className="webBtn labelBtn red-color">Delete</Link>
                        </td>
                      </tr>
                      <tr>
                        <td>HSBC</td>
                        <td>John Doe</td>
                        <td>************3345</td>
                        <td>138742947283</td>
                        <td><span className="badge">Make Default</span></td>
                        <td className="dash_actions">
                          <Link to="/" className="webBtn labelBtn blue-color">Edit</Link>
                          <Link to="/" onclick="return confirm('Are you sure?');" className="webBtn labelBtn red-color">Delete</Link>
                        </td>
                      </tr>
                      <tr>
                        <td>HSBC</td>
                        <td>John Doe</td>
                        <td>************3345</td>
                        <td>138742947283</td>
                        <td><span className="badge">Make Default</span></td>
                        <td className="dash_actions">
                          <Link to="/" className="webBtn labelBtn blue-color">Edit</Link>
                          <Link to="/" onclick="return confirm('Are you sure?');" className="webBtn labelBtn red-color">Delete</Link>
                        </td>
                      </tr>
                      <tr>
                        <td>HSBC</td>
                        <td>John Doe</td>
                        <td>************3345</td>
                        <td>138742947283</td>
                        <td><span className="badge">Make Default</span></td>
                        <td className="dash_actions">
                          <Link to="/" className="webBtn labelBtn blue-color">Edit</Link>
                          <Link to="/" onclick="return confirm('Are you sure?');" className="webBtn labelBtn red-color">Delete</Link>
                        </td>
                      </tr>
                      <tr>
                        <td>HSBC</td>
                        <td>John Doe</td>
                        <td>************3345</td>
                        <td>138742947283</td>
                        <td><span className="badge">Make Default</span></td>
                        <td className="dash_actions">
                          <Link to="/" className="webBtn labelBtn blue-color">Edit</Link>
                          <Link to="/" onclick="return confirm('Are you sure?');" className="webBtn labelBtn red-color">Delete</Link>
                        </td>
                      </tr>
                      <tr>
                        <td>HSBC</td>
                        <td>John Doe</td>
                        <td>************3345</td>
                        <td>138742947283</td>
                        <td><span className="badge">Make Default</span></td>
                        <td className="dash_actions">
                          <Link to="/" className="webBtn labelBtn blue-color">Edit</Link>
                          <Link to="/" onclick="return confirm('Are you sure?');" className="webBtn labelBtn red-color">Delete</Link>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default PaymentMethodCandidate;