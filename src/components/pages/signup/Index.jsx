import React, { useEffect, useState } from "react";
import Header from "../../shared/Header";
import Footer from "../../shared/Footer";

import {
  fetchSignup,
  createAccount,
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
    handleSubmit,
  } = useForm();

  const firstSubmit = (data) => {
    dispatch(createAccount(data));
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
                  <form
                    action=""
                    method="POST"
                    onSubmit={handleSubmit(firstSubmit)}
                  >
                    <h3>
                      <Text string={content.right_heading} />
                    </h3>
                    <p>
                      <Text string={content.right_tagline} />
                    </p>
                    <div className="txtGrp">
                      <label htmlFor className="move">
                        <Text string={content.first_field_placeholder} />
                      </label>
                      <input
                        type="text"
                        id="fname"
                        className="txtBox"
                        {...register("fname", {
                          required: "First Name is required.",
                          maxLength: {
                            value: 20,
                            message:
                              "First Name should Not be greater than 20 characters.",
                          },
                          minLength: {
                            value: 2,
                            message:
                              "First Name should be greater than atleast 2 characters.",
                          },
                        })}
                      />
                      {
                        errors.fname?.message ?

                          <span className="validation-error">
                            {errors.fname?.message}
                          </span>
                          :
                          ""
                      }
                    </div>
                    <div className="txtGrp">
                      <label htmlFor className="move">
                        <Text string={content.second_field_placeholder} />
                      </label>
                      <input
                        type="text"
                        id="lname"
                        className="txtBox"
                        {...register("lname", {
                          required: "Last Name is required.",
                          maxLength: {
                            value: 20,
                            message:
                              "Last Name should Not be greater than 20 characters.",
                          },
                          minLength: {
                            value: 2,
                            message:
                              "Last Name should be greater than atleast 2 characters.",
                          },
                        })}
                      />
                      {
                        errors.lname?.message ?

                          <span className="validation-error">
                            {errors.lname?.message}
                          </span>
                          :
                          ""
                      }
                    </div>
                    <div className="txtGrp">
                      <label htmlFor className="move">
                        <Text string={content.third_field_placeholder} />
                      </label>
                      <input
                        type="text"
                        id="email"
                        className="txtBox"
                        {...register("email", {
                          required: "Email is required.",
                          pattern: {
                            value:
                              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Please enter a valid email",
                          },
                        })}
                      />
                      {
                        errors.email?.message ?

                          <span className="validation-error">
                            {errors.email?.message}
                          </span>
                          :
                          ""
                      }
                    </div>
                    <div className="txtGrp pasDv">
                      <label htmlFor className="move">
                        <Text string={content.fourth_field_placeholder} />
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
                              "Password should be atleast 6 characters long.",
                          },
                        })}
                      />

                      <i
                        className={showPassOne ? "icon-eye-slash" : "icon-eye"}
                        id="eye"
                        onClick={() => setShowPassOne(!showPassOne)}
                      />
                      {
                        errors.password?.message ?

                          <span className="validation-error">
                            {errors.password?.message}
                          </span>
                          :
                          ""
                      }
                    </div>
                    <div className="txtGrp pasDv">
                      <label htmlFor className="move">
                        <Text string={content.fifth_field_placeholder} />
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
                              "Password should be atleast 6 characters long.",
                          },
                        })}
                      />
                      <i
                        className={showPassTwo ? "icon-eye-slash" : "icon-eye"}
                        id="eye"
                        onClick={() => setShowPassTwo(!showPassTwo)}
                      />
                      {
                        errors.c_password?.message ?

                          <span className="validation-error">
                            {errors.c_password?.message}
                          </span>
                          :
                          ""
                      }
                    </div>
                    <div className="txtGrp flex">
                      <div className="lblBtn">
                        <input
                          type="checkbox"
                          name="confirm"
                          id="confirm"
                          {...register("confirm", {
                            required: "Please accept terms and conditions.",
                          })}
                        />
                        <label htmlFor="confirm">
                          By signing up, I agree to V &amp; S
                          <a href="/terms-and-conditions" target="_blank">
                            {" "}
                            Terms &amp; Conditions
                          </a>{" "}
                          and{" "}
                          <a href="/privacy-policy" target="_blank">
                            Privacy Policy.
                          </a>
                        </label>
                      </div>
                      {
                        errors.confirm?.message ?
                          <span className="validation-error">
                            {errors.confirm?.message}
                          </span>
                          :
                          ""
                      }
                    </div>
                    <div className="bTn text-center">
                      <button
                        type="submit"
                        className="webBtn blockBtn icoBtn"
                        disabled={isFormProcessing}
                      >
                        <img src="images/icon-pencil.svg" alt="" />
                        <Text string={content.submit_text} />
                        <FormProcessingSpinner
                          isFormProcessing={isFormProcessing}
                        />
                      </button>
                    </div>
                  </form>
                  <div className="haveAccount text-center">
                    <span>
                      <Text string={content.last_heading} />
                    </span>
                    <Link to={content.last_link}>Signin</Link>
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

export default Signup;
