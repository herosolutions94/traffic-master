import React, { useEffect } from "react";
import Sidebar from "../../../shared/Sidebar";
import HeaderLogged from "../../../shared/HeaderLogged";
import { Link } from "react-router-dom";
import { fetchCandidateApplications } from "../../../../states/actions/candidateApplications";
import { useSelector, useDispatch } from "react-redux";
import { API_UPLOADS_URL } from "../../../../constants/paths";
import moment from "moment/moment";
import ReactHtmlParser from "html-react-parser";
import LoadingScreen from "../../../common/LoadingScreen";

const AppliedJobs = () => {
  const dispatch = useDispatch();
  const data = useSelector(
    (state) => state.candidateApplications.content.applications
  );
  const isLoading = useSelector(state => state.candidateApplications.isLoading);

  useEffect(() => {
    dispatch(fetchCandidateApplications());
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
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
                      Dashboard <span>/ Applied Jobs</span>
                    </h3>
                  </div>
                  <div className="dash_body">
                    <div className="flex job_flex applied_job_flex">
                      {data?.length > 0 ? (
                        data.map((job) => (
                          <div className="col">
                            <div className="inner">
                              <div className="book_mark">
                                <i className="fi fi-rr-bookmark" />
                              </div>
                              <div className="head_job">
                                <div className="img_ico">
                                  <img
                                    src={
                                      API_UPLOADS_URL +
                                      "/jobs/" +
                                      job.company_logo
                                    }
                                    alt=""
                                  />
                                </div>
                                <div className="cntnt">
                                  <h4>
                                    <Link to={`/job-details/${job.id}`}>
                                      {job.title}
                                    </Link>
                                  </h4>
                                  <ul>
                                    <li>
                                      <i className="fi fi-rr-marker" />{" "}
                                      <span>{job.city}</span>
                                    </li>
                                    <li>
                                      <i className="fi fi-rr-briefcase" />{" "}
                                      <span>{job.job_type_name}</span>
                                    </li>
                                    <li>
                                      <i className="fi fi-rr-clock-two" />{" "}
                                      <span>
                                        {moment(job.created_date).fromNow()}
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="job_bdy">
                                <p>{ReactHtmlParser(job?.description)}</p>
                                <div className="skils">
                                  {job.tags?.split(",").map((tag, index) => (
                                    <span key={index}>{tag}</span>
                                  ))}
                                </div>
                              </div>
                              <div className="job_footer">
                                <div className="job_price">
                                  ${job.min_salary} - ${job.max_salary}
                                </div>
                                <Link
                                  to={`/job-details/${job.id}`}
                                  className="webBtn mdBtn"
                                >
                                  View Details
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col">
                          <div className="inner">
                            <div className="no_job">
                              <h4 className="text-center">No Job Found</h4>
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
      )}
    </>
  );
};

export default AppliedJobs;
