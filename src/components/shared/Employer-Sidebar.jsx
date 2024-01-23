import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const EmployerSidebar = () => {
  const [sideBarOptions, setSideBarOptions] = useState(
    [
      {
        title: "Dashboard",
        icon: "/images/dashboard/dashboard.svg",
        link: "/employer/dashboard",
        active: false,
      },
      {
        title: "My Jobs",
        icon: "/images/dashboard/briefcase.svg",
        link: "/employer/my-jobs",
        active: false,
      },
      // {
      //   title: "View Offers",
      //   icon: "/images/dashboard/document.svg",
      //   link: "/employer/view-offers",
      //   active: false,
      // },
      {
        title: "Payment Method",
        icon: "/images/dashboard/wallet.svg",
        link: "/employer/payment-method",
        active: false,
      },
      {
        title: "Pricing Plans",
        icon: "/images/dashboard/tags.svg",
        link: "/employer/pricing-plans",
        active: false,
      },
      {
        title: "Saved Jobs",
        icon: "/images/dashboard/briefcase.svg",
        link: "/employer/saved-jobs",
        active: false,
      },
    ]
  );

  useEffect(() => {
    const path = window.location.pathname;
    const newSideBarOptions = [...sideBarOptions];
    newSideBarOptions.forEach((item) => {
      if (item.link === path) {
        item.active = true;
      } else {
        item.active = false;
      }
    });
    setSideBarOptions(newSideBarOptions);
  }, []);

  const handleActiveClass = (index) => {
    const newSideBarOptions = [...sideBarOptions];
    newSideBarOptions.forEach((item, i) => {
      if (i === index) {
        item.active = true;
      } else {
        item.active = false;
      }
    });
    setSideBarOptions(newSideBarOptions);
  };

  return (
    <>
      <ul>
        {sideBarOptions.map((item, index) => (
          <li key={index} className={item.active ? "active" : ""} onClick={() => handleActiveClass(index)}>
            <Link to={item.link}>
              <div className="small_icon">
                <img src={item.icon} alt="" />
              </div>
              <span>{item.title}</span>
            </Link>
          </li>
        ))}

        {/* <li className="active">
          <Link to="/employer/dashboard">
            <div className="small_icon">
              <img src="/images/dashboard/dashboard.svg" alt="" />
            </div>
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="">
          <Link to="/employer/my-jobs">
            <div className="small_icon">
              <img src="/images/dashboard/briefcase.svg" alt="" />
            </div>
            <span>My Jobs</span>
          </Link>
        </li>
        <li className="">
          <Link to="/">
            <div className="small_icon">
              <img src="/images/dashboard/document.svg" alt="" />
            </div>
            <span>View Offers</span>
          </Link>
        </li>
        <li className="">
          <Link to="/employer/payment-method">
            <div className="small_icon">
              <img src="/images/dashboard/wallet.svg" alt="" />
            </div>
            <span>Payment Method</span>
          </Link>
        </li>
        <li className="">
          <Link to="/employer/pricing-plans">
            <div className="small_icon">
              <img src="/images/dashboard/tags.svg" alt="" />
            </div>
            <span>Pricing Plans</span>
          </Link>
        </li> */}
      </ul>
    </>
  );
};

export default EmployerSidebar;
