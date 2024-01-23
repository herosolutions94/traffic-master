import React from "react";
import { saveLikeJob } from "../../../states/actions/likeJobs";
import { Link } from "react-router-dom";
import moment from "moment";
import ReactHtmlParser from 'html-react-parser';
import { API_UPLOADS_URL } from "../../../constants/paths";

export default function SingleJobBlk({ job, islogin, handleSaveJob, handleCopyLink, index }) {
    return <>
        <div className="col">
            <div className="inner">
                <div className="cta_act_btn">
                    <a href className="share_btn" onClick={() => handleCopyLink(index)}>
                        <i className="fi fi-share-alt" />
                    </a>
                    {islogin &&
                        job?.saved ? (
                        <a href className="like_btn active_btn">
                            <i className="fi fi-heart" />
                        </a>
                    ) : (
                        <a href className="like_btn" onClick={() => handleSaveJob(job?.id)}>
                            <i className="fi fi-heart" />
                        </a>
                    )
                    }
                </div>
                <div className="head_job">
                    <div className="img_ico">
                        <img
                            src={job?.company_logo ? API_UPLOADS_URL + "/jobs/" + job?.company_logo : "/images/dummy_img.png"}
                            alt
                        />
                    </div>
                    <div className="cntnt">
                        <div className="featured_lbl">{job?.company_name}</div>
                        <h4>
                            <Link to={`/job-details/${job?.id}`}>{job?.title}</Link>
                        </h4>
                        <ul>
                            <li>
                                <i className="fi fi-rr-marker" />{" "}
                                <span>{job?.city}</span>
                            </li>
                            <li>
                                <i className="fi fi-rr-briefcase" />{" "}
                                <span>{job?.job_type?.title}</span>
                            </li>
                            <li>
                                <i className="fi fi-rr-clock-two" />
                                <span>{moment(job?.created_date).fromNow()}</span>

                            </li>
                        </ul>
                    </div>
                </div>
                <div className="job_bdy">
                    {job?.description?.length > 200 ? (
                        <p>
                            {ReactHtmlParser(job?.description?.substring(0, 200))}...
                        </p>
                    ) : (
                        <p>{ReactHtmlParser(job?.description)}</p>
                    )}
                    <div className="skils">
                        {job?.tags?.split(",").map((tag, index) => (
                            <span key={index}>{tag}</span>
                        ))}
                    </div>
                </div>
                <div className="job_footer">
                    <div className="job_price">
                        ${job?.min_salary} - ${job?.max_salary}
                    </div>
                </div>
            </div>
        </div>

    </>
}
