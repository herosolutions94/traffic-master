import React, { useEffect, useState } from "react";
import Header from "../../shared/Header";
import Footer from "../../shared/Footer";

import {
  fetchSignup,
  createAccount
} from "../../../states/actions/fetchSignup";
import { useSelector, useDispatch } from "react-redux";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import LoadingScreen from "../../common/LoadingScreen";
import FormProcessingSpinner from "../../common/FormProcessingSpinner";

import Text from "../../common/Text";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

const Signup = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fetchSignup.content);
  const isLoading = useSelector((state) => state.fetchSignup.isLoading);
  const isFormProcessing = useSelector(
    (state) => state.fetchSignup.isFormProcessing
  );
  const { content, site_settings } = data;

  useEffect(() => {
    dispatch(fetchSignup());
  }, []);

  const [showPassOne, setShowPassOne] = useState(false);
  const [showPassTwo, setShowPassTwo] = useState(false);

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit
  } = useForm();

  const firstSubmit = (data) => {
    dispatch(createAccount(data));
  };

  useDocumentTitle("Post Job");

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <ToastContainer />
          <Header site_settings={site_settings} />
          <main index>
            <section className="new_logon">
              <div className="contain">
                <div className="log_blk">
                  <form action method>
                    <div className="inner_blk_blk">
                      <div className="inner_head_blk">
                        <h3>About the job offer</h3>
                      </div>
                      <div className="row formRow">
                        {/* <div className="col-md-12">
                          <div className="txtGrp fullWid">
                            <div className="fileFlex flex">
                              <span>
                                <i className="fi-file" />
                              </span>
                              <h4 className="uploadImg" id="uploadDp" data-file>
                                Upload your logo
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="txtGrp">
                            <h6>Company name (as shown in the job offer.) </h6>
                            <input type="text" name id className="txtBox" />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="txtGrp flex">
                            <div className="lblBtn">
                              <input
                                type="checkbox"
                                name="confirm"
                                id="confirm"
                              />
                              <label htmlFor="confirm">
                                Confidential posting - enter "Confidential
                                employer" or a short description of the
                                business, eg "Manufacturing company"
                              </label>
                            </div>
                          </div>
                        </div> */}
                        <div className="col-md-12">
                          <div className="txtGrp">
                            <h6>Job Title</h6>
                            <input type="text" name id className="txtBox" />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="txtGrp">
                            <h6>Job Type</h6>
                            <input type="text" name id className="txtBox" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="row formRow flex-2-col-6">
                            <div className="col-md-6">
                              <div className="txtGrp">
                                <h6>Min Salery <span>(Optional)</span></h6>
                                <input type="text" name id className="txtBox" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="txtGrp">
                                <h6>Max Salery <span>(Optional)</span></h6>
                                <input type="text" name id className="txtBox" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="txtGrp">
                            <h6>Activity</h6>
                            <input type="text" name id className="txtBox" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="txtGrp">
                            <h6>City/Place(s) of work (or Remote work) </h6>
                            <input type="text" name id className="txtBox" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="txtGrp">
                            <h6>Target province(s) of job offer</h6>
                            <input type="text" name id className="txtBox" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="txtGrp">
                            <h6>Reference number (optional)</h6>
                            <input type="text" name id className="txtBox" />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="txtGrp">
                            <h6>Job description</h6>
                            <textarea
                              name
                              id
                              className="txtBox"
                              defaultValue={""}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <hr /> */}
                    {/* <div className="inner_blk_blk">
                      <div className="inner_head_blk">
                        <h3>Applications</h3>
                        <p>How will the applications be received</p>
                      </div>
                      <div className="row formRow">
                        <div className="col-md-6">
                          <div className="txtGrp">
                            <h6>By email</h6>
                            <input
                              type="text"
                              className="txtBox"
                              name
                              placeholder
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="txtGrp">
                            <h6>On a Website</h6>
                            <input
                              type="text"
                              className="txtBox"
                              name
                              placeholder
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="inner_blk_blk">
                      <div className="inner_head_blk">
                        <h3>
                          Other information to display <small>(optional)</small>
                        </h3>
                      </div>
                      <div className="row formRow">
                        <div className="col-md-6">
                          <div className="txtGrp">
                            <h6>Contact person</h6>
                            <input
                              type="text"
                              className="txtBox"
                              name
                              placeholder
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="txtGrp">
                            <h6>Title</h6>
                            <input
                              type="text"
                              className="txtBox"
                              name
                              placeholder
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="txtGrp">
                            <h6>Full address</h6>
                            <input
                              type="text"
                              className="txtBox"
                              name
                              placeholder
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="txtGrp">
                            <h6>Phone</h6>
                            <input
                              type="text"
                              className="txtBox"
                              name
                              placeholder
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="txtGrp">
                            <h6>Website</h6>
                            <input
                              type="text"
                              className="txtBox"
                              name
                              placeholder
                            />
                          </div>
                        </div>
                      </div>
                    </div>*/}
                    <hr />
                    <h2>EMPLOYER ACCOUNT</h2>
                    <hr />
                    <div className="inner_blk_blk">
                      <div className="inner_head_blk">
                        <h3>Company information</h3>
                        <p>
                          (All information communicated to Nexum is strictly
                          confidential)
                        </p>
                      </div>
                      <div className="row formRow">
                        <div className="col-md-6">
                          <div className="txtGrp">
                            <h6>Company</h6>
                            <input
                              type="text"
                              className="txtBox"
                              name
                              placeholder
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="txtGrp">
                            <h6>Contact person</h6>
                            <input
                              type="text"
                              className="txtBox"
                              name
                              placeholder
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="txtGrp">
                            <h6>Title</h6>
                            <input
                              type="text"
                              className="txtBox"
                              name
                              placeholder
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="txtGrp">
                            <h6>Email address</h6>
                            <input
                              type="text"
                              className="txtBox"
                              name
                              placeholder
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="txtGrp">
                            <h6>Phone</h6>
                            <input
                              type="text"
                              className="txtBox"
                              name
                              placeholder
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="txtGrp">
                            <h6>Address</h6>
                            <input
                              type="text"
                              className="txtBox"
                              name
                              placeholder
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="txtGrp pasDv">
                            <h6>Password</h6>
                            <div className="relative">
                              <input
                                type="password"
                                name="password"
                                id="password"
                                className="txtBox"
                              />
                              <i className="icon-eye" id="eye" />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="txtGrp pasDv">
                            <h6>Confirm Password</h6>
                            <div className="relative">
                              <input
                                type="password"
                                name="cpswd"
                                id="cpswd"
                                className="txtBox"
                              />
                              <i className="icon-eye" id="eye" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="txtGrp flex">
                      <div className="lblBtn">
                        <input type="checkbox" name="confirm" id="confirm" />
                        <label htmlFor="confirm">
                          By validating below, I agree to V &amp; S
                          <a href="/" target="_blank">
                            Terms &amp; Conditions
                          </a>
                          and
                          <a href="/" target="_blank">
                            Privacy Policy.
                          </a>
                        </label>
                      </div>
                    </div>
                    <div className="bTn text-center">
                      <button type="submit" className="webBtn blockBtn icoBtn">
                        Save and Continue
                      </button>
                    </div>
                    <input
                      type="file"
                      id="uploadFile"
                      name="uploadFile"
                      className="uploadFile"
                      data-file
                    />
                  </form>
                </div>
              </div>
            </section>
          </main>
          <Footer site_settings={site_settings} />
        </>
      )}
    </>
  );
};

export default Signup;
