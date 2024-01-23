import React, { useState, useEffect } from "react";
import Sidebar from "../../../shared/Sidebar";
import HeaderLogged from "../../../shared/HeaderLogged";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSavedJobs, deleteSavedJob } from "../../../../states/actions/fetchSavedJobs";
import { API_UPLOADS_URL } from "../../../../constants/paths";
import moment from "moment/moment";
import { ToastContainer } from "react-toastify";
import ReactHtmlParser from 'html-react-parser';
import LoadingScreen from "../../../common/LoadingScreen";
import ImageControl from "../../../common/ImageControl";

const SavedJobs = () => {
    const dispatch = useDispatch();
    const jobs = useSelector((state) => state.fetchSavedJobs.content.jobs);
    const isLoading = useSelector((state) => state.fetchSavedJobs.isLoading);
    const isDeleting = useSelector((state) => state.fetchSavedJobs.isDeleting);

    useEffect(() => {
        dispatch(fetchSavedJobs());
    }, []);

    const handleDelete = (id) => {
        dispatch(deleteSavedJob(id));
    };

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
                                    <Sidebar />
                                </div>
                                <div className="content_area">
                                    <div className="dash_header">
                                        <h3>
                                            Dashboard <span>/ Saved Jobs</span>
                                        </h3>
                                    </div>
                                    <div className="dash_body">
                                        <div className="flex job_flex applied_job_flex">
                                            {isDeleting ? (
                                                <div className="col">
                                                    <div className="inner">
                                                        Deleting...
                                                    </div>
                                                </div>
                                            ) : (
                                                jobs?.length > 0 ? (
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
                                                                                    onClick={() => { if (window.confirm('Are you sure you wish to delete this job?')) handleDelete(job.id) }}
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
                                                                    <div className="applicant_lst_flex"></div>
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
                                                )
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

export default SavedJobs;
