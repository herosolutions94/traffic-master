import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ImageControl from "../common/ImageControl";
import { useSelector } from "react-redux";

const Header = ({ site_settings }) => {
  const { header_footer } = site_settings;
  const authToken = useSelector((state) => state.fetchSignin.authToken);
  const memType = useSelector((state) => state.fetchSignin.memType);
  const [dropDownOne, setDropdownOne] = useState(false);
  const [dropDownTwo, setDropdownTwo] = useState(false);
  const [dropDownThree, setDropdownThree] = useState(false);
  const firstDropdown = () => {
    setDropdownOne(!dropDownOne);
    setDropdownTwo(false);
    setDropdownThree(false);
  };
  const Dropdown = () => {
    setDropdownOne(!dropDownOne);
    setDropdownTwo(false);
    setDropdownThree(false);
  };

  const secondDropdown = () => {
    setDropdownOne(false);
    setDropdownTwo(!dropDownTwo);
    setDropdownThree(false);
  };

  const thirdDropdown = () => {
    setDropdownOne(false);
    setDropdownTwo(false);
    setDropdownThree(!dropDownThree);
  };
  const [toggle, setToggle] = useState(false);
  const ToggleActive = () => {
    setToggle(!toggle);
  };

  const dropOneRef = useRef();
  const dropTwoRef = useRef();
  const dropThreeRef = useRef();
  const DropdownRef = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (authToken) {
        if (
          dropOneRef.current &&
          !dropOneRef.current.contains(e.target) &&
          dropTwoRef.current &&
          !dropTwoRef.current.contains(e.target) &&
          dropThreeRef.current &&
          !dropThreeRef.current.contains(e.target)
        ) {
          setDropdownOne(false);
          setDropdownTwo(false);
          setDropdownThree(false);
        }
      } else {
        if (
          dropOneRef.current &&
          !dropOneRef.current.contains(e.target) &&
          dropTwoRef.current &&
          !dropTwoRef.current.contains(e.target)
        ) {
          setDropdownOne(false);
          setDropdownTwo(false);
        }
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("authToken");
    localStorage.removeItem("memType");
    localStorage.removeItem("memName");
    localStorage.removeItem("isFirstStepCompleted");
    localStorage.removeItem("isSecondStepCompleted");
    window.location.replace("/signin");
  };
  const handleLanguageChange = (e) => {
    localStorage.setItem("site_lang", e.target.value);
    window.location.reload();
  };

  return (
    <>
      <header className="ease">
        <div className="contain">
          <div className="logo">
            <Link to="/">
              <ImageControl folder="images" src={site_settings.site_logo} />
            </Link>
          </div>
          <div
            className={!toggle ? "toggle" : "toggle active"}
            onClick={() => ToggleActive(!toggle)}
          >
            <span></span>
          </div>
          <nav className="ease">
            <ul id="nav" nav="true" className={toggle ? "active" : ""}>
              <li className="">
                <Link to="/jobs/1">{header_footer.link_1}</Link>
              </li>
              {memType !== "employer" && (
                <li className="dropDown">
                  <a
                    href="javascript:void(0)"
                    className="dropBtn"
                    onClick={firstDropdown}
                    ref={dropOneRef}
                  >
                    {header_footer.drop_1} <i className="chevron" />
                  </a>
                  <div className={dropDownOne ? "dropCnt active" : "dropCnt"}>
                    <ul className="dropLst">
                      {!authToken && (
                        <li>
                          <Link to="/signup-candidate">
                            {header_footer.drop_1_link_1}
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link to="/contact-us">
                          {header_footer.drop_1_link_2}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              )}

              {memType !== "candidate" && (
                <li className="dropDown">
                  <a
                    href="javascript:void(0)"
                    className="dropBtn"
                    onClick={secondDropdown}
                    ref={dropTwoRef}
                  >
                    {header_footer.drop_2} <i className="chevron" />
                  </a>

                  <div className={dropDownTwo ? "dropCnt active" : "dropCnt"}>
                    <ul className="dropLst">
                      <li>
                        <Link to="/pricing">
                          {header_footer.drop_2_link_1}
                        </Link>
                      </li>
                      {!authToken && (
                        <li>
                          <Link to="/pricing">{header_footer.drop_2_link_3}</Link>
                        </li>
                      )}
                      {/* <li>
                      <Link to="/post-job">{header_footer.drop_2_link_3}</Link>
                    </li> */}
                      <li>
                        <Link to="/how-it-works">
                          {header_footer.drop_2_link_4}
                        </Link>
                      </li>
                      <li>
                        <Link to="/training-programs">
                          {header_footer.drop_2_link_5}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              )}
              <li className="">
                <Link to="/training-programs">{header_footer.link_2}</Link>
              </li>
              <li className="dropDown">
                <select
                  className="txtBox languageSwitch langSwitchDropDown"
                  onChange={(e) => handleLanguageChange(e)}
                  value={localStorage.getItem("site_lang")}
                >
                  <option value="french">FR</option>
                  <option value="eng">EN</option>
                </select>
              </li>
            </ul>

            {!authToken ? (
              <ul id="cta">
                {/* <li className>
                  <Link to="/signup">{header_footer.link_3}</Link>
                </li> */}
                <li className>
                  <Link to="/signin" className="webBtn mdBtn">
                    {header_footer.site_second_section_heading}
                  </Link>
                </li>
              </ul>
            ) : (
              <div
                className="proIco dropDown"
                onClick={thirdDropdown}
                ref={dropThreeRef}
              >
                <div className="inside dropBtn">
                  <div className="ico">
                    <img src="/images/user.png" alt="" />
                  </div>
                </div>
                <ul
                  className={
                    dropDownThree ? "proDrop dropCnt active" : "proDrop dropCnt"
                  }
                >
                  <li>
                    <div className="user_header">
                      <h5>{localStorage.getItem("memName")}</h5>
                    </div>
                  </li>
                  <li>
                    <Link to={`/${memType}/dashboard`}>
                      <div className="small_icon">
                        <img src="/images/dashboard/dashboard.svg" alt="" />
                      </div>
                      <span>Dashboard</span>
                    </Link>
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
            )}
          </nav>

          <div className="clearfix" />
        </div>
      </header>
      <div className="pBar hidden">
        <span id="myBar" style={{ width: "0%" }} />
      </div>
    </>
  );
};

export default Header;
