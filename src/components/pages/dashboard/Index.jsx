import React from "react";
import Sidebar from "../../shared/Sidebar";
import HeaderLogged from "../../shared/HeaderLogged";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <HeaderLogged />
      <main dashboard>
        <section className="dash_outer">
          <div className="inner_dash">
            <div className="side_bar">
              <Sidebar />
            </div>
            <div className="content_area">
              <div className="dash_header">
                <h3>
                  Dashboard <span>/ Overview</span>
                </h3>
              </div>
              <div className="dash_body">
                <div className="tiles_blk flex">
                  <div className="col">
                    <div className="inner">
                      <div className="cntnt">
                        <p>Applied Jobs</p>
                        <h5>20</h5>
                      </div>
                      <div className="tile_icon">
                        <img src="images/dashboard/briefcase.svg" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="inner">
                      <div className="cntnt">
                        <p>Received Offers</p>
                        <h5>15</h5>
                      </div>
                      <div className="tile_icon">
                        <img src="images/dashboard/document.svg" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="inner">
                      <div className="cntnt">
                        <p>Messages</p>
                        <h5>22</h5>
                      </div>
                      <div className="tile_icon">
                        <img src="images/dashboard/chat.svg" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="inner">
                      <div className="cntnt">
                        <p>Notifications</p>
                        <h5>12</h5>
                      </div>
                      <div className="tile_icon">
                        <img src="images/dashboard/bell.svg" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dash_heading_sec">
                  <h2>Recently Applied Jobs</h2>
                  <Link to="/dashboard">View all jobs</Link>
                </div>
                <div className="flex job_flex job_flex_100">
                  <div className="col">
                    <div className="inner">
                      <div className="book_mark">
                        <i className="fi fi-rr-bookmark" />
                      </div>
                      <div className="head_job">
                        <div className="img_ico">
                          <img src="images/3-2.png" alt="" />
                        </div>
                        <div className="cntnt">
                          <h4>
                            <Link to="/dashboard">
                              Software Engineer (Android)
                            </Link>
                          </h4>
                          <ul>
                            <li>
                              <i className="fi fi-rr-marker" />{" "}
                              <span>New York, NY</span>
                            </li>
                            <li>
                              <i className="fi fi-rr-briefcase" />{" "}
                              <span>Full time</span>
                            </li>
                            <li>
                              <i className="fi fi-rr-clock-two" />{" "}
                              <span>3 mins ago</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="job_footer">
                        <div className="job_price">
                          $500<span>/Hour</span>
                        </div>
                        <Link to="/dashboard" className="webBtn mdBtn">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="inner">
                      <div className="book_mark">
                        <i className="fi fi-rr-bookmark" />
                      </div>
                      <div className="head_job">
                        <div className="img_ico">
                          <img src="images/3-1.png" alt="" />
                        </div>
                        <div className="cntnt">
                          <h4>
                            <Link to="/dashboard">
                              Software Engineer (Android)
                            </Link>
                          </h4>
                          <ul>
                            <li>
                              <i className="fi fi-rr-marker" />{" "}
                              <span>New York, NY</span>
                            </li>
                            <li>
                              <i className="fi fi-rr-briefcase" />{" "}
                              <span>Full time</span>
                            </li>
                            <li>
                              <i className="fi fi-rr-clock-two" />{" "}
                              <span>3 mins ago</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="job_footer">
                        <div className="job_price">
                          $500<span>/Hour</span>
                        </div>
                        <Link to="/dashboard" className="webBtn mdBtn">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="inner">
                      <div className="book_mark">
                        <i className="fi fi-rr-bookmark" />
                      </div>
                      <div className="head_job">
                        <div className="img_ico">
                          <img src="images/3-3.png" alt="" />
                        </div>
                        <div className="cntnt">
                          <h4>
                            <Link to="/dashboard">
                              Software Engineer (Android)
                            </Link>
                          </h4>
                          <ul>
                            <li>
                              <i className="fi fi-rr-marker" />{" "}
                              <span>New York, NY</span>
                            </li>
                            <li>
                              <i className="fi fi-rr-briefcase" />{" "}
                              <span>Full time</span>
                            </li>
                            <li>
                              <i className="fi fi-rr-clock-two" />{" "}
                              <span>3 mins ago</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="job_footer">
                        <div className="job_price">
                          $500<span>/Hour</span>
                        </div>
                        <Link to="/dashboard" className="webBtn mdBtn">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="inner">
                      <div className="book_mark">
                        <i className="fi fi-rr-bookmark" />
                      </div>
                      <div className="head_job">
                        <div className="img_ico">
                          <img src="images/3-5.png" alt="" />
                        </div>
                        <div className="cntnt">
                          <h4>
                            <Link to="/dashboard">
                              Software Engineer (Android)
                            </Link>
                          </h4>
                          <ul>
                            <li>
                              <i className="fi fi-rr-marker" />{" "}
                              <span>New York, NY</span>
                            </li>
                            <li>
                              <i className="fi fi-rr-briefcase" />{" "}
                              <span>Full time</span>
                            </li>
                            <li>
                              <i className="fi fi-rr-clock-two" />{" "}
                              <span>3 mins ago</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="job_footer">
                        <div className="job_price">
                          $500<span>/Hour</span>
                        </div>
                        <Link to="/dashboard" className="webBtn mdBtn">
                          View Details
                        </Link>
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

export default Dashboard;
