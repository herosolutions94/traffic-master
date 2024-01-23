import React, { useEffect, useState } from "react";
import Header from "../../shared/Header";
import Footer from "../../shared/Footer";

import { fetchSignin, signin } from "../../../states/actions/fetchSignin";
import { useSelector, useDispatch } from "react-redux";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import LoadingScreen from "../../common/LoadingScreen";
import FormProcessingSpinner from "../../common/FormProcessingSpinner";

import Text from "../../common/Text";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

const Signin = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fetchSignin.content);
  const isLoading = useSelector((state) => state.fetchSignin.isLoading);
  const isFormProcessing = useSelector(
    (state) => state.fetchSignin.isFormProcessing
  );
  const { content, site_settings } = data;

  const selectedLanguage = localStorage.getItem("site_lang");

  useEffect(() => {
    dispatch(fetchSignin());
  }, []);

  const [showPassOne, setShowPassOne] = useState(false);

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit
  } = useForm();

  const firstSubmit = (data) => {
    dispatch(signin(data));
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
                        className="txtBox"
                        {...register("email", {
                          required: selectedLanguage === "eng" ? "Email is required." : "L'adresse e-mail est requise.",

                          pattern: {
                            value:
                              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: selectedLanguage === "eng" ? "Please enter a valid email address." : "Veuillez saisir une adresse e-mail valide."
                          }
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
                        <Text string={content.second_field_placeholder} />
                      </label>
                      <input
                        type={showPassOne ? "text" : "password"}
                        className="txtBox"
                        {...register("password", {
                          required: selectedLanguage === "eng" ? "Password is required." : "Le mot de passe est requis.",
                        })}
                      />
                      <i
                        className={showPassOne ? "icon-eye-slash signin_i" : "icon-eye signin_i"}
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

                    <div className="txtGrp remember-btn">
                      <div className="lblBtn">
                        <input
                          type="checkbox"
                          name="remeberMe"
                          id="remember"
                          defaultChecked
                        />
                        <label htmlFor="remember">
                          <Text string={content.forgot_password} />
                        </label>
                      </div>
                      <Link to="/forgot-password" id="pass">
                        <Text string={content.remember_me} />
                      </Link>
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
                      <Text string={content.forgot_password_heading} />
                    </span>
                    <p>
                      Signup as <Link to={'/pricing'}>Employer</Link> or <Link to={'/signup-candidate'}>Candidate</Link>
                    </p>
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

export default Signin;
