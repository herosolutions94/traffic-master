import React, { useState, useEffect } from "react";
import EmployerSidebar from "../../../shared/Employer-Sidebar";
import HeaderLogged from "../../../shared/HeaderLogged";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobs } from "../../../../states/actions/employerJobs";
import { deleteJob } from "../../../../states/actions/employerJobs";
import { API_UPLOADS_URL } from "../../../../constants/paths";
import moment from "moment/moment";
import { ToastContainer } from "react-toastify";
import ReactHtmlParser from 'html-react-parser';
import JobPush from "./Job-push";
import { jobPush } from "../../../../states/actions/jobPush";
import LoadingScreen from "../../../common/LoadingScreen";
import ImageControl from "../../../common/ImageControl";

const MyJobs = () => {
  const [pushPopup, setPushPopup] = useState(false);
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.employerJobs.content.jobs);
  const pricing_plan = useSelector((state) => state.employerJobs.content.pricing_plan);
  // const total_saved_jobs = useSelector((state) => state.employerJobs.content.total_saved_jobs);
  // const total_saved_jobs_allowed = useSelector((state) => state.employerJobs.content.total_saved_jobs_allowed);
  const remaining_post_jobs = useSelector((state) => state.employerJobs.content.remaining_post_jobs);
  const isLoading = useSelector((state) => state.employerJobs.isLoading);
  const [pushJobId, setPushJobId] = useState(null);

  const TogglePush = (id) => {
    setPushJobId(id);
    setPushPopup(!pushPopup);
  };
  useEffect(() => {
    dispatch(fetchJobs());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteJob(id));
  };

  const handlePush = () => {
    setPushPopup(!pushPopup);
    dispatch(jobPush(pushJobId));
  };
  console.log(jobs);


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
                      Dashboard <span>/ My Jobs</span>
                    </h3>
                    <div className="bTn">
                      <Link to="/employer/post-job" className="webBtn">
                        Post New Job
                      </Link>

                    </div>
                  </div>

                  <div>
                    Total jobs posting left: <span className="jobs-left"> {remaining_post_jobs ? remaining_post_jobs : 0} </span>
                  </div>
                  <div className="dash_body">
                    <div className="flex job_flex applied_job_flex">
                      {jobs?.length > 0 ? (
                        jobs.map((job) => (
                          <div className="col">
                            <div className="inner">
                              <div className="dropDown dash_actions absolute_action">
                                <span className="dropBtn">
                                  <i className="fi fi-rr-menu-dots"></i>
                                </span>
                                <div className="dropCnt">
                                  <ul className="dropLst">
                                    <li>
                                      <Link
                                        to={`/employer/edit-job/${job.id}`}
                                        className="webBtn labelBtn blue-color"
                                      >
                                        Edit
                                      </Link>
                                    </li>
                                    <li>
                                      <div
                                        onClick={() => TogglePush(job.id)}
                                        className="webBtn labelBtn blue-color"
                                      >
                                        Push
                                      </div>
                                    </li>
                                    <li>
                                      <Link
                                        onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) handleDelete(job.id) }}
                                        className="webBtn labelBtn red-color"
                                      >
                                        Delete
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="head_job">
                                <div className="img_ico">
                                  <ImageControl isThumb={true} folder="jobs" src={job.company_logo} />
                                </div>
                                <div className="cntnt">
                                  <div className="featured_lbl">{job.company_name}</div>
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
                                      <span>{moment(job.created_date).fromNow()}</span>

                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="job_bdy">
                                <p>
                                  {job.description && ReactHtmlParser(job?.description)}
                                  {/* {ReactHtmlParser(job?.description)} */}

                                  {/* {job.description} */}
                                </p>
                                <div className="skils">
                                  {job.tags?.split(',').map((tag, index) => (
                                    <span key={index}>{tag}</span>
                                  ))}
                                </div>
                              </div>
                              <div className="job_footer">
                                <div className="applicant_lst_flex">
                                  <ul>
                                    {job.applicants.length > 0 && job.applicants.slice(0, 3).map((applicant) => (
                                      <li>
                                        <ImageControl isThumb={true} folder="members" src={applicant.mem_image} />
                                      </li>
                                    ))}
                                  </ul>
                                  {job.applicants.length > 0 ? (
                                    <Link to={`/employer/applicants/${job.id}`} className="view_all">
                                      View All Applicant
                                    </Link>
                                  ) : (
                                    <span className="view_all">No Applicants</span>
                                  )}
                                </div>
                                <div>
                                  <div className="job_price">
                                    ${job.min_salary} - ${job.max_salary}<span></span>
                                  </div>
                                  <Link to={`/job-details/${job.id}`} className="webBtn mdBtn">
                                    View Details
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col">
                          <div className="inner">
                            <div className="no_job">
                              <h4 className="text-center">{isLoading ? 'Data Fetching...' : 'No Jobs Found'}</h4>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <JobPush pushPopup={pushPopup} togglePush={TogglePush} noOfPush={pricing_plan?.no_of_push} handlePush={handlePush} />
          </main>
        </>
      )}
    </>
  );
};

export default MyJobs;
