import React, { useEffect, useState } from "react";
import Sidebar from "../../shared/Sidebar";
import HeaderLogged from "../../shared/HeaderLogged";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { fetchCvBuilder, saveCV } from "../../../states/actions/fetchCvBuilder";
import { fetchCVDetails } from "../../../states/actions/fetchCvDetails";
import { fetchSiteSettings } from "../../../states/actions/fetchSiteSettings";
import FormProcessingSpinner from "../../common/FormProcessingSpinner";
import LoadingScreen from "../../common/LoadingScreen";
import { ToastContainer } from "react-toastify";
import { TagsInput } from "react-tag-input-component";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as paths from "../../../constants/paths";
const authToken = localStorage.getItem('authToken');
const CV = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fetchCvBuilder.content);
  const isLoading = useSelector((state) => state.fetchCvBuilder.isLoading);
  const isCvSubmitting = useSelector(
    (state) => state.fetchCvBuilder.isCvSubmitting
  );
  const cvDetails = useSelector((state) => state.fetchCvDetails.content);
  const cvAction = useSelector((state) => state.fetchCvBuilder.cvAction);
  const isSiteSettingsLoading = useSelector(
    (state) => state.fetchSiteSettings.isLoading
  );
  const memData = useSelector((state) => state.fetchSiteSettings.memData);
  const { content, sec2sLeft, languages, it_skills } = data;

  useEffect(() => {
    dispatch(fetchCvBuilder());
    dispatch(fetchSiteSettings());
    dispatch(fetchCVDetails());
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const EDUCATIONAL = {
    e_id: 0,
    e_university_name: "",
    e_course_name: "",
    e_year_start: "",
    e_year_end: "",
    e_detail: "",
    e_error: null,
  };

  const PROFESSIONAL_EXPERIENCE = {
    pe_id: 0,
    pe_company_name: "",
    pe_job_title: "",
    pe_year_start: "",
    pe_year_end: "",
    pe_detail: "",
    pe_error: null,
  };

  const LANGUAGES = {
    l_id: 0,
    l_language: "",
    l_error: null,
  };

  const VOLUNTEER = {
    v_id: 0,
    v_volunteer: "",
    v_error: null,
  };

  const INTEREST = {
    i_id: 0,
    i_interest: "",
    i_error: null,
  };

  const [educationalRows, setEducationalRows] = useState([EDUCATIONAL]);

  const [professionalExperienceRows, setProfessionalExperienceRows] = useState([
    PROFESSIONAL_EXPERIENCE,
  ]);
  const [skillsRows, setSkillsRows] = useState();
  const [languageRows, setLanguageRows] = useState([LANGUAGES]);
  const [skills, setSkills] = useState([]);
  const [skillsError, setSkillsError] = useState(null);


  useEffect(() => {
    if (cvDetails?.education?.length > 0) {
      let educations = [];
      cvDetails.education.map((item, index) => {
        educations.push({
          e_id: index,
          e_university_name: item.university_name,
          e_course_name: item.course_name,
          e_year_start: item.year_start,
          e_year_end: item.year_end,
          e_detail: item.detail,
          e_error: null,
        });
      });
      setEducationalRows(educations);
      let professionalExperiences = [];
      cvDetails.professional_experience.map((item, index) => {
        professionalExperiences.push({
          pe_id: index,
          pe_company_name: item.company_name,
          pe_job_title: item.job_title,
          pe_year_start: item.year_start,
          pe_year_end: item.year_end,
          pe_detail: item.detail,
          pe_error: null,
        });
      });
      setProfessionalExperienceRows(professionalExperiences);
      let languages = [];
      cvDetails.languages.map((item, index) => {
        languages.push({
          l_id: index,
          l_language: item.language_id,
          l_error: null,
        });
      });
      setLanguageRows(languages);
      let skills = [];
      cvDetails.skills.map((item, index) => {
        skills.push(item.it_skill_id);
      });
      setSkills(skills);
    }
  }, [cvDetails]);

  const appendEducationalVideo = (e) => {
    e.preventDefault();
    let rows = [...educationalRows];
    let id = rows[rows.length - 1].e_id + 1;
    rows.push({
      e_id: id,
      e_university_name: "",
      e_course_name: "",
      e_year_start: "",
      e_year_end: "",
      e_detail: "",
      e_error: null,
    })
    setEducationalRows(rows);
  };

  const handleEducationalSectionChange = (e, e_id, fieldName) => {
    let index = educationalRows.findIndex((row) => row.e_id === e_id);
    let values = [...educationalRows];
    values[index][fieldName] = e.target.value;

    if (values[index]['e_error'] !== null) {
      let obj = values[index];
      let error = false;
      Object.keys(obj).forEach((key) => {
        if (obj[key] === "") {
          error = true;
        }
      });
      if (!error) {
        values[index]['e_error'] = null;
      }
    }

    setEducationalRows(values);
  };


  const removeEducationalVideo = (e_id) => {
    let rows = [...educationalRows];
    let newRows = rows.filter((row) => row.e_id !== e_id);
    setEducationalRows(newRows);
  };

  const appendProfessionalExperience = (e) => {
    e.preventDefault();
    let rows = [...professionalExperienceRows];
    let id = rows[rows.length - 1].pe_id + 1;
    rows.push({
      pe_id: id,
      pe_company_name: "",
      pe_job_title: "",
      pe_year_start: "",
      pe_year_end: "",
      pe_detail: "",
      pe_error: null,
    })
    setProfessionalExperienceRows(rows);
  };

  const handleProfessionalExperienceChange = (e, pe_id, fieldName) => {
    let index = professionalExperienceRows.findIndex((row) => row.pe_id === pe_id);
    let values = [...professionalExperienceRows];
    values[index][fieldName] = e.target.value;

    if (values[index]['pe_error'] !== null) {
      let obj = values[index];
      let error = false;
      Object.keys(obj).forEach((key) => {
        if (obj[key] === "") {
          error = true;
        }
      });
      if (!error) {
        values[index]['pe_error'] = null;
      }
    }

    setProfessionalExperienceRows(values);
  };

  const removeProfessionalExperience = (pe_id) => {
    let rows = [...professionalExperienceRows];
    rows = rows.filter((row) => row.pe_id !== pe_id);
    setProfessionalExperienceRows(rows);
  };

  const appendLanguage = (e) => {
    e.preventDefault();
    let rows = [...languageRows];
    let id = rows[rows.length - 1].l_id + 1;
    rows.push({
      l_id: id,
      l_language: "",
      l_error: null,
    })
    setLanguageRows(rows);
  };

  const handleLanguageChange = (e, l_id, fieldName) => {
    let index = languageRows.findIndex((row) => row.l_id === l_id);
    let values = [...languageRows];
    values[index][fieldName] = e.target.value;

    if (values[index]['l_error'] !== null) {
      let obj = values[index];
      let error = false;
      Object.keys(obj).forEach((key) => {
        if (obj[key] === "") {
          error = true;
        }
      });
      if (!error) {
        values[index]['l_error'] = null;
      }
    }
    setLanguageRows(values);
  };

  const removeLanguage = (l_id) => {
    let rows = [...languageRows];
    rows = rows.filter((row) => row.l_id !== l_id);
    setLanguageRows(rows);
  };

  const handleChange = (tags) => {
    setSkills(tags);
    if (skillsError !== null) {
      tags.length > 0 ? setSkillsError(null) : setSkillsError("Please select at least one skill");
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();

    let data = {
      educationalRows,
      professionalExperienceRows,
      languageRows,
      skills,
    };
    let error = false;

    data.educationalRows.forEach((row) => {
      if (
        row.e_university_name === "" ||
        row.e_course_name === "" ||
        row.e_year_start === "" ||
        row.e_year_end === "" ||
        row.e_detail === ""
      ) {
        let educationalRows = [...data.educationalRows];
        educationalRows[row.e_id].e_error = "Please fill all the fields";
        data.educationalRows = educationalRows;
        setEducationalRows(educationalRows);
        error = true;
        return;
      } else {
        let educationalRows = [...data.educationalRows];
        educationalRows[row.e_id].e_error = null;
        data.educationalRows = educationalRows;
        setEducationalRows(educationalRows);
      }
    });

    data.professionalExperienceRows.forEach((row) => {
      if (
        row.pe_company_name === "" ||
        row.pe_job_title === "" ||
        row.pe_year_start === "" ||
        row.pe_year_end === "" ||
        row.pe_detail === ""
      ) {
        let professionalExperienceRows = [...data.professionalExperienceRows];
        professionalExperienceRows[row.pe_id].pe_error =
          "Please fill all the fields";
        data.professionalExperienceRows = professionalExperienceRows;
        setProfessionalExperienceRows(professionalExperienceRows);
        error = true;
        return;
      } else {
        let professionalExperienceRows = [...data.professionalExperienceRows];
        professionalExperienceRows[row.pe_id].pe_error = null;
        data.professionalExperienceRows = professionalExperienceRows;
        setProfessionalExperienceRows(professionalExperienceRows);
      }
    });

    data.languageRows.forEach((row) => {
      if (row.l_language === "") {
        let languageRows = [...data.languageRows];
        languageRows[row.l_id].l_error = "Language field is required";
        data.languageRows = languageRows;
        setLanguageRows(languageRows);
        error = true;
        return;
      } else {
        let languageRows = [...data.languageRows];
        languageRows[row.l_id].l_error = null;
        data.languageRows = languageRows;
        setLanguageRows(languageRows);
      }
    });

    if (data.skills.length === 0) {
      setSkillsError("Please add at least one skill");
      error = true;
    } else {
      setSkillsError(null);
    }

    let skillsObject = [];
    data.skills.forEach((skill) => {
      skillsObject.push({ s_skill: skill });
    });
    data.skills = skillsObject;


    if (error) {
      return;
    }

    dispatch(saveCV(data));
  };

  const downloadPDF = () => {
    const input = document.getElementById("cv-form");
    html2canvas(input, { scale: 1 }).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a3");
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save(`${memData?.mem_fname}.pdf`);
    });
  };



  return (
    <>
      {isLoading || isSiteSettingsLoading ? (
        <LoadingScreen />
      ) : (
        <>

          <ToastContainer />
          <HeaderLogged />
          <main dashboard="">

            <section className="dash_outer">
              <div className="inner_dash">
                <div className="side_bar">
                  <Sidebar />
                </div>
                <div className="content_area cv-downloader">
                  <div className="dash_header">
                    <h3>
                      Dashboard <span>/ My CV</span>
                    </h3>
                  </div>
                  <div className="dash_body">
                    <div className="outer_cv">
                      <div className="colR">
                        <div className="cv_head">
                          <h4>Preview</h4>
                          <div className="btn_blk custom-btn-blk">
                            <button
                              className="site_btn green_btn webBtn"
                              form="save-cv-form"
                              type="submit"
                              disabled={isCvSubmitting}
                            >
                              <FormProcessingSpinner
                                isFormProcessing={cvAction === "saved"}
                              />
                              Save
                            </button>

                            <a className="webBtn" href={paths.API_BASE_URL + "download-cv/" + memData?.encoded_id + "/" + authToken} target="_blank">
                              Download
                            </a>
                          </div>
                        </div>
                        <div className="cv_form" id="cv-form">
                          <div className="main_intro text-center">
                            <h2 className="heading">{`${memData?.mem_fname} ${memData?.mem_lname}`}</h2>
                            <p>{`${memData?.mem_email} | ${memData?.mem_phone}`}</p>
                          </div>
                          <form
                            id="save-cv-form"
                            onSubmit={onSubmit}
                          >
                            <div className="main_field_blk">
                              <div className="blk_out">
                                <div className="inner_field_blk">
                                  <h4 className="heading">EDUCATION</h4>
                                  {educationalRows.map((row, index) => (
                                    <>
                                      <div className="field_flex" key={index}>
                                        <div className="col_sm_9">
                                          <div className="form_blk_new">
                                            <input
                                              type="text"
                                              placeholder="University name"
                                              className="dim_field bold_text"
                                              value={row.e_university_name}
                                              onChange={(e) =>
                                                handleEducationalSectionChange(
                                                  e,
                                                  row.e_id,
                                                  'e_university_name'
                                                )
                                              }
                                            />
                                          </div>
                                        </div>
                                        <div className="col_sm_3 flex">
                                          <div className="form_blk_new">
                                            <input
                                              type="number"
                                              pattern="[0-9]{4}"
                                              placeholder="YYYY"
                                              className={
                                                `my-number-input dim_field bold_text year_field` +
                                                (errors.e_year_start?.[index]?.type === "required" && !row.e_year_start && " input-error"
                                                )
                                              }
                                              value={row.e_year_start}
                                              onChange={(e) =>
                                                handleEducationalSectionChange(
                                                  e,
                                                  row.e_id,
                                                  'e_year_start'
                                                )
                                              }
                                              onKeyDown={(event) => {
                                                if (event.target.value.length >= 4 && event.key !== "Backspace" && event.key !== "Delete") {
                                                  event.preventDefault();
                                                }
                                                if (event.key === "e" || event.key === "E" || event.key === "-" || event.key === " " || event.key === ".") {
                                                  event.preventDefault();
                                                }
                                              }}
                                            />
                                          </div>
                                          <span>-</span>
                                          <div className="form_blk_new">
                                            <input
                                              type="number"
                                              pattern="[0-9]{4}"
                                              placeholder="YYYY"
                                              className={`my-number-input dim_field bold_text year_field`}
                                              value={row.e_year_end}
                                              onChange={(e) =>
                                                handleEducationalSectionChange(
                                                  e,
                                                  row.e_id,
                                                  'e_year_end'
                                                )
                                              }
                                              onKeyDown={(event) => {
                                                if (event.target.value.length >= 4 && event.key !== "Backspace" && event.key !== "Delete") {
                                                  event.preventDefault();
                                                }
                                                if (event.key === "e" || event.key === "E" || event.key === "-" || event.key === " " || event.key === ".") {
                                                  event.preventDefault();
                                                }
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="form_blk_new">
                                        <input
                                          type="text"
                                          placeholder="Course name"
                                          className="dim_field bold_text"
                                          value={row.e_course_name}
                                          onChange={(e) =>
                                            handleEducationalSectionChange(
                                              e,
                                              row.e_id,
                                              'e_course_name'
                                            )
                                          }
                                        />
                                      </div>
                                      <div className="form_blk_new">
                                        <textarea
                                          className="dim_field light_text"
                                          placeholder="Please describe about your course details"
                                          value={row.e_detail}
                                          onChange={(e) =>
                                            handleEducationalSectionChange(
                                              e,
                                              row.e_id,
                                              'e_detail'
                                            )
                                          }
                                        />
                                      </div>
                                      {index > 0 && (
                                        <div className="remove_text_btn">
                                          <a
                                            className="remove_text validation-error"
                                            onClick={() =>
                                              removeEducationalVideo(
                                                row.e_id
                                              )
                                            }
                                          >
                                            Remove
                                          </a>
                                        </div>
                                      )}

                                      {row.e_error && (
                                        <span className="validation-error">
                                          {row.e_error}
                                        </span>
                                      )}
                                    </>
                                  ))}
                                </div>
                                <div className="add_more_field_btn">
                                  <div className="btn_blk custom-btn-blk">
                                    <button
                                      className="site_btn cv-button   light"
                                      onClick={appendEducationalVideo}
                                    >
                                      + Add Education
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="blk_out">
                                <div className="inner_field_blk">
                                  <h4 className="heading">
                                    Professional experience
                                  </h4>
                                  {professionalExperienceRows &&
                                    professionalExperienceRows.map(
                                      (row, index) => (
                                        <>
                                          <div
                                            className="field_flex"
                                            key={index}
                                          >
                                            <div className="col_sm_9">
                                              <div className="form_blk_new">
                                                <input
                                                  type="text"
                                                  placeholder="Company name"
                                                  className="dim_field bold_text"
                                                  value={row.pe_company_name}
                                                  onChange={(e) =>
                                                    handleProfessionalExperienceChange(
                                                      e,
                                                      row.pe_id,
                                                      'pe_company_name'
                                                    )
                                                  }
                                                />
                                              </div>
                                            </div>
                                            <div className="col_sm_3 flex">
                                              <div className="form_blk_new">
                                                <input
                                                  type="number"
                                                  pattern="[0-9]{4}"
                                                  placeholder="YYYY"
                                                  value={row.pe_year_start}
                                                  className={`my-number-input dim_field bold_text year_field`}
                                                  onChange={(e) =>
                                                    handleProfessionalExperienceChange(
                                                      e,
                                                      row.pe_id,
                                                      'pe_year_start'
                                                    )
                                                  }
                                                  onKeyDown={(event) => {
                                                    if (event.target.value.length >= 4 && event.key !== "Backspace" && event.key !== "Delete") {
                                                      event.preventDefault();
                                                    }
                                                    if (event.key === "e" || event.key === "E" || event.key === "-" || event.key === " " || event.key === ".") {
                                                      event.preventDefault();
                                                    }
                                                  }}
                                                />
                                              </div>
                                              <span>-</span>
                                              <div className="form_blk_new">
                                                <input
                                                  type="number"
                                                  pattern="[0-9]{4}"
                                                  placeholder="YYYY"
                                                  className={`my-number-input dim_field bold_text year_field`}
                                                  value={row.pe_year_end}
                                                  onChange={(e) =>
                                                    handleProfessionalExperienceChange(
                                                      e,
                                                      row.pe_id,
                                                      'pe_year_end'
                                                    )
                                                  }
                                                  onKeyDown={(event) => {
                                                    if (event.target.value.length >= 4 && event.key !== "Backspace" && event.key !== "Delete") {
                                                      event.preventDefault();
                                                    }
                                                    if (event.key === "e" || event.key === "E" || event.key === "-" || event.key === " " || event.key === ".") {
                                                      event.preventDefault();
                                                    }
                                                  }}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                          <div className="form_blk_new">
                                            <input
                                              type="text"
                                              placeholder="Job title"
                                              className="dim_field bold_text"
                                              value={row.pe_job_title}
                                              onChange={(e) =>
                                                handleProfessionalExperienceChange(
                                                  e,
                                                  row.pe_id,
                                                  'pe_job_title'
                                                )
                                              }
                                            />
                                          </div>
                                          <div className="form_blk_new">
                                            <textarea
                                              className="dim_field light_text"
                                              placeholder="Please describe about your responsibilties and duties in this position "
                                              value={row.pe_detail}
                                              onChange={(e) =>
                                                handleProfessionalExperienceChange(
                                                  e,
                                                  row.pe_id,
                                                  'pe_detail'
                                                )
                                              }
                                            />
                                          </div>
                                          {index > 0 && (
                                            <div className="remove_text_btn">
                                              <a
                                                className="remove_text validation-error"
                                                onClick={() =>
                                                  removeProfessionalExperience(
                                                    row.pe_id
                                                  )
                                                }
                                              >
                                                Remove
                                              </a>
                                            </div>
                                          )}
                                          {row.pe_error && (
                                            <span className="validation-error">
                                              {row.pe_error}
                                            </span>
                                          )}
                                        </>
                                      )
                                    )}
                                </div>
                                <div className="add_more_field_btn">
                                  <div className="btn_blk custom-btn-blk">
                                    <button
                                      className="site_btn cv-button   light"
                                      onClick={appendProfessionalExperience}
                                    >
                                      + Add Experience
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="blk_out">
                                <div className="inner_field_blk">
                                  {languageRows &&
                                    languageRows.map((row, index) => (
                                      <>
                                        <div
                                          className="form_blk_new gap_bot"
                                          key={index}
                                        >
                                          <h6>Languages :</h6>
                                          <select
                                            className="input txtBox"
                                            value={row.l_language}
                                            onChange={(e) =>
                                              handleLanguageChange(e, row.l_id, 'l_language')
                                            }
                                          >
                                            <option value="">Select</option>
                                            {languages &&
                                              languages.map((l) => (
                                                <option value={l.id} key={l.id}>
                                                  {l.name}
                                                </option>
                                              ))}
                                          </select>
                                        </div>
                                        {index > 0 && (
                                          <div className="remove_text_btn">
                                            <a
                                              className="remove_text validation-error"
                                              onClick={() =>
                                                removeLanguage(row.l_id)
                                              }
                                            >
                                              Remove
                                            </a>
                                          </div>
                                        )}
                                        {row.l_error && (
                                          <span className="validation-error">
                                            {row.l_error}
                                          </span>
                                        )}
                                      </>
                                    ))}
                                </div>
                                <div className="add_more_field_btn">
                                  <div className="btn_blk custom-btn-blk">
                                    <button
                                      className="site_btn cv-button   light"
                                      onClick={appendLanguage}
                                    >
                                      + Add Language
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div className="blk_out">
                                <div className="inner_field_blk">
                                  <h4 className="heading">Skills</h4>
                                  <div className="form_blk_new gap_bot">
                                    <h6>IT skills :</h6>
                                    <TagsInput
                                      value={skills}
                                      onChange={handleChange}
                                      // onChange={setSkills}
                                      name="tags"
                                      placeHolder="Write a skill and press enter to write multiple skills"
                                    />
                                  </div>
                                  {skillsError && (
                                    <span className="validation-error">
                                      {skillsError}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </>
      )}
    </>
  );
};

export default CV;
