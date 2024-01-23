import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const HeaderLogged = () => {
  const [dropDownOne, setDropdownOne] = useState(false);
  const firstDropdown = () => {
    setDropdownOne(!dropDownOne);
  };

  const memType = localStorage.getItem('memType');

  const dropOneRef = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (dropOneRef.current && !dropOneRef.current.contains(e.target)) {
        setDropdownOne(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);

  useDocumentTitle("Dashboard");

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("authToken");
    localStorage.removeItem("memType");
    localStorage.removeItem("memName");
    localStorage.removeItem("isFirstStepCompleted");
    localStorage.removeItem("isSecondStepCompleted");
    window.location.replace("/signin");
  };
  return (
    <>
      <header className="ease logged_header">
        <div className="contain-custom">
          <div className="logo">
            <Link to="/">
              <img src="/images/logo.png" alt="" />
            </Link>
          </div>
          <div className="toggle">
            <span></span>
          </div>
          <nav className="ease">
            <ul id="nav" className="loged-nav">
              <li>
                <Link to={`/${memType}/notification`}>
                  <span className="active"></span>
                  <img
                    src="/images/dashboard/bell.svg"
                    alt=""
                    className="ring_bell"
                  />
                </Link>
              </li>
              <li>
                <Link to={`/${memType}/chat`}>
                  <span className="active chat_box"></span>
                  <img src="/images/dashboard/chat.svg" alt="" />
                </Link>
              </li>
            </ul>

            <ul id="nav" nav className="hide_ds">
              <li className="">
                <a href="my-jobs.php">My Jobs</a>
              </li>
              <li className="">
                <a href="?">View Offers</a>
              </li>
              <li className="">
                <a href="payment-method.php">Payment Method</a>
              </li>
              <li className="">
                <a href="pricing-plan.php">Pricing Plans</a>
              </li>
            </ul>

            <div className="proIco dropDown">
              <div
                className="inside dropBtn"
                onClick={firstDropdown}
                ref={dropOneRef}
              >
                <div className="ico">
                  <img src="/images/user.png" alt="" />
                </div>
              </div>
              <ul
                className={
                  dropDownOne ? "proDrop dropCnt active" : "proDrop dropCnt"
                }
              >
                <li>
                  <div className="user_header">
                    <h5>{localStorage.getItem("memName")}</h5>
                  </div>
                </li>
                <li>
                  <Link to="/">
                    <div className="small_icon">
                      <img src="/images/dashboard/dashboard.svg" alt="" />
                    </div>
                    <span>Home</span>
                  </Link>
                </li>
                <li style={{ display: "none" }}>
                  <Link to="/dashboard">
                    <div className="small_icon">
                      <img src="/images/dashboard/bell.svg" alt="" />
                    </div>
                    <span>Notifications</span>
                  </Link>
                </li>
                <li style={{ display: "none" }}>
                  <Link to="/dashboard">
                    <div className="small_icon">
                      <img src="/images/dashboard/chat.svg" alt="" />
                    </div>
                    <span>Chat</span>
                  </Link>
                </li>

                <li style={{ display: "none" }}>
                  <a href="account-settings.php">
                    <div className="small_icon">
                      <img src="/images/dashboard/settings.svg" alt="" />
                    </div>
                    <span>Profile Settings</span>
                  </a>
                </li>

                <li>
                  <a href="javascript:void(0)" onClick={logout}>
                    <div className="small_icon">
                      <img src="/images/dashboard/sign-out-alt.svg" alt="" />
                    </div>
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <div className="clearfix"></div>
        </div>
      </header>
      <div className="pBar hidden">
        <span id="myBar" style={{ width: "0%" }}></span>
      </div>
    </>
  );
};

export default HeaderLogged;
