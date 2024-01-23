import React, { useEffect } from "react";
import EmployerSidebar from "../../../shared/Employer-Sidebar";
import HeaderLogged from "../../../shared/HeaderLogged";
import { Link } from "react-router-dom";
import { fetchJobApplicants } from "../../../../states/actions/jobApplicants";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { API_UPLOADS_URL } from "../../../../constants/paths";
import moment from "moment/moment";
import ReactHtmlParser from "html-react-parser";

const Applicants = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.jobApplicants.content.applicants);

  useEffect(() => {
    dispatch(fetchJobApplicants(id));
  }, []);

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
                  Dashboard <span>/ Applicants</span>
                </h3>
              </div>
              <div className="dash_body">
                <div className="flex job_flex candidate_flex_lst dash_board_candidates">
                  {data?.length > 0 ? (
                    data?.map((item, index) => (
                      <div className="col" key={index}>
                        <div className="inner">
                          <Link to="/" className="chat_abt_blk">
                            <img src="/images/dashboard/chat.svg" alt="" />
                          </Link>
                          <div className="head_job">
                            <div className="img_ico">
                              <img
                                src={
                                  API_UPLOADS_URL +
                                  "/members/" +
                                  item?.mem_image
                                }
                                alt=""
                              />
                            </div>
                            <div className="cntnt">
                              <h4>
                                <Link to="/candidate-profile">
                                  {item?.mem_fname + " " + item?.mem_lname}
                                </Link>
                              </h4>
                              <p>
                                <small>{item?.profession}</small>
                              </p>
                            </div>
                          </div>
                          <div className="job_bdy">
                            <ul>
                              <li>
                                <i className="fi fi-rr-marker"></i>{" "}
                                <span>
                                  {item?.mem_country}, {item?.mem_city}
                                </span>
                              </li>
                              <li>
                                <i className="fi fi-rr-briefcase"></i>{" "}
                                <span>
                                  {item?.mem_experience} Years Experience
                                </span>
                              </li>
                            </ul>
                            <div className="skils">
                              {item?.job_tags?.split(",").map((tag, index) => (
                                <span key={index}>{tag}</span>
                              ))}
                            </div>
                          </div>
                          <div className="act_dash_lnk_new">
                            <h5>
                              <strong>Cover Letter</strong>
                            </h5>
                            {ReactHtmlParser(item?.cover_letter)}
                          </div>
                          <div className="download_resume">
                            <a className="webBtn icoBtn" href={API_UPLOADS_URL + "/members/resume/" + item?.resume}>
                              Download Resume
                            </a>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col">
                      <div className="inner">
                        <div className="no_data">
                          <h4>No Applicants Found</h4>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Applicants;
