import React, { useState } from "react";
import EmployerSidebar from "../../shared/Employer-Sidebar";
import HeaderLogged from "../../shared/HeaderLogged";
import { Link } from "react-router-dom";

const EmployerNotification = () => {
  return (
    <>
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
                  Dashboard <span>/ Notifications</span>
                </h3>
              </div>
              <div className="dash_body">
                <div className="dash_heading_sec">
                  <h2>Notifications</h2>
                </div>
                <div className="dash_blk_box notiBlk">
                  <div className="inner">
                    <div className="ico"><img src="/images/1.png" alt="" /></div>
                    <div className="txt">
                      <p>You have a new order request from Jennifer K. <a href="javascript:void(0)" className="popBtn" data-popup="request-detail">click here</a> to view detail.</p>
                      <span className="time">2 hours ago</span>
                    </div>
                  </div>
                  <div className="inner">
                    <div className="ico"><img src="/images/2.png" alt="" /></div>
                    <div className="txt">
                      <p>You have a new notification. Order completed by Aleena. <a href="javascript:void(0)" className="popBtn" data-popup="request-detail">click here</a> to view detail.</p>
                      <span className="time">3 hours ago</span>
                    </div>
                  </div>
                  <div className="inner">
                    <div className="ico"><img src="/images/new1.jpg" alt="" /></div>
                    <div className="txt">
                      <p>You have a new notification. Your ticket has been expired. <a href="javascript:void(0)" className="popBtn" data-popup="request-detail">click here</a> to view detail.</p>
                      <span className="time">3 hours ago</span>
                    </div>
                  </div>
                  <div className="inner">
                    <div className="ico"><img src="/images/1.png" alt="" /></div>
                    <div className="txt">
                      <p>You have a new order request from Jennifer K. <a href="javascript:void(0)" className="popBtn" data-popup="request-detail">click here</a> to view detail.</p>
                      <span className="time">2 hours ago</span>
                    </div>
                  </div>
                  <div className="inner">
                    <div className="ico"><img src="/images/2.png" alt="" /></div>
                    <div className="txt">
                      <p>You have a new notification. Order completed by Aleena. <a href="javascript:void(0)" className="popBtn" data-popup="request-detail">click here</a> to view detail.</p>
                      <span className="time">3 hours ago</span>
                    </div>
                  </div>
                  <div className="inner">
                    <div className="ico"><img src="/images/new1.jpg" alt="" /></div>
                    <div className="txt">
                      <p>You have a new notification. Your ticket has been expired. <a href="javascript:void(0)" className="popBtn" data-popup="request-detail">click here</a> to view detail.</p>
                      <span className="time">3 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default EmployerNotification;