import React from "react";
import { Link } from "react-router-dom";


const DashboardStatCard = ({ title, number, icon, link }) => {
  return (
    <div className="col">
      <div >
        <Link to={link} className="inner">
          <div className="cntnt">
            <p>{title}</p>
            <h5>{number}</h5>
          </div>
          <div className="tile_icon">
            <img src={`/images/dashboard/${icon}`} alt="" />
          </div>
        </Link>
      </div>
    </div >
  );
};

export default DashboardStatCard;
