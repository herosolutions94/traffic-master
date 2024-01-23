import React from "react";

const JobActions = ({ togglePush }) => {
  return (
    <div className="dropDown dash_actions absolute_action">
      <span className="dropBtn">
        <i className="fi fi-rr-menu-dots"></i>
      </span>
      <div className="dropCnt">
        <ul className="dropLst">
          <li>
            <a href="post-job.php" className="webBtn labelBtn blue-color">
              Edit
            </a>
          </li>
          <li>
            <div onClick={togglePush} className="webBtn labelBtn blue-color">
              Push
            </div>
          </li>
          <li>
            <a
              href="posted-jobs.php"
              onclick="return confirm('Are you sure?');"
              className="webBtn labelBtn red-color"
            >
              Delete
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default JobActions;
