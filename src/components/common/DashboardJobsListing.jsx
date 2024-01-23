import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardSmallJob from "./DashboardSmallJob";

const DashboardJobsListing = ({ data, link }) => {
  const [pushPopup, setPushPopup] = useState(false);
  const TogglePush = () => {
    setPushPopup(!pushPopup);
  };

  return (
    <>
      <div className="flex job_flex job_flex_100">
        <DashboardSmallJob togglePush={TogglePush} data={data} link={link} />
      </div>
      <section
        className={
          pushPopup
            ? "popup small-popup push_popup active"
            : "popup small-popup push_popup"
        }
      >
        <div className="tableDv">
          <div className="tableCell">
            <div className="_inner">
              <div className="crosBtn" onClick={TogglePush}></div>
              <h4>Push your job on top</h4>
              <p>
                According to your <strong>subscription plan</strong> you can
                push your job on top <strong>3 time</strong>.
              </p>
              <br />
              <div className="text-center">
                <Link to="/" className="webBtn">
                  Push Job
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardJobsListing;
