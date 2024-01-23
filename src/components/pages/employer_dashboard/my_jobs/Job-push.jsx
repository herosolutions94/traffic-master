import React from "react";
import { Link } from "react-router-dom";

const JobPush = ({pushPopup, togglePush, noOfPush, handlePush}) => {
  return (
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
            <div className="crosBtn" onClick={togglePush}></div>
            <h4>Push your job on top</h4>
            <p>
              According to your <strong>subscription plan</strong> you can push
              your job on top <strong>{noOfPush} time</strong>.
            </p>
            <br />
            <div className="text-center">
              <Link onClick={handlePush} className="webBtn">
                Push Job
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobPush;
