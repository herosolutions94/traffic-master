import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [sideBarOptions, setSideBarOptions] = useState(
    [
      {
        title: "Dashboard",
        icon: "/images/dashboard/dashboard.svg",
        link: "/candidate/dashboard",
        active: false,
      },
      {
        title: "My CV",
        icon: "/images/dashboard/file.svg",
        link: "/candidate/cv",
        active: false,
      },
      {
        title: "Applied Jobs",
        icon: "/images/dashboard/briefcase.svg",
        link: "/candidate/applied-jobs",
        active: false,
      },
      {
        title: "Saved Jobs",
        icon: "/images/dashboard/briefcase.svg",
        link: "/candidate/saved-jobs",
        active: false,
      }
      // {
      //   title: "Offers",
      //   icon: "/images/dashboard/document.svg",
      //   link: "/candidate/offers",
      //   active: false,
      // },
      // {
      //   title: "Payment Method",
      //   icon: "/images/dashboard/wallet.svg",
      //   link: "/candidate/payment-method",
      //   active: false,
      // },
      // {
      //   title: "Pricing Plans",
      //   icon: "/images/dashboard/tags.svg",
      //   link: "/candidate/pricing-plans",
      //   active: false,
      // },

    ]
  );

  const memType = localStorage.getItem("memType");
  if (memType === "employer") {
    let options = [
      {
        title: "Payment Method",
        icon: "/images/dashboard/wallet.svg",
        link: "/candidate/payment-method",
        active: false,
      },
      {
        title: "Pricing Plans",
        icon: "/images/dashboard/tags.svg",
        link: "/candidate/pricing-plans",
        active: false,
      },
    ];
    setSideBarOptions([...sideBarOptions, ...options]);
  }

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
          <li key={index} className={item.active ? "active" : ""}>
            <Link to={item.link} onClick={() => handleActiveClass(index)}>
              <div className="small_icon">
                <img src={item.icon} alt="" />
              </div>
              <span>{item.title}</span>
            </Link>
          </li>
        ))}

        {/* <li className="active">
          <Link to="/candidate/dashboard">
            <div className="small_icon">
              <img src="/images/dashboard/dashboard.svg" alt="" />
            </div>
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="">
          <Link to="/candidate/cv">
            <div className="small_icon">
              <img src="/images/dashboard/file.svg" alt="" />
            </div>
            <span>My CV</span>
          </Link>
        </li>
        <li className="">
          <Link to="/candidate/applied-jobs">
            <div className="small_icon">
              <img src="/images/dashboard/briefcase.svg" alt="" />
            </div>
            <span>Applied Jobs</span>
          </Link>
        </li>
        <li className="">
          <a href>
            <div className="small_icon">
              <img src="/images/dashboard/document.svg" alt="" />
            </div>
            <span>Offers</span>
          </a>
        </li>
        <li className="">
          <Link to="/candidate/payment-method">
            <div className="small_icon">
              <img src="/images/dashboard/wallet.svg" alt="" />
            </div>
            <span>Payment Method</span>
          </Link>
        </li>
        <li className="">
          <Link to="/candidate/pricing-plans">
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

export default Sidebar;
