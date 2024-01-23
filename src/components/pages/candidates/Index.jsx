import React, { useEffect, useState } from "react";
import Header from "../../shared/Header";
import Footer from "../../shared/Footer";
import { fetchCandidates } from "../../../states/actions/fetchCandidates";
import { useSelector, useDispatch } from "react-redux";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import LoadingScreen from "../../common/LoadingScreen";
import Text from "../../common/Text";
import { getBackgroundImageUrlThumb } from "../../../helpers/helpers";
import CandidateList from "./CandidateList";
import http from "../../../helpers/http";
import * as helpers from "../../../helpers/helpers";
import FormProcessingSpinner from "../../common/FormProcessingSpinner";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Candidates = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { page } = useParams();
  const [pageNo, setPageNo] = useState(page);
  const data = useSelector((state) => state.fetchCandidates.content);
  const candidates = useSelector((state) => state.fetchCandidates.content.candidates);
  const [candidateList, setCandidateList] = useState([]);
  const professions = useSelector((state) => state.fetchCandidates.content.professions);
  const isLoading = useSelector((state) => state.fetchCandidates.isLoading);
  const { content, site_settings, sec3s } = data;
  const [filterData, setFilterData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isFormProcessing, setIsFormProcessing] = useState(false);
  const candidateCount = data.candidates?.length;
  const [totalCandidate, setTotalCandidate] = useState(candidateCount);

  useEffect(() => {
    dispatch(fetchCandidates());
  }, []);

  useEffect(() => {
    setCandidateList(candidates);
  }, [candidates]);

  const handleSubmit = (e) => {
    setIsFormProcessing(true);
    e.preventDefault();
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
    setFilterData(newFilterData);
  };

  const handleChange = (name, value, field) => {
    if (name == "experience_level" || name == "experience_level") {
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

  useEffect(() => {
    if (filterData.length > 0) {
      handleFilter();
    } else {
      setCandidateList(candidates);
    }
  }, [filterData]);

  const handleFilter = () => {
    setIsFetching(true);
    http
      .post("fetch-filtered-candidates", helpers.doObjToFormData(filterData))
      .then(({ data }) => {
        setCandidateList(data.candidates);
        setIsFetching(false);
        setIsFormProcessing(false);
        setTotalCandidate(data.total_candidates);
      })
      .catch((error) => {
        setIsFetching(false);
        setIsFormProcessing(false);
      });
  };

  const handlePageClick = (event) => {
    window.scrollTo({ top: 300, behavior: "smooth" });
    setPageNo(event.selected + 1);
    navigate(`/candidates/${event.selected + 1}`);
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
                )})`
              }}
            >
              <div className="contain">
                <div className="cntnt">
                  <h1>
                    <Text string={content.banner_heading} />
                  </h1>
                  <p>
                    <Text string={content.banner_tagline} />
                  </p>
                  <div className="banner-form">
                    <form action method="post" autoComplete="off" onSubmit={handleSubmit}>
                      <div className="flex">
                        <div className="col">
                          <div className="_txtGrp">
                            <i className="fi fi-rr-marker" />
                            <input
                              type="text"
                              name="location"
                              className="txtBox"
                              placeholder={content.banner_field_heading}
                            />
                          </div>
                        </div>
                        <div className="col_last">
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
                      <h4>Profession</h4>
                      <div className="type_list">
                        {professions?.map((profession) => (
                          <div className="lblBtn">
                            <div className="switchBtn">
                              <input
                                type="checkbox"
                                id="part-time"
                                onChange={() =>
                                  handleChange(
                                    `profession_${profession}`,
                                    profession,
                                    "profession"
                                  )
                                }
                              />
                            </div>
                            <label htmlFor={profession}>
                              {profession}
                            </label>
                          </div>
                        ))}
                      </div>
                      <hr />
                      <h4>Years of Experience</h4>
                      <div className="type_list">
                        <select
                          className="txtBox"
                          onChange={(e) =>
                            handleChange("experience_level", e.target.value, "experience_level")
                          }
                        >
                          <option value selected disabled>All Experience Level</option>
                          <option value="1">1 Year</option>
                          <option value="2">2 Year</option>
                          <option value="3">3 Year</option>
                          <option value="4">4 Year</option>
                          <option value="5">5 Year</option>
                          <option value="6">6 Year</option>
                          <option value="7">7 Year</option>
                          <option value="8">8 Year</option>
                          <option value="9">9 Year</option>
                          <option value="10">10 Year</option>
                          <option value="10+">10+ Year</option>
                        </select>
                      </div>
                    </div>
                    <br />
                    <div className="inner">
                      <h4>Recruiting?</h4>
                      <p>
                        <small>
                          Advertise your jobs to millions of monthly users and
                          search 15.8 million CVs in our database.
                        </small>
                      </p>
                      <div className="bTn">
                        <a href="candidate-detail.php" className="webBtn">
                          Start Recruiting Now
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="colR">
                    <div className="filter_top">
                      {/* <div className="text">
                        Showing <strong>41-60</strong> of <strong>944</strong>{" "}
                        candidates
                      </div> */}

                      <div classNmame="text">
                        {isFetching ? (
                          "0 record."
                        ) : (
                          totalCandidate == 0
                            ? "0 record."
                            : "Showing " +
                            ((pageNo - 1) * 5 + 1) +
                            " to " +
                            (((pageNo - 1) * 5 + candidates.length) > totalCandidate ? totalCandidate : ((pageNo - 1) * 5 + candidates.length)) +
                            " of " +
                            totalCandidate +
                            (totalCandidate === 1 ? " candidate" : " candidates")
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
                        <select name id className="selectpicker txtBox">
                          <option value>New Candidates</option>
                          <option value>Freelance</option>
                          <option value>Full Time</option>
                          <option value>Internship</option>
                          <option value>Part Time</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex job_flex candidate_flex_lst">
                      <CandidateList
                        candidateList={candidateList}
                        isFetching={isFetching}
                        pageNo={pageNo}
                        handlePageClick={handlePageClick}
                        totalCandidate={totalCandidate}
                        itemsPerPage={5}
                      />
                    </div>
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

export default Candidates;
