import React,{useState} from "react";
import EmployerSidebar from "../../../shared/Employer-Sidebar";
import HeaderLogged from "../../../shared/HeaderLogged";
import { Link } from "react-router-dom";

const CompanyProfileSetting = () => {
  return (
    <>
      <HeaderLogged />
      <main dashboard="">
        <section className="dash_outer">
          <div className="inner_dash">
            <div className="side_bar">
              <EmployerSidebar />
            </div>
            <div className="content_area">
              <div className="dash_header">
                <h3>
                  Dashboard <span>/ Company Profile Settings</span>
                </h3>
              </div>
              <div className="dash_body" id="setting">
                    <div className="dash_heading_sec">
                        <h2>Company Profile Settings</h2>
                    </div>
                    <div className="dash_blk_box">
                        <form action method="post">
                            <div className="_header">
                                <h4>Company Details</h4>
                            </div>
                            <div className="upLoadDp">
                                <div className="ico">
                                <img src="/images/3-1.png" alt="" />
                                </div>
                                <div className="text-center">
                                <button type="button" className="webBtn smBtn uploadImg" data-upload="dp_image" data-text="Change Photo">Change Photo</button>
                                <input type="file" name id className="uploadFile" data-upload="dp_image" />
                                </div>
                                <div className="noHats text-center">(Please upload your logo)</div>
                            </div>
                            <hr />
                            <div className="row formRow">
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-xx-4">
                                <div className="txtGrp">
                                    <label htmlFor>Full Name</label>
                                    <input type="text" name id className="txtBox" />
                                </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-xx-4">
                                <div className="txtGrp">
                                    <label htmlFor>Phone Number</label>
                                    <input type="text" name id className="txtBox" />
                                </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-xx-4">
                                <div className="txtGrp">
                                    <label htmlFor>Email Address</label>
                                    <input type="text" id name className="txtBox" />
                                </div>
                                </div>
                            </div>
                            <hr />
                            <h5>Social Networks</h5>
                            <div className="row formRow">
                                <div className="col-md-6">
                                    <div className="txtGrp">
                                    <h6>
                                        <i className="fa fa-facebook-square" /> Facebook Url
                                    </h6>
                                    <input
                                        type="text"
                                        className="txtBox"
                                    />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="txtGrp">
                                    <h6>
                                        <i className="fa fa-twitter-square" /> Twitter Url
                                    </h6>
                                    <input
                                        type="text"
                                        className="txtBox"
                                    />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="txtGrp">
                                    <h6>
                                        <i className="fa fa-instagram" /> Instagram Url
                                    </h6>
                                    <input
                                        type="text"
                                        className="txtBox"
                                    />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="txtGrp">
                                    <h6>
                                        <i className="fa fa-linkedin-square" /> LinkedIn Url
                                    </h6>
                                    <input
                                        type="text"
                                        className="txtBox"
                                    />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <h4>
                                    About us / Company description{" "}
                                    <small>(recommended)</small>
                                    </h4>
                                    <textarea
                                    className="txtBox"
                                    defaultValue={""}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <div className="txtGrp fullWid">
                                        <div className="fileFlex flex">
                                            <span>
                                            <i className="fi-video" />
                                            </span>
                                            <h4 className="uploadImg" id="uploadDp" data-file>
                                            <em>Upload your Intor Video</em>{" "}
                                            
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bTn formBtn text-center">
                                <button type="submit" className="webBtn">Save</button>
                            </div>
                        </form>
                    </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CompanyProfileSetting;