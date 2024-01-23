import React, { useEffect, useState, useMemo } from "react";
import Header from "../../shared/Header";
import Footer from "../../shared/Footer";
import Text from "../../common/Text";

import {
  fetchSignupEmployer,
  createAccount,
  backToSignup,
  verifyEmail,
} from "../../../states/actions/fetchSignupEmployer";
import { useSelector, useDispatch } from "react-redux";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import LoadingScreen from "../../common/LoadingScreen";
import FormProcessingSpinner from "../../common/FormProcessingSpinner";
// import Text from "../../common/Text";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import * as paths from "../../../constants/paths";
import http from "../../../helpers/http";
import { toast } from "react-toastify";
import { TOAST_SETTINGS } from "../../../utils/siteSettings";

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

const useOptions = () => {
  const options = useMemo(
    () => ({
      style: {
        base: {
          display: "block",
          width: "100%",
          height: "5.3rem",
          fontFamily: "'Red Hat Display', sans-serif",
          fontWeight: "500",
          color: "#061237",
          background: "#fff",
          "text-align": "left",
          padding: "0.6rem 1.4rem",
          "::placeholder": {
            color: "#130a2952",
            fontSize: "15px",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    []
  );

  return options;
};



const Signup = () => {
  const { planId } = useParams();
  const options = useOptions();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fetchSignupEmployer.content);
  console.log(data);
  const isLoading = useSelector((state) => state.fetchSignupEmployer.isLoading);
  const [activePackage, setActivePackage] = useState(false);
  const ToggleActivePackage = () => {
    setActivePackage(!activePackage);
  };
  const isFormProcessing = useSelector(
    (state) => state.fetchSignupEmployer.isFormProcessing
  );
  const isFirstStepCompleted = useSelector(
    (state) => state.fetchSignupEmployer.isFirstStepCompleted
  );
  let firstSession = localStorage.getItem("isFirstStepCompleted");

  const isSecondStepCompleted = useSelector(
    (state) => state.fetchSignupEmployer.isSecondStepCompleted
  );
  let secondSession = localStorage.getItem("isSecondStepCompleted");

  const { content, site_settings } = data;
  useEffect(() => {
    dispatch(fetchSignupEmployer({ planId }));
  }, []);

  const [showPassOne, setShowPassOne] = useState(false);
  const [showPassTwo, setShowPassTwo] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState(null);
  const [cardLoading, setCardLoading] = useState(false);
  const selectedLanguage = localStorage.getItem("site_lang");

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const firstSubmit = (data) => {
    data = { ...data, planId };
    dispatch(createAccount(data));
  };

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm();

  const {
    register: register3,
    formState: { errors: errors3 },
    handleSubmit: handleSubmit3,
  } = useForm();

  const secondSubmit = (data) => {
    data = { ...data, email: localStorage.getItem("email") };
    dispatch(verifyEmail(data));
  };

  const handleBackToPreviousForm = (e) => {
    e.preventDefault();
    localStorage.removeItem("isFirstStepCompleted");
    localStorage.removeItem("email");
    dispatch(backToSignup());
    // navigate("/signup");
  };

  const handleImgChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    if (!file.type.match("image.*")) {
      setImageUrl(null);
      return;
    }
    reader.onload = () => {
      setImageUrl(reader.result);
    };
  };

  const handleFormSubmit = (data) => {
    setCardLoading(true);
    handleSubmitCard(data);
  };

  const handleSubmitCard = async (post) => {
    setCardError(null);

    if (elements == null) {
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);
    try {
      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        // billing_details: billingDetails
      });
      if (paymentMethodReq.error) {
        setCardError(paymentMethodReq.error.message);
        setCardLoading(false);
        return false;
      } else {
        var form_data = new FormData();
        for (var key in post) {
          form_data.append(key, post[key]);
        }
        form_data.append("payment_method", paymentMethodReq.paymentMethod.id);
        form_data.append("plan_id", planId);
        form_data.append("token", localStorage.getItem("authToken"));
        http
          .post(`${paths.API_BASE_URL}user/create-payment-intent`, form_data)
          .then((data) => {
            if (data?.data?.status === 0) {
              setCardError(data.data.msg);
              setCardLoading(false);
              return false;
            }
            if (data?.data?.status === 1) {
              const {
                subscriptionId,
                clientSecret,
                clientSecretSetup,
                customerId,
              } = data.data;
              let card_result = stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                  card: cardElement,
                  // billing_details: billingDetails,
                },
              });

              if (card_result.error) {
                setCardError(card_result.error.message);
                setCardLoading(false);
                return false;
              } else {
                card_result.then((response) => {
                  if (response.error) {
                    setCardError(response.error.message);
                    setCardLoading(false);
                    return false;
                  } else {
                    chargePayment(
                      post,
                      subscriptionId,
                      customerId,
                      response.paymentIntent
                    );
                    toast.success(
                      "You have successfully subscribed this plan",
                      TOAST_SETTINGS
                    );
                    setTimeout(() => {
                      var origin = window.location.origin;
                      let memType = localStorage.getItem("memType");
                      window.location.replace(`${origin}/${memType}/dashboard`);
                    }, 3000);
                  }
                });
              }
            } else {
              setCardError(data.data.msg);
              setCardLoading(false);
              return false;
            }
          });
      }
    } catch (err) {
      setCardError(err.message);
      setCardLoading(false);
    }
  };

  const chargePayment = async (
    post,
    subscriptionId,
    customerId,
    paymentIntent
  ) => {
    let formValues = post;
    let newData = {
      ...formValues,
      // payment_intent: paymentIntent,
      subscriptionId: subscriptionId,
      customer_id: customerId,
      plan_id: planId,
    };

    // dispatch(makeSubsPayment(newData));
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
            <section className="new_logon after_pricing">
              <div className="contain">
                <div className="log_blk">
                  <div className="sec_heading">
                    <h2>{content.banner_heading}</h2>
                    <p>{content.plan?.heading}</p>
                  </div>
                  <div className="blk_choose flex">
                    <div className="left_cntnt">
                      <ul>
                        <li>{content.plan?.no_of_jobs} job postings</li>
                        <li>{content.plan?.no_of_push} time push to top</li>
                        <li>{content.plan?.no_of_days} days of limited access</li>
                      </ul>
                    </div>
                    <div className="right_cntnt">
                      <h3>${content.plan?.price}</h3>
                      <small>{content.plan?.tax_amount}% tax included</small>
                    </div>
                  </div>
                  <div className="included_lst">
                    {/* <br /> */}
                    <h5 onClick={ToggleActivePackage}>
                      <i className="fa fa-plus-circle" /> Included in your
                      package
                    </h5>
                    <div
                      className={
                        activePackage ? "txt_included active" : "txt_included"
                      }
                    >
                      <div className="ckEditor">
                        <p>Packages include:</p>
                        <Text string={content.plan?.included_in_the_plan} />
                      </div>
                    </div>
                  </div>
                  <form
                    onSubmit={handleSubmit(firstSubmit)}
                    style={{
                      display:
                        (!firstSession && !secondSession) ? "block" : "none",
                    }}
                    enctype="multipart/form-data"
                  >
                    <div className="row formRow">
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <h6>
                            {content.first_field_placeholder}
                          </h6>
                          <input
                            type="text"
                            className="txtBox"
                            {...register("reference_num")}
                          />
                        </div>
                      </div>
                      <div className="col-md-6" />
                      <div className="col-md-12">
                        <h4>{content.first_heading}</h4>
                        <p>
                          <small>
                            {content.first_sub_heading}
                          </small>
                        </p>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <h6>{content.second_field_placeholder}</h6>
                          <input
                            type="text"
                            className="txtBox"
                            {...register("company_name", {
                              required: selectedLanguage === "eng" ? "Company name is required." : "Le nom de la compagnie est requis.",
                            })}
                          />
                          <span className="validation-error">
                            {errors.company_name?.message}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <h6>{content.third_field_placeholder}</h6>
                          <input
                            type="text"
                            className="txtBox"
                            {...register("email", {
                              required: selectedLanguage === "eng" ? "Email is required." : "L'email est requis.",
                              pattern: {
                                value:
                                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: selectedLanguage === "eng" ? "Please enter a valid email address." : "Veuillez entrer une adresse e-mail valide.",
                              },
                            })}
                          />
                          <span className="validation-error">
                            {errors.email?.message}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <h6>{content.fourth_field_placeholder}</h6>
                          <input
                            type="text"
                            className="txtBox"
                            {...register("address", {
                              required: selectedLanguage === "eng" ? "Address is required." : "L'adresse est requise.",
                            })}
                          />
                          <span className="validation-error">
                            {errors.address?.message}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <h6>{content.fifth_field_placeholder}</h6>
                          <select
                            className="txtBox"
                            {...register("province", {
                              required: selectedLanguage === "eng" ? "Province is required." : "La province est requise.",
                            })}
                          >
                            <option value="" />
                            <option value="AB">Alberta</option>
                            <option value="BC">British Columbia</option>
                            <option value="MB">Manitoba</option>
                            <option value="NB">New Brunswick</option>
                            <option value="NL">
                              Newfoundland and Labrador
                            </option>
                            <option value="NT">Northwest Territories</option>
                            <option value="NS">Nova Scotia</option>
                            <option value="NU">Nunavut</option>
                            <option value="ON">Ontario</option>
                            <option value="PE">Prince Edward Island</option>
                            <option value="QC">Quebec</option>
                            <option value="SK">Saskatchewan</option>
                            <option value="YT">Yukon</option>
                            <option value="--">--Other--</option>
                            <option value="AF">Africa</option>
                            <option value="NA">United States / Mexico</option>
                            <option value="SA">South America</option>
                            <option value="EU">Europe</option>
                            <option value="AS">Asia</option>
                            <option value="OC">Oceania</option>
                          </select>
                          <span className="validation-error">
                            {errors.province?.message}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="txtGrp">
                          <h6>{content.sixth_field_placeholder}</h6>
                          <textarea
                            className="txtBox"
                            {...register("company_description")}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <h6>
                            {content.seventh_field_placeholder}
                          </h6>
                          <input
                            type="text"
                            className="txtBox"
                            {...register("website")}
                          />
                        </div>
                      </div>
                      <div className="col-md-6" />
                      <div className="col-md-12">
                        <h4>{content.second_heading}</h4>
                        <p>
                          <small>
                            {content.second_sub_heading}
                          </small>
                        </p>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <h6>{content.eighth_field_placeholder}</h6>
                          <input
                            type="text"
                            className="txtBox"
                            {...register("fname", {
                              required: selectedLanguage === "eng" ? "First Name is required." : "Le prénom est requis.",
                              maxLength: {
                                value: 20,
                                message: selectedLanguage === "eng" ? "First Name should Not be greater than 20 characters." : "Le prénom ne doit pas dépasser 20 caractères.",
                              },
                              minLength: {
                                value: 2,
                                message:
                                  selectedLanguage === "eng" ? "First Name should be greater than atleast 2 characters." : "Le prénom doit comporter au moins 2 caractères.",

                              },
                            })}
                          />
                          <span className="validation-error">
                            {errors.fname?.message}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <h6>{content.ninth_field_placeholder}</h6>
                          <input
                            type="text"
                            className="txtBox"
                            {...register("lname", {
                              required: selectedLanguage === "eng" ? "Last Name is required." : "Le nom de famille est requis.",
                              maxLength: {
                                value: 20,
                                message:
                                  selectedLanguage === "eng" ? "Last Name should Not be greater than 20 characters." : "Le nom de famille ne doit pas dépasser 20 caractères."
                              },
                              minLength: {
                                value: 2,
                                message:
                                  selectedLanguage === "eng" ? "Last Name should be greater than atleast 2 characters." : "Le nom de famille doit comporter au moins 2 caractères.",
                              },
                            })}
                          />
                          <span className="validation-error">
                            {errors.lname?.message}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <h6>{content.tenth_field_placeholder}</h6>
                          <input
                            type="text"
                            name="phone"
                            id="phone"
                            className="txtBox"
                            {...register("phone", {
                              required: selectedLanguage === "eng" ? "Phone Number is required." : "Le numéro de téléphone est requis.",
                            })}
                          />
                          <span className="validation-error">
                            {errors.phone?.message}
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="txtGrp">
                          <h6>{content.eleventh_field_placeholder}</h6>
                          <input
                            type="file"
                            name="image"
                            className="txtBox"
                            {...register("image", {
                              required: selectedLanguage === "eng" ? "Image is required." : "L'image est requise.",
                              validate: (value) => {
                                if (value[0]) {
                                  const fileExtension =
                                    value[0].name.split(".")[1];
                                  if (
                                    fileExtension === "jpg" ||
                                    fileExtension === "jpeg" ||
                                    fileExtension === "png"
                                  ) {
                                    return true;
                                  } else {
                                    return selectedLanguage === "eng" ? "Only jpg, jpeg and png files are allowed." : "Seuls les fichiers jpg, jpeg et png sont autorisés.";
                                  }
                                }
                              },
                            })}
                            onChange={handleImgChange}
                          />
                          {errors.image && (
                            <span className="validation-error">
                              {errors.image.message}
                            </span>
                          )}
                          <div className="company_image">
                            {imageUrl ? <img src={imageUrl} alt="Preview" /> : null}
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6" />
                      <div className="col-md-12">
                        <h4>{content.third_heading}</h4>
                        <p>
                          <small>
                            {content.third_sub_heading}
                          </small>
                        </p>
                      </div>
                      <div className="col-md-12">
                        <div className="txtGrp">
                          <h6>
                            {content.twelveth_field_placeholder}
                          </h6>
                          <select name="sector" id className="txtBox">
                            <option value>
                              Advertising Agencies - Communications
                            </option>
                            <option value>Internet - Web - Multimedia</option>
                            <option value>Computers - Software</option>
                            <option value>Leisure - Tourism</option>
                            <option value>Arts - Culture</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <h4>{content.fourth_heading}</h4>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <h6>
                            <i className="fa fa-facebook-square" /> {content.thirteenth_field_placeholder}
                          </h6>
                          <input
                            type="text"
                            className="txtBox"
                            {...register("facebook_link")}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <h6>
                            <i className="fa fa-twitter-square" /> {content.fourteenth_field_placeholder}
                          </h6>
                          <input
                            type="text"
                            className="txtBox"
                            {...register("twitter_link")}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <h6>
                            <i className="fa fa-instagram" /> {content.fifteenth_field_placeholder}
                          </h6>
                          <input
                            type="text"
                            className="txtBox"
                            {...register("instagram_link")}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp">
                          <h6>
                            <i className="fa fa-linkedin-square" /> {content.sixteenth_field_placeholder}
                          </h6>
                          <input
                            type="text"
                            className="txtBox"
                            {...register("linkedin_link")}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <h4>{content.fifth_heading}</h4>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp pasDv">
                          <h6>
                            {content.seventh_field_placeholder} * <small>(minimum 8 characters)</small>
                          </h6>
                          <div className="relative">
                            <input
                              type={showPassOne ? "text" : "password"}
                              className="txtBox"
                              {...register("password", {
                                required: selectedLanguage === "eng" ? "Password is required." : "Le mot de passe est requis.",
                                minLength: {
                                  value: 8,
                                  message:
                                    selectedLanguage === "eng" ? "Password should be atleast 8 characters long." : "Le mot de passe doit comporter au moins 8 caractères.",
                                },
                              })}
                            />
                            <i
                              className={
                                showPassOne ? "fa fa-eye-slash" : "fa fa-eye"
                              }
                              id="eye"
                              onClick={() => setShowPassOne(!showPassOne)}
                            />
                          </div>
                          <span className="validation-error">
                            {errors.password?.message}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="txtGrp pasDv">
                          <h6>{content.eighteenth_field_placeholder} *</h6>
                          <div className="relative">
                            <input
                              type={showPassTwo ? "text" : "password"}
                              className="txtBox"
                              {...register("c_password", {
                                required: selectedLanguage === "eng" ? "Confirm password is required." : "Confirmez le mot de passe est requis.",
                                validate: (val) => {
                                  if (watch("password") != val) {
                                    return selectedLanguage === "eng" ? "Password does not match." : "Le mot de passe ne correspond pas.";
                                  }
                                },
                                minLength: {
                                  value: 8,
                                  message: selectedLanguage === "eng" ? "Password should be atleast 8 characters long." : "Le mot de passe doit comporter au moins 8 caractères.",
                                },
                              })}
                            />
                            <i
                              className={
                                showPassTwo ? "fa fa-eye-slash" : "fa fa-eye"
                              }
                              id="eye"
                              onClick={() => setShowPassTwo(!showPassTwo)}
                            />
                          </div>
                          <span className="validation-error">
                            {errors.c_password?.message}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="txtGrp flex">
                          <div className="lblBtn">
                            <input
                              type="checkbox"
                              {...register("confirm", {
                                required: selectedLanguage === "eng" ? "Please accept terms and conditions." : "Veuillez accepter les conditions générales.",
                              })}
                            />
                            <label htmlFor="confirm">
                              By validating below, I agree to V &amp; S
                              <a
                                href="/terms-and-conditions"
                                target="_blank"
                              >
                                &nbsp;Terms &amp; Conditions
                              </a>
                              &nbsp;and
                              <a href="/privacy-policy" target="_blank">
                                &nbsp;Privacy Policy.
                              </a>
                            </label>
                          </div>
                        </div>
                        <span className="validation-error">
                          {errors.confirm?.message}
                        </span>
                      </div>
                    </div>
                    <div className="bTn text-center">
                      <button
                        type="submit"
                        className="webBtn blockBtn icoBtn"
                        disabled={isFormProcessing}
                      >
                        <FormProcessingSpinner
                          isFormProcessing={isFormProcessing}
                        />
                        Finish registration
                      </button>
                    </div>
                    <input
                      type="file"
                      id="uploadFile"
                      name="uploadFile"
                      className="uploadFile"
                      data-file
                    />
                  </form>
                  <form
                    onSubmit={handleSubmit2(secondSubmit)}
                    style={{
                      display:
                        (firstSession && !secondSession) ? "block" : "none",
                    }}
                  >

                    <h3>Email Verification</h3>
                    <div className="row formRow">
                      <div className="col-md-12">
                        <div className="txtGrp">
                          <h6>Enter OTP</h6>
                          <input
                            type="text"
                            className="txtBox"
                            placeholder="Enter 6 digit OTP"
                            {...register2("code", {
                              required: selectedLanguage === "eng" ? "Six digit code is required." : "Le code à six chiffres est requis.",
                            })}
                          />
                          <span className="validation-error">
                            {errors2.code?.message}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="bTn text-center">
                      <button
                        onClick={handleBackToPreviousForm}
                        className="back_btn_btn webBtn"
                      >
                        Back to signup
                      </button>
                      <button
                        type="submit"
                        className="webBtn blockBtn icoBtn"
                        disabled={isFormProcessing}
                      >
                        Submit
                        <FormProcessingSpinner
                          isFormProcessing={isFormProcessing}
                        />
                      </button>
                    </div>
                  </form>
                  <br />
                  <div className="payment_method_blk"
                    style={{
                      display:
                        (firstSession && secondSession) ? "block" : "none",
                    }}
                  >
                    <div className="blk">
                      <div className="_header">
                        <h3>Payment Method</h3>
                      </div>
                      <div className="creditCard">
                        <div className="flex flex-2 headCredit cardSecBar">
                          <div className="inner">
                            <div className="lblBtn text-left">
                              <input
                                type="radio"
                                id="card1"
                                tabIndex={1}
                                name="card"
                                defaultChecked
                              />
                              <label htmlFor="card1">Credit Card</label>
                            </div>
                          </div>
                          <div className="inner">
                            <ul className="text-right">
                              <li>
                                <img src="images/card1.svg" alt="" />
                              </li>
                              <li>
                                <img src="images/card2.svg" alt="" />
                              </li>
                              <li>
                                <img src="images/card3.svg" alt="" />
                              </li>
                            </ul>
                          </div>
                        </div>
                        <form
                          action=""
                          method="POST"
                          onSubmit={handleSubmit3(handleFormSubmit)}
                        >
                          <div className="flex flex-2 cardSec">
                            <div className="inner">
                              <CardNumberElement
                                options={options}
                                className="txtBox"
                              />
                            </div>
                            <div className="inner">
                              <input
                                type="text"
                                placeholder="Card Holder"
                                className="txtBox"
                                {...register3("name_on_card", {
                                  required: selectedLanguage === "eng" ? "Name on the card is required." : "Le nom sur la carte est requis.",
                                })}
                              />
                              <span className="validation-error">
                                {errors3.name_on_card?.message}
                              </span>
                            </div>
                            <div className="inner">
                              <CardExpiryElement
                                options={options}
                                className="txtBox"
                              />
                            </div>
                            <div className="inner">
                              <CardCvcElement
                                options={options}
                                className="txtBox"
                              />
                              <div className="info">
                                <i className="fi-question" />
                                <div className="infoTip">
                                  3-digit security code usually found on the back
                                  of your card. American Express cards have a
                                  4-digit code located on the front.
                                </div>
                              </div>
                            </div>
                          </div>
                          <span className="validation-error">{cardError}</span>
                          <div className="btn_blk form_btn form_blk">
                            <button
                              type="submit"
                              className="site_btn block webBtn icoBtn"
                              disabled={!stripe || !elements || cardLoading}
                            >
                              <FormProcessingSpinner isFormProcessing={cardLoading} />
                              Pay now
                            </button>
                            <div className="strip_card_image">
                              <img src="/images/payment_strip_new.PNG" alt="" />
                            </div>
                          </div>
                        </form>
                        {/* <div className="flex flex-2 headCredit paypalSecBar">
                          <div className="inner">
                            <div className="lblBtn text-left">
                              <input
                                type="radio"
                                id="card2"
                                tabIndex={1}
                                name="card"
                              />
                              <label htmlFor="card2">Pay Pal</label>
                            </div>
                          </div>
                          <div className="inner"></div>
                        </div> */}
                        <div className="paypalSec text-center">
                          <div className="ico">
                            <img src="images/card-out.svg" alt="" />
                          </div>
                          <p>
                            After clicking "Finish Registeration", you will be
                            redirected to PayPal to complete your purchase
                            securely.
                          </p>
                        </div>
                      </div>
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

export default Signup;
