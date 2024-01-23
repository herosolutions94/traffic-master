import React from "react";
import JobActions from "../pages/employer_dashboard/JobActions";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SaveJob from "../pages/candidate_dashboard/SaveJob";
import { API_UPLOADS_URL } from "../../constants/paths";
import moment from "moment/moment";
import { useLocation } from 'react-router-dom';
import ImageControl from "./ImageControl";


const DashboardSmallJob = ({ togglePush, data, link }) => {
  const memType = useSelector((state) => state.fetchSignin.memType);
  const location = useLocation();

  return (
    <div className="col">
      {/* <div className="inner"> */}
      {/* {memType === "employer" ? (
          <JobActions togglePush={togglePush} />
        ) : (
          <SaveJob />
        )} */}
      {data?.length > 0 ? (
        data.map((job) => (
          <div className="inner">
            <div className="head_job">
              <div className="img_ico">
                <ImageControl folder='jobs' src={job.company_logo} />
              </div>
              <div className="cntnt">
                <h4>
                  <Link to={`/job-details/${job.id}`}>{job.title}</Link>
                </h4>
                <ul>
                  <li>
                    <i className="fi fi-rr-marker" /> <span>{job.city}</span>
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
            <div className="job_footer">
              <div className="job_price">
                ${job.min_salary} - ${job.max_salary}
                <span></span>
              </div>
              <Link

                // to={`/job-details/${job.id}`}
                to={location.pathname === "/employer/dashboard" ? '/candidate/candidate-detail/' + job?.candidate_id : `/job-details/${job.id}`}
                className="webBtn mdBtn">
                {/* View Detail */}
                {location.pathname === "/employer/dashboard" ? 'Candidate Detail' : 'View Detail'}
              </Link>
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
      {/* </div> */}
    </div>
  );
};

export default DashboardSmallJob;
