import React, { useState } from "react";
import Sidebar from "../../../shared/Sidebar";
import HeaderLogged from "../../../shared/HeaderLogged";
import { Link } from "react-router-dom";

const CandidateProfileSetting = () => {
    return (
        <>
            <HeaderLogged />
            <main dashboard="">
                <section className="dash_outer">
                    <div className="inner_dash">
                        <div className="side_bar">
                            <Sidebar />
                        </div>
                        <div className="content_area">
                            <div className="dash_header">
                                <h3>
                                    Dashboard <span>/ Profile Settings</span>
                                </h3>
                            </div>
                            <div className="dash_body" id="setting">
                                <div className="dash_heading_sec">
                                    <h2>Profile Settings</h2>
                                </div>
                                <div className="dash_blk_box">
                                    <form action method="post">
                                        <div className="_header">
                                            <h4>Account Details</h4>
                                        </div>
                                        <div className="upLoadDp">
                                            <div className="ico">
                                                <img src="/images/1.png" alt="" />
                                            </div>
                                            <div className="text-center">
                                                <button type="button" className="webBtn smBtn uploadImg" data-upload="dp_image" data-text="Change Photo">Change Photo</button>
                                                <input type="file" name id className="uploadFile" data-upload="dp_image" />
                                            </div>
                                            <div className="noHats text-center">(Please upload your photo)</div>
                                        </div>
                                        <hr />
                                        <h5>Personal Information</h5>
                                        <div className="row formRow">
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-xx-4">
                                                <div className="txtGrp">
                                                    <label htmlFor>First Name</label>
                                                    <input type="text" name id className="txtBox" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-xx-4">
                                                <div className="txtGrp">
                                                    <label htmlFor>Last Name</label>
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
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-xx-4">
                                                <div className="txtGrp">
                                                    <label htmlFor>Date of birth</label>
                                                    <input type="text" name id="dp1671876963644" className="txtBox datepicker hasDatepicker" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-xx-4">
                                                <div className="txtGrp">
                                                    <label htmlFor className="move">Gender</label>
                                                    <select name id className="txtBox">
                                                        <option>Select</option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                        <option value="others">Others</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <h5>Qualification</h5>
                                        <div className="row formRow">
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-xx-4">
                                                <div className="txtGrp">
                                                    <label htmlFor>Education</label>
                                                    <input type="text" name id className="txtBox" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-xx-4">
                                                <div className="txtGrp">
                                                    <label htmlFor>Experience</label>
                                                    <input type="text" name id className="txtBox" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-xx-4">
                                                <div className="txtGrp">
                                                    <label htmlFor>Availablity</label>
                                                    <input type="text" name id className="txtBox" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-xx-12">
                                                <div className="txtGrp">
                                                    <label htmlFor>Skills</label>
                                                    <input type="text" name id className="txtBox" />
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <h5>Address Information</h5>
                                        <div className="row formRow">
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-xx-4">
                                                <div className="txtGrp">
                                                    <label htmlFor className="move">Country</label>
                                                    <select name id className="txtBox">
                                                        <option>Select</option>
                                                        <option value="London">London</option>
                                                        <option value="Birmingham">Birmingham</option>
                                                        <option value="Leeds">Leeds</option>
                                                        <option value="Glasgow">Glasgow</option>
                                                        <option value="Sheffield">Sheffield</option>
                                                        <option value="Bradford">Bradford</option>
                                                        <option value="Liverpool">Liverpool</option>
                                                        <option value="Edinburgh">Edinburgh</option>
                                                        <option value="Manchester">Manchester</option>
                                                        <option value="Bristol">Bristol</option>
                                                        <option value="Kirklees">Kirklees</option>
                                                        <option value="Fife">Fife</option>
                                                        <option value="Wirral">Wirral</option>
                                                        <option value="North Lanarkshire">North Lanarkshire</option>
                                                        <option value="Wakefield">Wakefield</option>
                                                        <option value="Cardiff">Cardiff</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-xx-4">
                                                <div className="txtGrp">
                                                    <label htmlFor>City</label>
                                                    <input type="text" name id className="txtBox" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-xx-4">
                                                <div className="txtGrp">
                                                    <label htmlFor className="move">State</label>
                                                    <select name id className="txtBox">
                                                        <option>Select</option>
                                                        <option value="AL">Alabama - AL</option>
                                                        <option value="AK">Alaska - AK</option>
                                                        <option value="AS">American Samoa - AS</option>
                                                        <option value="AZ">Arizona - AZ</option>
                                                        <option value="AR">Arkansas - AR</option>
                                                        <option value="CA">California - CA</option>
                                                        <option value="CO">Colorado - CO</option>
                                                        <option value="CT">Connecticut - CT</option>
                                                        <option value="DE">Delaware - DE</option>
                                                        <option value="DC">District of Columbia - DC</option>
                                                        <option value="FM">Federated States of Micronesia - FM</option>
                                                        <option value="FL">Florida - FL</option>
                                                        <option value="GA">Georgia - GA</option>
                                                        <option value="GU">Guam - GU</option>
                                                        <option value="HI">Hawaii - HI</option>
                                                        <option value="ID">Idaho - ID</option>
                                                        <option value="IL">Illinois - IL</option>
                                                        <option value="IN">Indiana - IN</option>
                                                        <option value="IA">Iowa - IA</option>
                                                        <option value="KS">Kansas - KS</option>
                                                        <option value="KY">Kentucky - KY</option>
                                                        <option value="LA">Louisiana - LA</option>
                                                        <option value="ME">Maine - ME</option>
                                                        <option value="MH">Marshall Islands - MH</option>
                                                        <option value="MD">Maryland - MD</option>
                                                        <option value="MA">Massachusetts - MA</option>
                                                        <option value="MI">Michigan - MI</option>
                                                        <option value="MN">Minnesota - MN</option>
                                                        <option value="MS">Mississippi - MS</option>
                                                        <option value="MO">Missouri - MO</option>
                                                        <option value="MT">Montana - MT</option>
                                                        <option value="NE">Nebraska - NE</option>
                                                        <option value="NV">Nevada - NV</option>
                                                        <option value="NH">New Hampshire - NH</option>
                                                        <option value="NJ">New Jersey - NJ</option>
                                                        <option value="NM">New Mexico - NM</option>
                                                        <option value="NY">New York - NY</option>
                                                        <option value="NC">North Carolina - NC</option>
                                                        <option value="ND">North Dakota - ND</option>
                                                        <option value="MP">Northern Mariana Islands - MP</option>
                                                        <option value="OH">Ohio - OH</option>
                                                        <option value="OK">Oklahoma - OK</option>
                                                        <option value="OR">Oregon - OR</option>
                                                        <option value="PW">Palau - PW</option>
                                                        <option value="PA">Pennsylvania - PA</option>
                                                        <option value="PR">Puerto Rico - PR</option>
                                                        <option value="RI">Rhode Island - RI</option>
                                                        <option value="SC">South Carolina - SC</option>
                                                        <option value="SD">South Dakota - SD</option>
                                                        <option value="TN">Tennessee - TN</option>
                                                        <option value="TX">Texas - TX</option>
                                                        <option value="UT">Utah - UT</option>
                                                        <option value="VT">Vermont - VT</option>
                                                        <option value="VI">Virgin Islands - VI</option>
                                                        <option value="VA">Virginia - VA</option>
                                                        <option value="WA">Washington - WA</option>
                                                        <option value="WV">West Virginia - WV</option>
                                                        <option value="WI">Wisconsin - WI</option>
                                                        <option value="WY">Wyoming - WY</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-xx-4">
                                                <div className="txtGrp">
                                                    <label htmlFor>Zip Code</label>
                                                    <input type="text" id name className="txtBox" />
                                                </div>
                                            </div>
                                            <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 col-xx-8">
                                                <div className="txtGrp">
                                                    <label htmlFor>Address</label>
                                                    <input type="text" id name className="txtBox" />
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <h5>Profile Bio</h5>
                                        <div className="row formRow">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-xx-12">
                                                <div className="txtGrp">
                                                    <label htmlFor>Description</label>
                                                    <textarea name id className="txtBox" defaultValue={""} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bTn formBtn text-center">
                                            <button type="submit" className="webBtn">Save</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="dash_blk_box">
                                    <div className="_header">
                                        <h4>Change Password</h4>
                                        <div className="info">
                                            <strong><em>Strong Password</em></strong>
                                            <div className="infoIn ckEditor">
                                                <p>Your password must contain the following:</p>
                                                <ol>
                                                    <li>At least 8 characters in length (a strong password has at least 14 characters)</li>
                                                    <li>At least 1 letter and at least 1 number or symbol</li>
                                                </ol>
                                            </div>
                                        </div>
                                    </div>
                                    <form action method="post">
                                        <div className="row formRow">
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-xx-4">
                                                <div className="txtGrp pasDv">
                                                    <label htmlFor>Current password</label>
                                                    <input type="password" name id className="txtBox" />
                                                    <i className="icon-eye" id="eye" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-xx-4">
                                                <div className="txtGrp pasDv">
                                                    <label htmlFor>New password</label>
                                                    <input type="password" name id className="txtBox" />
                                                    <i className="icon-eye" id="eye" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-xx-4">
                                                <div className="txtGrp pasDv">
                                                    <label htmlFor>Confirm new password</label>
                                                    <input type="password" name id className="txtBox" />
                                                    <i className="icon-eye" id="eye" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bTn formBtn text-center">
                                            <button type="submit" className="webBtn">Change</button>
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

export default CandidateProfileSetting;