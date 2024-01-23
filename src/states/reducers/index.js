import { combineReducers } from "redux";
import fetchSiteSettings from "./fetchSiteSettings";
import fetchHome from "./fetchHome";
import fetchAboutUs from "./fetchAboutUs";
import fetchTerms from "./fetchTerms";
import fetchPrivacy from "./fetchPrivacy";
import fetchFaq from "./fetchFaq";
import fetchJobs from "./fetchJobs";
import fetchSignup from "./fetchSignup";
import fetchSignin from "./fetchSignin";
import fetchSignupCandidate from "./fetchSignupCandidate";
import fetchSignupEmployer from "./fetchSignupEmployer";
import fetchBlogs from "./fetchBlogs";
import fetchBlogDetail from "./fetchBlogDetail";
import fetchContactUs from "./fetchContactUs";
import fetchHowItWorks from "./fetchHowItWorks";
import fetchTraining from "./fetchTraining";
import fetchPricing from "./fetchPricing";
import fetchCandidates from "./fetchCandidates";
import fetchEmployerHome from "./fetchEmployerHome";
import fetchForgotPassword from "./fetchForgotPassword";
import fetchResetPassword from "./fetchResetPassword";
import fetchJobCategories from "./fetchJobCategories";
import fetchJobTypes from "./fetchJobTypes";
import fetchJobSubCategories from "./fetchJobSubCategories";
import fetchJobExperienceLevels from "./fetchJobExperienceLevels";
import fetchJobLocations from "./fetchJobLocations";
import fetchJobDetails from "./fetchJobDetails";
import employerJobs from "./employerJobs";
import candidateApplications from "./candidateApplications";
import jobApplicants from "./jobApplicants";
import employerData from "./employerData";
import newsLetter from "./newsLetter";
import jobPush from "./jobPush";
import fetchCvBuilder from "./fetchCvBuilder";
import fetchCvDetails from "./fetchCvDetails";
import paymentMethod from "./paymentMethod";
import fetchCandidateDetail from "./fetchCandidateDetail";
import likeJobs from "./likeJobs";
import fetchSavedJobs from "./fetchSavedJobs";
import members from "./members";

export default combineReducers({
  fetchSiteSettings,
  fetchHome,
  fetchAboutUs,
  fetchTerms,
  fetchPrivacy,
  fetchFaq,
  fetchJobs,
  fetchSignin,
  fetchSignup,
  fetchSignupCandidate,
  fetchSignupEmployer,
  fetchBlogs,
  fetchBlogDetail,
  fetchEmployerHome,
  fetchForgotPassword,
  fetchResetPassword,
  fetchContactUs,
  fetchHowItWorks,
  fetchTraining,
  fetchPricing,
  fetchCandidates,
  fetchJobCategories,
  fetchJobTypes,
  fetchJobSubCategories,
  fetchJobExperienceLevels,
  fetchJobLocations,
  fetchJobDetails,
  employerJobs,
  candidateApplications,
  jobApplicants,
  employerData,
  newsLetter,
  jobPush,
  fetchCvBuilder,
  fetchCvDetails,
  paymentMethod,
  fetchCandidateDetail,
  likeJobs,
  fetchSavedJobs,
  members,
});
