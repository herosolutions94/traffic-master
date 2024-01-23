import React, { useEffect, useState } from "react";
import Header from "../../shared/Header";
import Footer from "../../shared/Footer";

import {
  fetchContactUs,
  saveContact
} from "../../../states/actions/fetchContactUs";
import { useSelector, useDispatch } from "react-redux";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import LoadingScreen from "../../common/LoadingScreen";
import FormProcessingSpinner from "../../common/FormProcessingSpinner";
import { getBackgroundImageUrlThumb } from "../../../helpers/helpers";

import Text from "../../common/Text";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

const ContactUs = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fetchContactUs.content);
  const isLoading = useSelector((state) => state.fetchContactUs.isLoading);
  const isFormProcessing = useSelector(
    (state) => state.fetchContactUs.isFormProcessing
  );
  const { content, site_settings } = data;

  useEffect(() => {
    dispatch(fetchContactUs());
  }, []);

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit
  } = useForm();

  const firstSubmit = (data) => {
    dispatch(saveContact(data));
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
          <main index>
            <section
              className="become_seller_banner"
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
                  <Text string={content.banner_detail} />
                </div>
              </div>
            </section>
            <section className="contact_sec">
              <div className="contain">
                <div className="flex">
                  <div className="colL">
                    <div className="inner">
                      <h3>
                        <Text string={content.cu_heading} />
                      </h3>
                      <Text string={content.cu_desc} />
                      <ul>
                        <li>
                          <i className="fa fa-map-marker" />
                          <span className="cntact_lnks">
                            <Text string={content.cu_address} />
                          </span>
                        </li>
                        <li>
                          <i className="fa fa-envelope" />
                          <a
                            href={`mailto:${content.cu_email}`}
                            className="cntact_lnks"
                          >
                            <Text string={content.cu_email} />
                          </a>
                        </li>
                        <li>
                          <i className="fa fa-phone" />
                          <a
                            href={`tel:${content.cu_phone}`}
                            className="cntact_lnks"
                          >
                            <Text string={content.cu_phone} />
                          </a>
                        </li>
                      </ul>
                      <h4>
                        <Text string={content.cu_heading_11} />
                      </h4>
                      <div className="bTn">
                        <Link
                          to={content.cu_banner_button_link}
                          className="webBtn whiteBtn"
                        >
                          <Text string={content.cu_banner_button_title} />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="colR">
                    <form
                      action=""
                      method="POST"
                      onSubmit={handleSubmit(firstSubmit)}
                    >
                      <h3 className="heading">
                        <Text string={content.cu_form_1_heading} />
                      </h3>
                      <div className="form_row row">
                        <div className="col-xs-6">
                          <h6>
                            {content.cu_form_1_field_heading}
                            <sup>*</sup>
                          </h6>
                          <div className="form_blk">
                            <input
                              type="text"
                              className="txtBox"
                              placeholder={content.cu_form_1_field_placeholder}
                              {...register("name", {
                                required: "Name is required."
                              })}
                            />
                            <span className="validation-error">
                              {errors.name?.message}
                            </span>
                          </div>
                        </div>
                        <div className="col-xs-6">
                          <h6>
                            {content.cu_form_2_field_heading}
                            <sup>*</sup>
                          </h6>
                          <div className="form_blk">
                            <input
                              type="text"
                              className="txtBox"
                              placeholder={content.cu_form_2_field_placeholder}
                              {...register("phone", {
                                required: "Phone is required."
                              })}
                            />
                            <span className="validation-error">
                              {errors.phone?.message}
                            </span>
                          </div>
                        </div>
                        <div className="col-xs-6">
                          <h6>
                            {content.cu_form_3_field_heading} <sup>*</sup>
                          </h6>
                          <div className="form_blk">
                            <input
                              type="text"
                              className="txtBox"
                              placeholder={content.cu_form_3_field_placeholder}
                              {...register("subject", {
                                required: "Subject is required."
                              })}
                            />
                            <span className="validation-error">
                              {errors.subject?.message}
                            </span>
                          </div>
                        </div>
                        <div className="col-xs-6">
                          <h6>
                            {content.cu_form_4_field_heading} <sup>*</sup>
                          </h6>
                          <div className="form_blk">
                            <input
                              type="text"
                              className="txtBox"
                              placeholder={content.cu_form_4_field_placeholder}
                              {...register("email", {
                                required: "Email is required.",
                                pattern: {
                                  value:
                                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                  message: "Please enter a valid email"
                                }
                              })}
                            />
                            <span className="validation-error">
                              {errors.email?.message}
                            </span>
                          </div>
                        </div>
                        <div className="col-xs-12">
                          <h6>{content.cu_form_5_field_heading}</h6>
                          <div className="form_blk">
                            <textarea
                              className="txtBox"
                              placeholder={content.cu_form_5_field_placeholder}
                              defaultValue={""}
                              {...register("msg", {
                                required: "Comment is required."
                              })}
                            />
                            <span className="validation-error">
                              {errors.msg?.message}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="btn_blk form_btn text-center">
                        <button
                          type="submit"
                          className="webBtn colorBtn"
                          disabled={isFormProcessing}
                        >
                          <Text string={content.cu_form_button_text} />
                          <FormProcessingSpinner
                            isFormProcessing={isFormProcessing}
                          />
                        </button>
                      </div>
                    </form>
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

export default ContactUs;
