import React, { useEffect, useState } from "react";
import HeaderLogged from "../../../shared/HeaderLogged";
import EmployerSidebar from "../../../shared/Employer-Sidebar";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchJobDetails } from "../../../../states/actions/fetchJobDetails";
import { fetchJobCategories } from "../../../../states/actions/fetchJobCategories";
import { fetchJobTypes } from "../../../../states/actions/fetchJobTypes";
import { fetchJobSubCategories } from "../../../../states/actions/fetchJobSubCategories";
import { fetchJobExperienceLevels } from "../../../../states/actions/fetchJobExperienceLevels";
import { fetchJobLocations } from "../../../../states/actions/fetchJobLocations";
import { updateJob } from "../../../../states/actions/employerJobs";
import { API_UPLOADS_URL } from "../../../../constants/paths";
import FormProcessingSpinner from "../../../common/FormProcessingSpinner";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TagsInput } from "react-tag-input-component";
import ImageControl from "../../../common/ImageControl";

const EditJob = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const jobDetails = useSelector(
    (state) => state.fetchJobDetails.jobDetails.job
  );
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
  const isFormProcessing = useSelector(
    (state) => state.employerJobs.isFormProcessing
  );
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [tags, setTags] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [tagsError, setTagsError] = useState('');
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ defaultValues: {} });

  const validateMaxSalary = (value) => {
    let minSalary = watch("min_salary");
    value = Number(value);
    minSalary = Number(minSalary);
    if (minSalary && value < minSalary) {
      return "Max salary must be greater than min salary";
    }
    return true;
  };

  const validateMaxWorkingHour = (value) => {
    let minHours = watch("min_working_hour");
    value = Number(value);
    minHours = Number(minHours);
    if (minHours && value < minHours) {
      return "Max hours must be greater than min hours";
    }
    return true;
  };

  useEffect(() => {
    dispatch(fetchJobDetails(id));
    dispatch(fetchJobCategories());
    dispatch(fetchJobTypes());
    dispatch(fetchJobExperienceLevels());
    dispatch(fetchJobLocations());
  }, [id]);

  useEffect(() => {
    if (jobDetails?.job_cat) {
      setDescription(jobDetails?.description);
      if (jobDetails?.tags.split(",").length > 1) {
        const tagsArray = jobDetails?.tags.split(",");
        setTags(tagsArray);
      } else {
        setTags([jobDetails?.tags]);
      }
      dispatch(fetchJobSubCategories(jobDetails?.job_cat));
      for (const [key, value] of Object.entries(jobDetails)) {
        setValue(key, value);
      }
    }
  }, [jobDetails]);

  const handleCategoryChange = (e) => {
    dispatch(fetchJobSubCategories(e.target.value));
  };

  const saveJob = (data) => {
    if (description === '') {
      setDescriptionError('Description is required');
      return false;
    }
    if (tags.length === 0) {
      setTagsError('Tags are required');
      return false;
    }
    data.description = description;
    data.tags = tags;
    dispatch(updateJob(id, data));
  };

  const updateUploadImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageUrl(reader.result);
    };
  };

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
                  Dashboard <span>/ My Jobs </span> <em>/ Edit Job Details</em>
                </h3>
              </div>
              <div className="dash_body">
                <div className="dash_heading_sec">
                  <h2>Edit Job Details</h2>
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
                            Title*
                          </label>
                          <input
                            type="text"
                            name="title"
                            className="txtBox"
                            defaultValue={watch("title")}
                            {...register("title", {
                              required: "Title is required",
                            })}
                          />
                          {errors.title && (
                            <span className="validation-error">
                              {errors.title?.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">
                            Category*
                          </label>
                          <select
                            name="job_cat"
                            className="txtBox"
                            defaultValue={watch("job_cat")}
                            {...register("job_cat", {
                              required: "Category is required",
                            })}
                            onChange={handleCategoryChange}
                          >
                            <option value="" selected disabled>
                              Select Category
                            </option>
                            {jobCategories?.map((category) => (
                              <option
                                value={category.id}
                                selected={category.id === jobDetails?.job_cat}
                              >
                                {category.title}
                              </option>
                            ))}
                          </select>
                          {errors.job_cat && (
                            <span className="validation-error">
                              {errors.job_cat?.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">
                            Sub Category*
                          </label>
                          <select
                            name="job_sub_cat"
                            className="txtBox"
                            defaultValue={watch("job_sub_cat")}
                            {...register("job_sub_cat", {
                              required: "Sub Category is required",
                            })}
                          >
                            <option value="" selected disabled>
                              Select Sub Category
                            </option>
                            {jobSubCategories?.map((subCategory) => (
                              <option
                                value={subCategory.id}
                                selected={
                                  subCategory.id === jobDetails?.job_sub_cat
                                }
                              >
                                {subCategory.title}
                              </option>
                            ))}
                          </select>
                          {errors.job_sub_cat && (
                            <span className="validation-error">
                              {errors.job_sub_cat?.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">
                            Job Type*
                          </label>
                          <select
                            name="job_type"
                            className="txtBox"
                            defaultValue={watch("job_type")}
                            {...register("job_type", {
                              required: "Job Type is required",
                            })}
                          >
                            <option value="" selected disabled>
                              Select Job Type
                            </option>
                            {jobTypes?.map((jobType) => (
                              <option
                                value={jobType.id}
                                selected={jobType.id === jobDetails?.job_type}
                              >
                                {jobType.title}
                              </option>
                            ))}
                          </select>
                          {errors.job_type && (
                            <span className="validation-error">
                              {errors.job_type?.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">
                            Experience Level*
                          </label>
                          <select
                            name="job_level"
                            className="txtBox"
                            defaultValue={watch("job_level")}
                            {...register("job_level", {
                              required: "Experience Level is required",
                            })}
                          >
                            <option value="" selected disabled>
                              Select Experience Level
                            </option>
                            {jobExperienceLevels?.map((jobExperienceLevel) => (
                              <option
                                value={jobExperienceLevel.id}
                                selected={
                                  jobExperienceLevel.id ===
                                  jobDetails?.job_level
                                }
                              >
                                {jobExperienceLevel.title}
                              </option>
                            ))}
                          </select>
                          {errors.job_level && (
                            <span className="validation-error">
                              {errors.job_level?.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">
                            Job Office Type*
                          </label>
                          <select
                            name="job_office_type"
                            className="txtBox"
                            defaultValue={watch("job_office_type")}
                            {...register("job_office_type", {
                              required: "Job Location is required",
                            })}
                          >
                            <option value="" selected disabled>
                              Select Job Type
                            </option>
                            {jobLocations?.map((jobLocation) => (
                              <option
                                value={jobLocation.id}
                                selected={
                                  jobLocation.id === jobDetails?.job_office_type
                                }
                              >
                                {jobLocation.title}
                              </option>
                            ))}
                          </select>
                          {errors.job_office_type && (
                            <span className="validation-error">
                              {errors.job_office_type?.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="txtGrp tags">
                          <label htmlFor className="move move_important">Tags*</label>
                          <TagsInput
                            value={tags}
                            onChange={setTags}
                            name="tags"
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
                            Company Name*
                          </label>
                          <input
                            type="text"
                            name="company_name"
                            className="txtBox"
                            defaultValue={jobDetails?.company_name}
                            {...register("company_name", {
                              required: "Company Name is required",
                            })}
                          />
                          {errors.company_name && (
                            <span className="validation-error">
                              {errors.company_name?.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">
                            Company Link*
                          </label>
                          <input
                            type="text"
                            name="company_link"
                            className="txtBox"
                            defaultValue={jobDetails?.company_link}
                            {...register("company_link", {
                              required: "Company Link is required",
                            })}
                          />
                          {errors.company_link && (
                            <span className="validation-error">
                              {errors.company_link?.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">
                            Location (city)*
                          </label>
                          <input
                            type="text"
                            name="city"
                            className="txtBox"
                            defaultValue={jobDetails?.city}
                            {...register("city", {
                              required: "Location is required",
                            })}
                          />
                          {errors.city && (
                            <span className="validation-error">
                              {errors.city?.message}
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
                            name="company_logo"
                            className="txtBox"
                            defaultValue={watch("company_logo")}
                            onChange={(e) => {
                              setValue("company_logo", e.target.files[0]);
                              updateUploadImage(e);
                            }}
                          />
                          <div className="company_image">
                            {imageUrl ? <img src={imageUrl} alt="Preview" /> : jobDetails?.company_logo && (
                              <ImageControl isThumb={true} folder="jobs" src={jobDetails?.company_logo} />
                            )}
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
                            Minimum Salary*
                          </label>
                          <input
                            type="number"
                            name="min_salary"
                            className="txtBox"
                            defaultValue={watch("min_salary")}
                            {...register("min_salary", {
                              required: "Minimum Salary is required",
                              pattern: {
                                value: /^[0-9]*$/,
                                message: "Please enter a valid number"
                              }
                            })}
                          />
                          {errors.min_salary && (
                            <span className="validation-error">
                              {errors.min_salary?.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">
                            Maximum Salary*
                          </label>
                          <input
                            type="number"
                            name="max_salary"
                            className="txtBox"
                            defaultValue={watch("max_salary")}
                            {...register("max_salary", {
                              required: "Maximum Salary is required",
                              pattern: {
                                value: /^[0-9]*$/,
                                message: "Please enter a valid number"
                              },
                              validate: validateMaxSalary,
                            })}
                          />
                          {errors.max_salary && (
                            <span className="validation-error">
                              {errors.max_salary?.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">
                            Min. Working Hours*
                          </label>
                          <input
                            type="number"
                            name="min_working_hour"
                            className="txtBox"
                            defaultValue={watch("min_working_hour")}
                            {...register("min_working_hour", {
                              required: "Min. Working Hours is required",
                              pattern: {
                                value: /^[0-9]*$/,
                                message: "Please enter a valid number"
                              }
                            })}
                          />
                          {errors.min_working_hour && (
                            <span className="validation-error">
                              {errors.min_working_hour?.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <label htmlFor className="move move_important">
                            Max. Working Hours*
                          </label>
                          <input
                            type="number"
                            name="max_working_hour"
                            className="txtBox"
                            defaultValue={watch("max_working_hour")}
                            {...register("max_working_hour", {
                              required: "Max. Working Hours is required",
                              pattern: {
                                value: /^[0-9]*$/,
                                message: "Please enter a valid number"
                              },
                              validate: validateMaxWorkingHour,
                            })}
                          />
                          {errors.max_working_hour && (
                            <span className="validation-error">
                              {errors.max_working_hour?.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12 ckEditor">
                        {/* <div className="txtGrp">
                          <label htmlFor className="move move_important">
                            Description*
                          </label>
                          <textarea
                            name="description"
                            id
                            className="txtBox"
                            defaultValue={watch("description")}
                            {...register("description", {
                              required: "Description is required",
                            })}
                          />
                          {errors.description && (
                            <span className="validation-error">
                              {errors.description?.message}
                            </span>
                          )}
                        </div> */}
                        <div className="txtGrp">
                          <CKEditor
                            editor={ClassicEditor}
                            data={description}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setDescription(data);
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
                      <button type="submit" className="webBtn icoBtn" disabled={isFormProcessing}>
                        Update
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

export default EditJob;
