import "./App.css";
import "./Responsive.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import AuthenticatedRoutes from "./AuthenticatedRoutes";
import PaidAccountRoutes from "./PaidAccountRoutes";
import EmployerRoutes from "./EmployerRoutes";
import CandidateRoutes from "./CandidateRoutes";
import Home from "./components/pages/home/Index";
import AboutUs from "./components/pages/about/Index";
import Faq from "./components/pages/faq/Index";
import TermsAndConditions from "./components/pages/terms/Index";
import PrivacyPolicy from "./components/pages/privacy/Index";
import ContactUs from "./components/pages/contact/Index";
import HowItWorks from "./components/pages/how/Index";
import TrainingPrograms from "./components/pages/training/Index";
import Pricing from "./components/pages/pricing/Index";
import Jobs from "./components/pages/jobs/Index";
import Blogs from "./components/pages/blogs/Index";
import BlogDetail from "./components/pages/blogs/Detail";
import Subscribe from "./components/pages/subscribe/Index";
import PostJob from "./components/pages/job_post/Index";
import Candidates from "./components/pages/candidates/Index";
import CandidateProfile from "./components/pages/candidates/CandidateProfile";
import EmployerHome from "./components/pages/employer_home/Index";
import CompanyProfile from "./components/pages/company_profile/Index";
import Signin from "./components/pages/signin/Index";
import Signup from "./components/pages/signup/Index";
import SignupCandidate from "./components/pages/signup_candidate/Index";
import ForgotPassword from "./components/pages/forgot/Index";
import ResetPassword from "./components/pages/reset/Index";
// import Dashboard from "./components/pages/dashboard/Index";
import CandidateDashboard from "./components/pages/candidate_dashboard/dashboard/Index";
import EmployerDashboard from "./components/pages/employer_dashboard/dashboard/Index";
import MyJobs from "./components/pages/employer_dashboard/my_jobs/Index";
import Applicants from "./components/pages/employer_dashboard/my_jobs/Applicants";
import PaymentMethod from "./components/pages/employer_dashboard/payment_method/Index";
import AddPaymentMethod from "./components/pages/employer_dashboard/payment_method/Add-payment";
import EditPaymentMethod from "./components/pages/employer_dashboard/payment_method/Edit-payment";
import PricingPlans from "./components/pages/employer_dashboard/pricing_plans/Index";
import JobDetails from "./components/pages/jobs/Job-details";
import PostNewJob from "./components/pages/employer_dashboard/my_jobs/Post-job";
import EditJob from "./components/pages/employer_dashboard/my_jobs/Edit-job";
import CV from "./components/pages/candidate_dashboard/cv";
import AppliedJobs from "./components/pages/candidate_dashboard/dashboard/Applied-job";
import PaymentMethodCandidate from "./components/pages/candidate_dashboard/payment_method/Index";
import AddPaymentMethodCandidate from "./components/pages/candidate_dashboard/payment_method/Add-payment";
import PricingPlansCandidate from "./components/pages/candidate_dashboard/pricing_plans/Index";
import { setDefaultLanguage } from "./helpers/helpers";
import ProfileSetting from "./components/pages/employer_dashboard/settings/Index";
import CompanyProfileSetting from "./components/pages/employer_dashboard/settings/Company-profile";
import CandidateProfileSetting from "./components/pages/candidate_dashboard/settings/Index";
import CandidateChat from "./components/pages/candidate_dashboard/chat";
import EmployerChat from "./components/pages/employer_dashboard/chat";
import CandidateNotification from "./components/pages/candidate_dashboard/notification";
import EmployerNotification from "./components/pages/employer_dashboard/notification";
// import http from "./helpers/http";
import Error from "./components/pages/error/Index";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Candidatedetail from "./components/pages/candidates/Candidatedetail";
import SavedJobs from "./components/pages/candidate_dashboard/dashboard/Saved-job";
import EmployerSavedJobs from "./components/pages/employer_dashboard/dashboard/Employer-saved-jobs";
import ScrollToTop from './components/common/ScrollToTop';

const stripe = loadStripe(
  "pk_test_51MdVE1EAyLSzWUvFRn0TqeKIvXdG9wJO13NKkdd2RZhuMZshbwp8SyWsWusIMXnpbOnG5OEahNJileYxeyD0L5HW00AmFXA1AK"
);

