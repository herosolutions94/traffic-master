import React, { useEffect, useState } from "react";
import Header from "../../shared/Header";
import Footer from "../../shared/Footer";

import {
  fetchResetPassword,
  setPassword
} from "../../../states/actions/fetchResetPassword";
import { useSelector, useDispatch } from "react-redux";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import LoadingScreen from "../../common/LoadingScreen";
import FormProcessingSpinner from "../../common/FormProcessingSpinner";

import Text from "../../common/Text";
import { Link, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

const Forgot = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fetchResetPassword.content);
  const isLoading = useSelector((state) => state.fetchResetPassword.isLoading);
  const isFormProcessing = useSelector(
    (state) => state.fetchResetPassword.isFormProcessing
  );
  const { content, site_settings } = data;

  useEffect(() => {
    dispatch(fetchResetPassword());
  }, []);

  const [showPassOne, setShowPassOne] = useState(false);
  const [showPassTwo, setShowPassTwo] = useState(false);

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit
  } = useForm();

  const submit = (formData) => {
    formData = { ...formData, token: token };
    dispatch(setPassword(formData));
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
                      <Text string={content.right_heading} />
                    </h3>
                    <p>
                      <Text string={content.right_tagline} />
                    </p>
                    <div className="txtGrp pasDv">
                      <label htmlFor className="move">
                        <Text string={content.first_field_placeholder} />
                      </label>
                      <input
                        type={showPassOne ? "text" : "password"}
                        id="password"
                        className="txtBox"
                        {...register("password", {
                          required: "Password is required.",
                          minLength: {
                            value: 6,
                            message:
                              "Password should be atleast 6 characters long."
                          }
                        })}
                      />

                      <i
                        className={showPassOne ? "icon-eye-slash" : "icon-eye"}
                        id="eye"
                        onClick={() => setShowPassOne(!showPassOne)}
                      />
                      <span className="validation-error">
                        {errors.password?.message}
                      </span>
                    </div>
                    <div className="txtGrp pasDv">
                      <label htmlFor className="move">
                        <Text string={content.second_field_heading} />
                      </label>
                      <input
                        type={showPassTwo ? "text" : "password"}
                        id="c_password"
                        className="txtBox"
                        {...register("c_password", {
                          required: "Confirm Password is required.",
                          validate: (val) => {
                            if (watch("password") != val) {
                              return "Your passwords do no match.";
                            }
                          },
                          minLength: {
                            value: 6,
                            message:
                              "Password should be atleast 6 characters long."
                          }
                        })}
                      />
                      <i
                        className={showPassTwo ? "icon-eye-slash" : "icon-eye"}
                        id="eye"
                        onClick={() => setShowPassTwo(!showPassTwo)}
                      />
                      <span className="validation-error">
                        {errors.c_password?.message}
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
