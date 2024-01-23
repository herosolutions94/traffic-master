import React, { useEffect, useState } from "react";
import Header from "../../shared/Header";
import Footer from "../../shared/Footer";
import MultiRangeSlider from "../multirangeslider/Index";
import { fetchJobs } from "../../../states/actions/fetchJobs";
import { useSelector, useDispatch } from "react-redux";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import LoadingScreen from "../../common/LoadingScreen";
import Text from "../../common/Text";
import { getBackgroundImageUrlThumb } from "../../../helpers/helpers";
import http from "../../../helpers/http";
import * as helpers from "../../../helpers/helpers";
import JobList from "./JobList";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FormProcessingSpinner from "../../common/FormProcessingSpinner";
import { Link } from "react-router-dom";
import { API_UPLOADS_URL } from "../../../constants/paths";
import moment from "moment/moment";
import ReactHtmlParser from 'html-react-parser';
import JobShareModel from "./JobShareModel";
import { saveLikeJob } from "../../../states/actions/likeJobs";

const TrainingPrograms = () => {
  const dispatch = useDispatch();
  const { page } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchParam = searchParams.get("search");
  const [searchValue, setSearchValue] = useState(searchParam);
  const [pageNo, setPageNo] = useState(page);
  const data = useSelector((state) => state.fetchJobs.content);
  const isLoading = useSelector((state) => state.fetchJobs.isLoading);
  const { content, site_settings } = data;
  const jobs = useSelector((state) => state.fetchJobs.jobs);
  const jobCount = useSelector((state) => state.fetchJobs.content.total_jobs);
  const [isFetching, setIsFetching] = useState(false);
  const [isFormProcessing, setIsFormProcessing] = useState(false);
  const [totalJobs, setTotalJobs] = useState(jobCount);
  const navigate = useNavigate();

  const [jobList, setJobList] = useState(jobs);
  const jobCategories = useSelector(
    (state) => state.fetchJobs.content.categories
  );
  const jobTypes = useSelector((state) => state.fetchJobs.content.job_types);
  const jobExperienceLevels = useSelector(
    (state) => state.fetchJobs.content.experience_levels
  );
  const featurJobs = useSelector(
    (state) => state.fetchJobs.content.featured_jobs
  );
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const isLoggedIn = localStorage.getItem("authToken") ? true : false;
  const [link, setLink] = useState('');
  const [open, setOpen] = useState(false);

  const handleCopyLink = (id) => {
    setOpen(true);
    const baseUrl = window.location.origin;
    setLink(`${baseUrl}/job-details/${id}`);
  }

  const handleSaveJob = (id) => {
    const index = featuredJobs.findIndex((job) => job.id === id);
    const newFeaturedJobs = [...featuredJobs];
    newFeaturedJobs[index].saved = true;
    setFeaturedJobs(newFeaturedJobs);

    const jobListIndex = jobList.findIndex((job) => job.id === id);
    const newJobList = [...jobList];
    newJobList[jobListIndex].saved = true;
    setJobList(newJobList);

    dispatch(saveLikeJob(id));
  }

  useEffect(() => {
    dispatch(fetchJobs());
  }, []);

  useEffect(() => {
    setJobList(jobs);
  }, [jobs]);

  useEffect(() => {
    if (featurJobs) {
      setFeaturedJobs(featurJobs);
    }
  }, [featurJobs]);

  const handleChange = (name, value, field) => {
    if (pageNo > 1) {
      setPageNo(1);
      navigate(`/jobs/1`);
      let index = filterData.findIndex((item) => item.name === "page");
      if (index !== -1) {
        filterData[index].value = 1;
        setFilterData([...filterData]);
      } else {
        setFilterData([
          ...filterData,
          { name: "page", value: 1, field: "page" },
        ]);
      }
    }
    if (name == "min_price" || name == "max_price") {
      const index = filterData.findIndex((item) => item.name === name);
      if (index !== -1) {
        filterData[index].value = value;
        setFilterData([...filterData]);
      } else {
        setFilterData([...filterData, { name, value, field }]);
      }
      return;
    }
    if (name == "sort_by" || name == "category") {
      const index = filterData.findIndex((item) => item.name === name);
      if (index !== -1) {
        filterData[index].value = value;
        setFilterData([...filterData]);
      } else {
        setFilterData([...filterData, { name, value, field }]);
      }
      return;
    }
    const index = filterData.findIndex((item) => item.name === name);
    if (index !== -1) {
      filterData.splice(index, 1);
      setFilterData([...filterData]);
    } else {
      setFilterData([...filterData, { name, value, field }]);
    }
  };

  const handlePageClick = (event) => {
    window.scrollTo({ top: 300, behavior: "smooth" });
    setPageNo(event.selected + 1);
    if (searchValue) {
      navigate(`/jobs/${event.selected + 1}?search=${searchValue}`);
    } else {
      navigate(`/jobs/${event.selected + 1}`);
    }
    const index = filterData.findIndex((item) => item.name == "page");
    if (index !== -1) {
      filterData[index].value = event.selected + 1;
      setFilterData([...filterData]);
    } else {
      setFilterData([
        ...filterData,
        { name: "page", value: event.selected + 1, field: "page" },
      ]);
    }
  };

  useEffect(() => {
    if (filterData.length > 0) {
      handleFilter();
    } else {
      setJobList(jobs);
    }
  }, [filterData]);

  useEffect(() => {
    setJobTitle(searchValue);
    if (searchValue) {
      const index = filterData.findIndex((item) => item.name === "job_title");
      if (index !== -1) {
        filterData[index].value = searchValue;
        setFilterData([...filterData]);
      } else {
        setFilterData([
          ...filterData,
          { name: "job_title", value: searchValue, field: "job_title" },
        ]);
      }
    }
  }, [searchValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormProcessing(true);
    if (pageNo > 1) {
      setPageNo(1);
      let index = filterData.findIndex((item) => item.name === "page");
      if (index !== -1) {
        filterData[index].value = 1;
        setFilterData([...filterData]);
      } else {
        setFilterData([
          ...filterData,
          { name: "page", value: 1, field: "page" },
        ]);
      }
    }

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const newFilterData = [...filterData];
    for (const [key, value] of Object.entries(data)) {
      const index = newFilterData.findIndex((item) => item.name === key);
      if (index !== -1) {
        if (value) {
          newFilterData[index].value = value;
        } else {
          newFilterData.splice(index, 1);
        }
      } else {
        if (value) {
          newFilterData.push({ name: key, value, field: key });
        }
      }
    }
    const index = newFilterData.findIndex((item) => item.name === "job_title");
    if (index !== -1) {
      if (searchValue !== "") {
        setSearchValue(newFilterData[index].value);
        navigate(`/jobs/1?search=${newFilterData[index].value}`);
      } else {
        navigate(`/jobs/1`);
      }
    } else {
      navigate(`/jobs/1`);
      setSearchValue("");
    }
    setFilterData(newFilterData);
  };

  const handleFilter = () => {
    setIsFetching(true);

    const authToken = localStorage.getItem("authToken");
    http
      .post("fetch-filtered-jobs", helpers.doObjToFormData({
        filterData,
        authToken,
      }))
      .then(({ data }) => {
        console.log(data)
        setJobList(data.jobs);
        setTotalJobs(data.total_jobs);
        setIsFetching(false);
        setIsFormProcessing(false);
      })
      .catch((error) => {
        setIsFetching(false);
        setIsFormProcessing(false);
      });
  };
  const selectAllCategories = () => {
  }

  useDocumentTitle(data.page_title);
  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Header site_settings={site_settings} />
          <main index>
            <section
              className="become_seller_banner support_banner"
              style={{
                backgroundImage: `url(${getBackgroundImageUrlThumb(
                  content.image1
                )})`,
              }}
            >
              <div className="contain">
                <div className="cntnt">
                  <h1>
                    {/* <Text string={content.banner_heading} /> */}
                    <Text
                      string={`There Are ${jobCount} Jobs Here For you!`}
                    />
                  </h1>
                  <p>
                    <Text string={content.banner_tagline} />
                  </p>
                  <div className="banner-form">
                    <form
                      action
                      method="post"
                      autoComplete="off"
                      onSubmit={handleSubmit}
                    >
                      <div className="flex">
                        <div className="col">
                          <div className="_txtGrp">
                            <i className="fi fi-rr-search" />
                            <input
                              type="text"
                              name="job_title"
                              className="txtBox"
                              placeholder={content.banner_field_heading}
                              value={jobTitle}
                              onChange={(e) => setJobTitle(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="_txtGrp">
                            <i className="fi fi-rr-marker" />
                            <input
                              type="text"
                              name="job_location"
                              className="txtBox"
                              placeholder={content.banner_field_heading_2}
                            />
                          </div>
                        </div>
                        <div className="col_last">
                          {/* <button
                            type="submit"
                            className="webBtn colorBtn"
                          >
                            {content.banner_button_text}
                          </button> */}

                          <button
                            type="submit"
                            className="webBtn blockBtn icoBtn"
                            disabled={isFormProcessing}
                          >
                            {content.banner_button_text}
                            <FormProcessingSpinner
                              isFormProcessing={isFormProcessing}
                            />
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
            <section className="job_results">
              <div className="contain">
                <div className="flex">
                  <div className="colL">
                    <div className="inner">
                      <h4>Category</h4>
                      <div className="type_list">
                        <select
                          name="category"
                          id="category"
                          className="txtBox"
                          onChange={(e) =>
                            handleChange("category", e.target.value, "category")
                          }
                        >
                          <option value selected disabled>Select Category</option>
                          <option value="allcategories" >All Categories </option>
                          {jobCategories?.map((category) => (
                            <option value={category.id}>
                              {category.title}
                            </option>
                          ))}
                        </select>

                        {/* {jobCategories?.map((category) => (
                          <div className="lblBtn">
                            <input
                              type="checkbox"
                              id="Residential"
                              onChange={() =>
                                handleChange(
                                  `category_${category.title}`,
                                  category.id,
                                  "category"
                                )
                              }
                            />
                            <label htmlFor={category.title}>
                              {category.title}
                            </label>
                          </div>
                        ))} */}
                      </div>
                      <hr />
                      <h4>job type</h4>
                      <div className="type_list">
                        {jobTypes?.map((jobType) => (
                          <div className="lblBtn">
                            <div className="switchBtn">
                              <input
                                type="checkbox"
                                id={jobType.title}
                                onChange={() =>
                                  handleChange(
                                    `job_type_${jobType.title}`,
                                    jobType.id,
                                    "jobtype"
                                  )
                                }
                              />
                            </div>
                            <label htmlFor={jobType.title}>
                              {jobType.title}
                            </label>
                          </div>
                        ))}
                      </div>
                      <hr />
                      <h4>Experience Level</h4>
                      <div className="type_list">
                        {jobExperienceLevels?.map((experienceLevel) => (
                          <div className="lblBtn">
                            <input
                              type="checkbox"
                              id={experienceLevel.title + 'el'}
                              onChange={() =>
                                handleChange(
                                  `experience_level_${experienceLevel.title}`,
                                  experienceLevel.id,
                                  "experience_level"
                                )
                              }
                            />
                            <label htmlFor={experienceLevel.title + 'el'}>
                              {experienceLevel.title}
                            </label>
                          </div>
                        ))}
                      </div>
                      <hr />
                      <h4>Salary Range</h4>
                      <MultiRangeSlider
                        min={30000}
                        max={250000}
                        onChange={({ min, max }) =>
                          // console.log(`min = ${min}, max = ${max}`)
                          console.log()
                        }
                        handleChange={handleChange}
                      />
                    </div>
                    <br />
                    <Link to="/employer-home">
                      <div className="inner">
                        <h4>Recruiting?</h4>
                        <p>
                          <small>
                            Advertise your jobs to millions of monthly users and
                            search 15.8 million CVs in our database.
                          </small>
                        </p>
                        {/* {!isLoggedIn && ( */}
                        <div className="bTn">
                          <Link to="/employer-home" className="webBtn">
                            Start Recruiting Now
                          </Link>
                        </div>
                        {/* )} */}
                      </div>
                    </Link>
                  </div>
                  <div className="colR">
                    <div className="filter_top">
                      <div className="text">
                        {isFetching ? (
                          "0 record."
                        ) : (
                          totalJobs == 0
                            ? "0 record."
                            : "Showing " +
                            ((pageNo - 1) * 5 + 1) +
                            " to " +
                            (((pageNo - 1) * 5 + jobs.length) > totalJobs ? totalJobs : ((pageNo - 1) * 5 + jobs.length)) +
                            " of " +
                            totalJobs +
                            (totalJobs === 1 ? " job" : " jobs")
                        )}
                      </div>
                      <a
                        href="javascript:void(0)"
                        className="popBtn webBtn filter_show_cell"
                        data-popup="filter"
                      >
                        Filters
                      </a>
                      <div className="filter_drop">
                        <select
                          className="txtBox"
                          onChange={(e) =>
                            handleChange("sort_by", e.target.value, "sort_by")
                          }
                        >
                          <option value="asc">Old Jobs</option>
                          <option value="desc">New Jobs</option>

                        </select>
                      </div>
                    </div>
                    <JobList
                      jobList={jobList}
                      pageNo={pageNo}
                      handlePageClick={handlePageClick}
                      itemsPerPage={20}
                      totalJobs={totalJobs}
                      isFetching={isFetching}
                      featuredJobs={featuredJobs}
                      setFeaturedJobs={setFeaturedJobs}
                    />
                  </div>
                </div>
              </div>
            </section>
            <section className="job_listing_grid job_page_featured big_top_bot">
              <div className="contain">
                <div className="flex heading_flex_jobs">
                  <div className="sec_heading">
                    <h3>
                      <Text string={content.fea_heading} />
                    </h3>
                    <h2>
                      <Text string={content.fea_tagline} />
                    </h2>
                  </div>
                </div>
                <div className="flex job_flex">
                  {featuredJobs?.length > 0 &&
                    featuredJobs.map((job) => (
                      <div className="col">
                        <div className="inner">
                          <div className="cta_act_btn column_dir">
                            <a href className="share_btn" onClick={() => handleCopyLink(job.id)}>
                              <i className="fi fi-share-alt" />
                            </a>
                            {isLoggedIn &&
                              job.saved ? (
                              <a href className="like_btn active_btn">
                                <i className="fi fi-heart" />
                              </a>
                            ) : (
                              <a href className="like_btn" onClick={() => handleSaveJob(job.id)}>
                                <i className="fi fi-heart" />
                              </a>
                            )
                            }
                          </div>
                          <div className="head_job">
                            <div className="img_ico">
                              <img
                                src={API_UPLOADS_URL + "/jobs/" + job.company_logo}
                                alt
                              />
                            </div>
                            <div className="cntnt">
                              <h4>
                                <Link to={`/job-details/${job.id}`}>{job.title}</Link>
                              </h4>
                              <ul>
                                <li>
                                  <i className="fi fi-rr-marker" />{" "}
                                  <span>{job.city}</span>
                                </li>
                                <li>
                                  <i className="fi fi-rr-briefcase" />{" "}
                                  <span>{job.job_type.title}</span>
                                </li>
                                <li>
                                  <i className="fi fi-rr-clock-two" />{" "}
                                  <span>{moment(job.created_date).fromNow()}</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="job_bdy">
                            {job?.description?.length > 200 ? (
                              <p>
                                {ReactHtmlParser(job?.description?.substring(0, 200))}...
                              </p>
                            ) : (
                              <p>{ReactHtmlParser(job?.description)}</p>
                            )}
                            <div className="skils">
                              {job.tags?.split(",").map((tag, index) => (
                                <span key={index}>{tag}</span>
                              ))}
                            </div>
                          </div>
                          <div className="job_footer">
                            <div className="job_price">
                              ${job.min_salary} - ${job.max_salary}
                            </div>
                            <Link to={`/job-details/${job.id}`} className="webBtn mdBtn">
                              Apply Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </section>
          </main>
          {open && <JobShareModel setOpen={setOpen} link={link} />}
          <Footer site_settings={site_settings} />
        </>
      )}
    </>
  );
};

export default TrainingPrograms;