function App() {
  setDefaultLanguage();
  return (
    <Elements stripe={stripe}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          #Public Routes
          <Route path="/" element={<Home />} />
          <Route exact path="/about-us" element={<AboutUs />} />
          <Route exact path="/faqs" element={<Faq />} />
          <Route
            exact
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route exact path="/contact-us" element={<ContactUs />} />
          <Route exact path="/how-it-works" element={<HowItWorks />} />
          <Route
            exact
            path="/training-programs"
            element={<TrainingPrograms />}
          />
          <Route exact path="/pricing" element={<Pricing />} />
          #Paid Account Routes
          <Route element={<PaidAccountRoutes />}>
            <Route exact path="/candidates/:page" element={<Candidates />} />
            <Route
              exact
              path="/candidate/candidate-detail/:id"
              element={<Candidatedetail />}
            />
            <Route
              exact
              path="/candidate-profile/:id/:candidate_name"
              element={<CandidateProfile />}
            />
          </Route>
          <Route exact path="/jobs/:page" element={<Jobs />} />
          <Route exact path="/employer-home" element={<EmployerHome />} />
          <Route exact path="/blogs" element={<Blogs />} />
          <Route exact path="/blog-detail/:id" element={<BlogDetail />} />
          <Route exact path="/post-job" element={<PostJob />} />
          <Route exact path="/company-profile" element={<CompanyProfile />} />
          <Route exact path="/job-details/:id" element={<JobDetails />} />
          #AUTHENTICATED ROUTES
          <Route element={<AuthenticatedRoutes />}>
            {/* <Route> */}
            <Route exact path="/signup" element={<Signup />} />
            <Route
              exact
              path="/signup-candidate"
              element={<SignupCandidate />}
            />
            <Route exact path="/signin" element={<Signin />} />
            <Route exact path="/forgot-password" element={<ForgotPassword />} />
            <Route
              exact
              path="/reset-password/:token"
              element={<ResetPassword />}
            />
          </Route>
          <Route
            exact
            path="/employer-signup/:planId"
            element={<Subscribe />}
          />
          #PRIVATE ROUTE
          <Route element={<PrivateRoute />}>

            <Route element={<CandidateRoutes />}>
              <Route
                exact
                path="/candidate/notification"
                element={<CandidateNotification />}
              />
              <Route
                exact
                path="/candidate/dashboard"
                element={<CandidateDashboard />}
              />
              <Route
                exact
                path="/candidate/saved-jobs"
                element={<SavedJobs />}
              />
              <Route exact path="/candidate/cv" element={<CV />} />
              <Route
                exact
                path="/candidate/applied-jobs"
                element={<AppliedJobs />}
              />
              <Route
                exact
                path="/candidate/payment-method"
                element={<PaymentMethodCandidate />}
              />
              <Route
                exact
                path="/candidate/add-payment-method"
                element={<AddPaymentMethodCandidate />}
              />
              <Route exact path="/candidate/chat" element={<CandidateChat />} />
              <Route
                exact
                path="/candidate/notfication"
                element={<CandidateNotification />}
              />
              <Route
                exact
                path="/candidate/pricing-plans"
                element={<PricingPlansCandidate />}
              />
              <Route
                exact
                path="/candidate/profile-setting"
                element={<CandidateProfileSetting />}
              />
            </Route>
            <Route element={<EmployerRoutes />}>
              <Route
                exact
                path="/employer/dashboard"
                element={<EmployerDashboard />}
              />
              <Route exact path="/employer/my-jobs" element={<MyJobs />} />
              <Route exact path="/employer/chat" element={<EmployerChat />} />
              <Route
                exact
                path="/employer/notification"
                element={<EmployerNotification />}
              />
              <Route
                exact
                path="/employer/profile-setting"
                element={<ProfileSetting />}
              />
              <Route
                exact
                path="/employer/company-profile-setting"
                element={<CompanyProfileSetting />}
              />
              <Route exact path="/employer/post-job" element={<PostNewJob />} />
              <Route exact path="/employer/edit-job/:id" element={<EditJob />} />
              <Route
                exact
                path="/employer/applicants/:id"
                element={<Applicants />}
              />
              <Route
                exact
                path="/employer/payment-method"
                element={<PaymentMethod />}
              />
              <Route
                exact
                path="/employer/add-payment-method"
                element={<AddPaymentMethod />}
              />
              <Route
                exact
                path="/employer/edit-payment-method/:id"
                element={<EditPaymentMethod />}
              />
              <Route
                exact
                path="/employer/pricing-plans"
                element={<PricingPlans />}
              />
              <Route
                exact
                path="/employer/saved-jobs"
                element={<EmployerSavedJobs />}
              />
            </Route>
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </Elements>
  );
}

export default App;
