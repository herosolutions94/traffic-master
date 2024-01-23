import React, { useEffect, useState } from "react";
import Header from "../../shared/Header";
import Footer from "../../shared/Footer";

import {
  fetchForgotPassword,
  sendLink
} from "../../../states/actions/fetchForgotPassword";
import { useSelector, useDispatch } from "react-redux";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import LoadingScreen from "../../common/LoadingScreen";
import FormProcessingSpinner from "../../common/FormProcessingSpinner";

import Text from "../../common/Text";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

const Forgot = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fetchForgotPassword.content);
  const isLoading = useSelector((state) => state.fetchForgotPassword.isLoading);
  const isFormProcessing = useSelector(
    (state) => state.fetchForgotPassword.isFormProcessing
  );
  const { content, site_settings } = data;

  useEffect(() => {
    dispatch(fetchForgotPassword());
  }, []);

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit
  } = useForm();

  const submit = (data) => {
    dispatch(sendLink(data));
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
            <section className="logon">
              <div className="contain">
                <div className="log_blk">
                  <form action="" method="POST" onSubmit={handleSubmit(submit)}>
                    <h3>
                      <Text string={content.heading} />
                    </h3>
                    <p>
                      <Text string={content.detail} />
                    </p>
                    <div className="txtGrp">
                      <label htmlFor className="move">
                        <Text string={content.first_field_heading} />
                      </label>
                      <input
                        type="text"
                        className="txtBox"
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
                    <div className="bTn text-center">
                      <button
                        type="submit"
                        className="webBtn blockBtn icoBtn"
                        disabled={isFormProcessing}
                      >
                        <img src="images/icon-pencil.svg" alt="" />{" "}
                        <Text string={content.submit_text} />
                        <FormProcessingSpinner
                          isFormProcessing={isFormProcessing}
                        />
                      </button>
                    </div>
                  </form>
                  <div className="haveAccount text-center">
                    <span>
                      <Text string={content.forgot_password} />
                    </span>{" "}
                    <Link to={content.forgot_password_link}>
                      <Text string={content.forgot_password_heading} />
                    </Link>
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

export default Forgot;
