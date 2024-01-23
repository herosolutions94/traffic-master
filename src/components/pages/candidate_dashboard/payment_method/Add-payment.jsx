import React, { useState } from "react";
import Sidebar from "../../../shared/Sidebar";
import HeaderLogged from "../../../shared/HeaderLogged";
import { Link } from "react-router-dom";

const AddPaymentMethodCandidate = () => {
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
                  Dashboard <span>/ Payment Methods </span> <em>/ Add Payment Method</em>
                </h3>
              </div>
              <div className="dash_body">
                <div className="dash_heading_sec">
                  <h2>Add New Payment Method</h2>
                  <Link to="/candidate/payment-method">Back to page &gt;&gt;</Link>
                </div>
                <div className="dash_blk_box">
                  <form action method="post" className="frmAjax" id="frmTopic">
                    <div className="formRow row">
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">Name On Card</label>
                          <input type="text" name="" className="txtBox" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">Card Number</label>
                          <input type="text" name="" className="txtBox" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">Expiration</label>
                          <input type="text" name="" className="txtBox" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">CVC</label>
                          <input type="text" name="" className="txtBox" />
                        </div>
                      </div>
                    </div>
                    <div className="bTn formBtn text-center">
                      <button type="submit" className="webBtn">Submit <i className="spinner hidden" /></button>
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

export default AddPaymentMethodCandidate;