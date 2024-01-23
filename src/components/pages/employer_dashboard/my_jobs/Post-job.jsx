import React, { useState, useEffect } from "react";
import EmployerSidebar from "../../../shared/Employer-Sidebar";
import HeaderLogged from "../../../shared/HeaderLogged";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobs, saveJobAction } from "../../../../states/actions/fetchJobs";
import { fetchJobCategories } from "../../../../states/actions/fetchJobCategories";
import { fetchJobTypes } from "../../../../states/actions/fetchJobTypes";
import { fetchJobSubCategories } from "../../../../states/actions/fetchJobSubCategories";
import { fetchJobExperienceLevels } from "../../../../states/actions/fetchJobExperienceLevels";
import { fetchJobLocations } from "../../../../states/actions/fetchJobLocations";
import { ToastContainer } from "react-toastify";
import FormProcessingSpinner from "../../../common/FormProcessingSpinner";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { TagsInput } from "react-tag-input-component";
import { API_UPLOADS_URL } from "../../../../constants/paths"

const PostNewJob = () => {
  const dispatch = useDispatch();
  const [pushPopup, setPushPopup] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const data = useSelector((state) => state.fetchJobs.content);
  const jobCategories = useSelector(
    (state) => state.fetchJobCategories.categories
  );
  const jobTypes = useSelector((state) => state.fetchJobTypes.jobTypes);
  const jobSubCategories = useSelector(
    (state) => state.fetchJobSubCategories.subCategories
  );
  const jobExperienceLevels = useSelector(
    (state) => state.fetchJobExperienceLevels.experienceLevels
  );
  const jobLocations = useSelector(
    (state) => state.fetchJobLocations.locations
  );
  const [tags, setTags] = useState([]);
  const [tagsError, setTagsError] = useState("");
  const isFormProcessing = useSelector(
    (state) => state.fetchJobs.isFormProcessing
  );

  useEffect(() => {
    dispatch(fetchJobs());
    dispatch(fetchJobCategories());
    dispatch(fetchJobTypes());
    dispatch(fetchJobExperienceLevels());
    dispatch(fetchJobLocations());
  }, []);

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    trigger,
  } = useForm();

  const validateMaxSalary = (value) => {
    let minSalary = watch("minimum_salary");
    minSalary = Number(minSalary);
    value = Number(value);
    if (minSalary && value < minSalary) {
      return "Max salary must be greater than min salary";
    }
    return true;
  };

  const validateMaxWorkingHour = (value) => {
    let minHours = watch("min_working_hours");
    minHours = Number(minHours);
    value = Number(value);
    if (minHours && value < minHours) {
      return "Max hours must be greater than min hours";
    }
    return true;
  };

  const handleCategoryChange = (e) => {
    dispatch(fetchJobSubCategories(e.target.value));
  };

  const saveJob = (data) => {
    if (description === "") {
      setDescriptionError("Description is required");
      return false;
    }
    if (tags.length === 0) {
      setTagsError("Tags are required");
      return false;
    }
    data.description = description;
    data.tags = tags;
    dispatch(saveJobAction(data));
  };

  const handleImgChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    trigger("company_image");
  };
  const handleSubmitForm = (e) => {
    if (description === "") {
      setDescriptionError("Description is required");
      return false;
    }
  }
  const removeError = () => {
    setDescriptionError(false);
  }

  return (
    <>
      <ToastContainer />
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
                  Dashboard <span>/ My Jobs </span> <em>/ Post New Job</em>
                </h3>
              </div>
              <div className="dash_body">
                <div className="dash_heading_sec">
                  <h2>Post New Job</h2>
                  <Link to="/employer/my-jobs">Back to page &gt;&gt;</Link>
                </div>
                <div className="dash_blk_box">
                  <form
                    action
                    method="post"
                    className="frmAjax"
                    id="frmTopic"
                    enctype="multipart/form-data"
                    onSubmit={handleSubmit(saveJob)}
                  >
                    <div className="formRow row">
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">
                            Title
                          </label>
                          <input
                            type="text"
                            name="title"
                            className="txtBox"
                            {...register("title", {
                              required: "Title is required",
                            })}
                          />
                          {errors.title && (
                            <span className="validation-error">
                              {errors.title.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">
                            Category
                          </label>
                          <select
                            name="category"
                            id
                            className="txtBox"
                            {...register("category", {
                              required: "Category is required",
                            })}
                            onChange={handleCategoryChange}
                          >
                            <option value="" selected disabled>
                              Select Category
                            </option>
                            {jobCategories?.map((category) => (
                              <option value={category.id}>
                                {category.title}
                              </option>
                            ))}
                          </select>
                          {errors.category && (
                            <span className="validation-error">
                              {errors.category.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">
                            Sub Category
                          </label>
                          <select
                            name="sub_category"
                            id
                            className="txtBox"
                            {...register("sub_category", {
                              required: "Sub Category is required",
                            })}
                          >
                            <option value="" selected disabled>
                              Select Sub Category
                            </option>
                            {jobSubCategories?.map((subCategory) => (
                              <option value={subCategory.id}>
                                {subCategory.title}
                              </option>
                            ))}
                          </select>
                          {errors.sub_category && (
                            <span className="validation-error">
                              {errors.sub_category.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">
                            Job Type
                          </label>
                          <select
                            name="job_type"
                            id
                            className="txtBox"
                            {...register("job_type", {
                              required: "Job Type is required",
                            })}
                          >
                            <option value="" selected disabled>
                              Select Job Type
                            </option>
                            {jobTypes?.map((jobType) => (
                              <option value={jobType.id}>
                                {jobType.title}
                              </option>
                            ))}
                          </select>
                          {errors.job_type && (
                            <span className="validation-error">
                              {errors.job_type.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">
                            Experience Level
                          </label>
                          <select
                            name="experience_level"
                            id
                            className="txtBox"
                            {...register("experience_level", {
                              required: "Experience Level is required",
                            })}
                          >
                            <option value="" selected disabled>
                              Select Experience Level
                            </option>
                            {jobExperienceLevels?.map((jobExperienceLevel) => (
                              <option value={jobExperienceLevel.id}>
                                {jobExperienceLevel.title}
                              </option>
                            ))}
                          </select>
                          {errors.experience_level && (
                            <span className="validation-error">
                              {errors.experience_level.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">
                            Job Office Type
                          </label>
                          <select
                            name="job_office_type"
                            id
                            className="txtBox"
                            {...register("job_office_type", {
                              required: "Job Location is required",
                            })}
                          >
                            <option value="" selected disabled>
                              Select Job Type
                            </option>
                            {jobLocations?.map((jobLocation) => (
                              <option value={jobLocation.id}>
                                {jobLocation.title}
                              </option>
                            ))}
                          </select>
                          {errors.job_office_type && (
                            <span className="validation-error">
                              {errors.job_office_type.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="txtGrp tags">
                          <label htmlFor className="move move_important">
                            Tags*
                          </label>
                          <TagsInput
                            value={tags}
                            onChange={setTags}
                            name="tags"
                            placeHolder="Write a tag and press enter to write multiple tags"
                          />
                          {tagsError && (
                            <span className="validation-error">
                              {tagsError}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="dash_heading_sec">
                          <h3>Company Info</h3>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">
                            Company Name
                          </label>
                          <input
                            type="text"
                            name="company_name"
                            className="txtBox"
                            {...register("company_name", {
                              required: "Company Name is required",
                            })}
                          />
                          {errors.company_name && (
                            <span className="validation-error">
                              {errors.company_name.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">
                            Company Link
                          </label>
                          <input
                            type="text"
                            name="company_link"
                            className="txtBox"
                            {...register("company_link", {
                              required: "Company Link is required",
                            })}
                          />
                          {errors.company_link && (
                            <span className="validation-error">
                              {errors.company_link.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">
                            Location (city)
                          </label>
                          <input
                            type="text"
                            name="city"
                            className="txtBox"
                            {...register("city", {
                              required: "Location is required",
                            })}
                          />
                          {errors.city && (
                            <span className="validation-error">
                              {errors.city.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">
                            Zip Code
                          </label>
                          <input
                            type="text"
                            name="zip_code"
                            className="txtBox"
                            {...register("zip_code", {
                              required: "Zip Code is required",
                            })}
                          />
                          {errors.zip_code && (
                            <span className="validation-error">
                              {errors.zip_code.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">
                            Company Image
                          </label>
                          <input
                            type="file"
                            name="company_image"
                            className="txtBox"
                            {...register("company_image", {
                              required: "Company Image is required",
                            })}
                            onChange={handleImgChange}
                          />
                          {errors.company_image && (
                            <span className="validation-error">
                              {errors.company_image.message}
                            </span>
                          )}
                          <div className="company_image">
                            {imageUrl ? <img src={imageUrl} alt="Preview" /> : null}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="dash_heading_sec">
                          <h3>Salary Information</h3>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">
                            Minimum Salary
                          </label>
                          <input
                            type="number"
                            name="minimum_salary"
                            className="txtBox"
                            {...register("minimum_salary", {
                              required: "Minimum Salary is required",
                              pattern: {
                                value: /^[0-9]*$/,
                                message: "Please enter a valid number",
                              },
                            })}
                          />
                          {errors.minimum_salary && (
                            <span className="validation-error">
                              {errors.minimum_salary.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">
                            Maximum Salary
                          </label>
                          <input
                            type="number"
                            name="maximum_salary"
                            className="txtBox"
                            {...register("maximum_salary", {
                              required: "Maximum Salary is required",
                              pattern: {
                                value: /^[0-9]*$/,
                                message: "Please enter a valid number",
                              },
                              validate: validateMaxSalary,
                            })}
                          />
                          {errors.maximum_salary && (
                            <span className="validation-error">
                              {errors.maximum_salary.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">
                            Min. Working Hours
                          </label>
                          <input
                            type="text"
                            name="min_working_hours"
                            className="txtBox"
                            {...register("min_working_hours", {
                              required: "Min. Working Hours is required",
                              pattern: {
                                value: /^[0-9]*$/,
                                message: "Please enter a valid number",
                              },
                            })}
                          />
                          {errors.min_working_hours && (
                            <span className="validation-error">
                              {errors.min_working_hours.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">
                            Max. Working Hours
                          </label>
                          <input
                            type="text"
                            name="max_working_hours"
                            className="txtBox"
                            {...register("max_working_hours", {
                              required: "Max. Working Hours is required",
                              pattern: {
                                value: /^[0-9]*$/,
                                message: "Please enter a valid number",
                              },
                              validate: validateMaxWorkingHour,
                            })}
                          />
                          {errors.max_working_hours && (
                            <span className="validation-error">
                              {errors.max_working_hours.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12 ckEditor">
                        <div className="txtGrp">
                          <CKEditor
                            editor={ClassicEditor}
                            data={description}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setDescription(data);
                              removeError();
                            }}
                            config={{
                              placeholder: "Description...",
                            }}
                          />
                          {descriptionError && (
                            <span className="validation-error">
                              {descriptionError}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="bTn formBtn text-center">
                      <button
                        type="submit"
                        onClick={handleSubmitForm}
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
          </div>
        </section>
      </main>
    </>
  );
};

export default PostNewJob;
