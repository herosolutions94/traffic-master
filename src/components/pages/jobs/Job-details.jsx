import React, { useRef, useEffect, useState } from "react";
import Header from "../../shared/Header";
import Footer from "../../shared/Footer";
import { fetchCandidates } from "../../../states/actions/fetchCandidates";
import { fetchJobDetails } from "../../../states/actions/fetchJobDetails";
import { applyOnJob } from "../../../states/actions/employerJobs";
import { useSelector, useDispatch } from "react-redux";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import LoadingScreen from "../../common/LoadingScreen";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { API_UPLOADS_URL } from "../../../constants/paths";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import FormProcessingSpinner from "../../common/FormProcessingSpinner";
import ReactHtmlParser from "html-react-parser";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon } from 'react-share';

const JobDetails = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fetchCandidates.content);
  const isLoading = useSelector((state) => state.fetchCandidates.isLoading);
  const { content, site_settings, sec3s } = data;
  const [authError, setAuthError] = useState(null);
  const [description, setDescription] = useState('');
  const jobDetails = useSelector(
    (state) => state.fetchJobDetails.jobDetails.job
  );
  const isAlreadyApplied = useSelector(
    (state) => state.fetchJobDetails.jobDetails.is_applied
  );
  const { id } = useParams();
  const cvRef = useRef(null);
  const [cv, setCv] = useState(null);
  const [uploadCvError, setUploadCvError] = useState(null);
  const isFormProcessing = useSelector(
    (state) => state.employerJobs.isFormProcessing
  );
  const resuma = useSelector((state) => state.fetchJobDetails.jobDetails.cv?.orignal_resuma_name);
  console.log('resuma', resuma);
  console.log('cv', cv);

  useEffect(() => {
    dispatch(fetchCandidates());

  }, []);

  useEffect(() => {
    dispatch(fetchJobDetails(id));
  }, [id]);

  const handleCvClick = (e) => {
    e.preventDefault();
    setCv(null);
    cvRef.current.click();
  };

  const handleSelectFile = (e) => {
    setCv(e);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setAuthError("Please login to apply for this job");
      return;
    }

    if (cv) {
      const file = cv?.target?.files[0];
      const fileType = file?.type;
      if (
        fileType !== "application/pdf" &&
        fileType !== "application/msword" &&
        fileType !==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setUploadCvError("Please upload a word or pdf file");
        return;
      }
    }
    const jobData = {
      cover_letter: description,
      resume: cv?.target?.files[0],
    };
    dispatch(applyOnJob(id, jobData));
  };

  const applySection = () => {
    const element = document.getElementById("apply_blk");
    element.scrollIntoView({ behavior: "smooth" });
  };

  useDocumentTitle(data.page_title);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <ToastContainer />
          <Header site_settings={site_settings} />
          <main index="">
            <section className="job_detail_banner">
              <div className="contain">
                <div className="cntnt">
                  <div className="job_flex_title">
                    <div className="img_ico">
                      <img
                        src={
                          API_UPLOADS_URL + "/jobs/" + jobDetails?.company_logo
                        }
                        alt=""
                      />
                    </div>
                    <div className="right_lst">
                      <h4>{jobDetails?.company_name}</h4>
                      <a href={jobDetails?.company_link} target="_blank">
                        {jobDetails?.company_link}
                      </a>
                    </div>
                  </div>
                  <h1>{jobDetails?.title}</h1>
                  <p>
                    <i className="fi fi-rr-marker"></i>{" "}
                    <span>{jobDetails?.city}</span>
                  </p>
                </div>
              </div>
            </section>
            <section className="job_detail_sec">
              <div className="contain">
                <div className="cntnt">
                  <div className="job_detail_grid_pg">
                    <ul>
                      <li>
                        <h4>
                          <i className="fi fi-rr-briefcase"></i>
                          <span>Job Type</span>
                        </h4>
                        <p>{jobDetails?.job_type_name}</p>
                      </li>

                      <li>
                        <h4>
                          <i className="fi fi-rr-dollar"></i>
                          <span>Salery</span>
                        </h4>
                        <p>
                          ${jobDetails?.min_salary} - ${jobDetails?.max_salary}
                        </p>
                      </li>

                      <li>
                        <h4>
                          <i className="fi fi-rr-time-fast"></i>
                          <span>Avg. Working Hours</span>
                        </h4>
                        <p>
                          {jobDetails?.min_working_hour} Hrs -{" "}
                          {jobDetails?.max_working_hour} Hrs
                        </p>
                      </li>
                      <li>
                        <h4>
                          <i className="fi fi-rr-clock-seven"></i>
                          <span>Date posted</span>
                        </h4>
                        <p>{moment(jobDetails?.created_date).fromNow()}</p>
                      </li>
                      {localStorage.getItem("memType") !== "employer" && (!isAlreadyApplied ? (
                        <li>
                          <div className="bTn">
                            {/* <Link to="#apply_blk" className="webBtn">
                              Apply now
                            </Link> */}
                            <Link className="webBtn" onClick={applySection}>
                              Apply now
                            </Link>
                          </div>
                        </li>
                      ) : (
                        <li>
                          <div className="bTn">
                            <Link to="#" className="webBtn">
                              Already Applied
                            </Link>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <br />
                    <div className="ckEditor">
                      <h4>Description</h4>
                      {jobDetails?.description &&
                        ReactHtmlParser(jobDetails?.description)}
                      {/* // also show video here if node type figure or oembed */}
                      {/* {jobDetails?.description} */}
                      {/* <iframe
                        width="100%"
                        height="450"
                        src="https://www.youtube.com/embed/Y5fQeZAai6Q"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen=""
                      ></iframe> */}
                      <br />
                      <br />
                      {/* <h4>Skill &amp; Experience</h4> */}
                    </div>
                    <div className="share_blk flex">
                      <div className="flex">
                        <span>Share this job</span>
                        <div className='social-links'>
                          <FacebookShareButton
                            url={window.location.origin + "/job-details/" + id}
                            quote={'Dummy text!'}
                            hashtag="#muo"
                          >
                            <FacebookIcon size={32} round />
                          </FacebookShareButton>
                          <TwitterShareButton
                            url={window.location.origin + "/job-details/" + id}
                            quote={'Dummy text!'}
                            hashtag="#muo"
                          >
                            <TwitterIcon size={32} round />
                          </TwitterShareButton>
                          <LinkedinShareButton
                            url={window.location.origin + "/job-details/" + id}
                            quote={'Dummy text!'}
                            hashtag="#muo"
                          >
                            <LinkedinIcon size={32} round />
                          </LinkedinShareButton>
                        </div>
                        {/* <ul className="social flex">
                          <li>
                            <Link to="/">
                              <img src="/images/social-instagram.svg" alt="" />
                            </Link>
                          </li>
                          <li>
                            <Link to="/">
                              <img src="/images/social-facebook.svg" alt="" />
                            </Link>
                          </li>
                          <li>
                            <Link to="/">
                              <img src="/images/social-linkedin.svg" alt="" />
                            </Link>
                          </li>
                        </ul> */}
                      </div>
                    </div>
                    {localStorage.getItem("memType") !== "employer" &&
                      (!isAlreadyApplied ? (
                        <div className="apply_blk" id="apply_blk">
                          <h3>Apply now for ({jobDetails?.title})</h3>
                          <ul className="nav nav-tabs">
                            <li className="active">
                              <Link className="a" data-toggle="tab" to="/">
                                Apply Here
                              </Link>
                            </li>
                            <li>
                              <Link to="#">Apply on Employer Website</Link>
                            </li>
                          </ul>
                          <div className="tab-content">
                            <div
                              id="here"
                              className="tab-pane fade a active in"
                            >
                              <div className="inner_apply_blk">
                                <form
                                  action=""
                                  onSubmit={handleSubmit(onSubmit)}
                                >
                                  <div className="txtGrp">
                                    <h6>Cover Letter</h6>
                                    <CKEditor
                                      editor={ClassicEditor}
                                      data={description}
                                      onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setDescription(data);
                                      }}
                                      config={{
                                        placeholder: "Write cover letter here",
                                      }}
                                    />
                                  </div>
                                  <div className="txtGrp fullWid">
                                    <div className="fileFlex flex">
                                      <span>
                                        <i className="fi-file"></i>
                                      </span>
                                      <h4
                                        className="uploadImg"
                                        id="uploadDp"
                                        data-file=""
                                        onClick={handleCvClick}
                                      >
                                        Upload your CV/Resume
                                      </h4>
                                      <div className="cv-btn">
                                        {cv === null ? (
                                          resuma
                                        ) : (

                                          cv?.target?.files[0]?.name
                                        )}
                                      </div>
                                    </div>

                                    {uploadCvError && (
                                      <span className="validation-error">
                                        {uploadCvError}
                                      </span>
                                    )}
                                  </div>
                                  <input
                                    type="file"
                                    name="resume"
                                    id="cv"
                                    ref={cvRef}
                                    className="hidden"
                                    onChange={handleSelectFile}
                                  />

                                  <div className="txtGrp">
                                    <button
                                      type="submit"
                                      className="webBtn icoBtn"
                                      disabled={isFormProcessing}
                                    >
                                      Submit
                                      <FormProcessingSpinner
                                        isFormProcessing={isFormProcessing}
                                      />
                                    </button>
                                  </div>
                                </form>
                              </div>


                            </div>
                          </div>
                          <br />
                          {!localStorage.getItem("authToken") && (
                            <div className="bTn">
                              <Link to="/signup-candidate" className="webBtn">
                                Sign up
                              </Link>
                              <Link
                                to="/signin"
                                className="webBtn blackblackBtn"
                              >
                                Sign in
                              </Link>
                            </div>
                          )}
                          {authError && (
                            <span className="validation-error">
                              {authError}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="apply_blk" id="apply_blk">
                          <div className="inner_apply_blk text-center">
                            <p>You have already applied for this job</p>
                          </div>
                        </div>
                      ))}
                  </div>
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

export default JobDetails;
