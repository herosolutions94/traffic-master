import React,{useState} from "react";
import Sidebar from "../../../shared/Sidebar";
import HeaderLogged from "../../../shared/HeaderLogged";
import { Link } from "react-router-dom";

const PricingPlansCandidate = () => {
  const[pushPopup,setPushPopup] = useState(false);
  const TogglePush = () =>{
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
                  Dashboard <span>/ Pricing Plans </span>
                </h3>
              </div>
              <div className="dash_body">
                <div className="packages dashboard_pkgs">
                    <div className="flex">
                      <div className="col">
                        <div className="inner">
                          <div className="topBtn">
                            <Link to="/" className="webBtn">Regular</Link>
                          </div>
                          <div className="top-package">
                            <h4>From</h4>
                            <h3>$190</h3>
                          </div>
                          <div className="inner-package">
                            <ul>
                              <li>
                                Job Posting(s)
                              </li>
                              <li>
                                Employer Brand
                              </li>
                              <li>
                                Multi-Broadcasting
                              </li><li>
                                Partial Job Matching
                              </li>
                            </ul>
                          </div>
                          <div className="bTn">
                            <Link to="/" className="webBtn">Choose Plan</Link>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="inner">
                          <div className="topBtn">
                            <Link to="/" className="webBtn">With refresh</Link>
                          </div>
                          <div className="top-package">
                            <h4>From</h4>
                            <h3>$235</h3>
                            {/* <h6>For most businesses that want to otpimize web queries</h6> */}
                          </div>
                          <div className="inner-package">
                            <ul>
                              <li>
                                Job Posting(s)
                              </li>
                              <li>
                                Employer Brand
                              </li>
                              <li>
                                Multi-Broadcasting
                              </li><li>
                                Partial Job Matching
                              </li>
                              <li><i className="fa fa-plus" /></li>
                              <li><strong>Refresh</strong> <small>Back to the top of the list</small></li>
                            </ul>
                          </div>
                          <div className="bTn">
                            <Link to="/" className="webBtn">Choose Plan</Link>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="inner">
                          <div className="topBtn">
                            <Link to="/" className="webBtn">Resume Bank</Link>
                          </div>
                          <div className="top-package">
                            <h4>From</h4>
                            <h3>$370</h3>
                            {/* <h6>For most businesses that want to otpimize web queries</h6> */}
                          </div>
                          <div className="inner-package">
                            <ul>
                              <li>No job postings <i className="fa fa-ban" /></li>
                              <li>Job Matching available <i className="fa fa-info-circle" /><small>Find the profiles matching your active or past jobs</small></li>
                              <li><i className="fa fa-plus" /></li>
                              <li><strong>Resumes &amp; Profiles</strong> <i className="fa fa-info-circle" /> <small>Access to all profiles</small> <small>Unlimited searches</small> <small>Contact interesting profiles</small></li>
                            </ul>
                          </div>
                          <div className="bTn">
                            <Link to="/" className="webBtn blackBtn">Upgrade Plan</Link>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="inner">
                          <div className="topBtn">
                            <Link to="/" className="webBtn">See Our Employer Brand</Link>
                          </div>
                          <div className="top-package">
                            <h4>From</h4>
                            <h3>$200</h3>
                            {/* <h6>For most businesses that want to otpimize web queries</h6> */}
                          </div>
                          <div className="inner-package">
                            <ul>
                              <li>
                                Job Posting(s)
                              </li>
                              <li>
                                Employer Brand
                              </li>
                              <li>
                                Multi-Broadcasting
                              </li><li><strong>Complete Job Matching</strong> <i className="fa fa-info-circle" /> <small>All matching profiles</small></li>
                              <li><i className="fa fa-plus" /></li>
                              <li><strong>Resumes &amp; Profiles</strong> <i className="fa fa-info-circle" /> <small>Access to all profiles</small></li>
                              <li><i className="fa fa-plus" /></li>
                              <li><strong>Featured Job</strong> <i className="fa fa-info-circle" /> <small>Increased &amp; strategic visibility</small></li>
                              <li><i className="fa fa-plus" /></li>
                              <li><strong>Refresh</strong> <i className="fa fa-info-circle" /> <small>Back to the top of the list</small></li>
                            </ul>
                          </div>
                          <div className="bTn">
                            <Link to="/" className="webBtn">Choose Plan</Link>
                          </div>
                        </div>
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

export default PricingPlansCandidate;