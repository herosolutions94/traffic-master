import React from "react";
import Text from "../common/Text";
import { Link } from "react-router-dom";
import { saveEmailForNewsletter } from "../../states/actions/newsLetter";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import FormProcessingSpinner from "../common/FormProcessingSpinner";

const Footer = ({ site_settings }) => {
  const { header_footer } = site_settings;
  const dispatch = useDispatch();
  const { isFormProcessing } = useSelector(state => state.newsLetter);

  const handleLanguageChange = (e) => {
    localStorage.setItem("site_lang", e.target.value);
    window.location.reload();
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(saveEmailForNewsletter(data));
  };

  return (
    <>
      <ToastContainer />
      <section className="popup pricing_popup" data-popup="filter">
        <div className="tableDv">
          <div className="tableCell">
            <div className="_inner">
              <div className="crosBtn" />
              <form action>
                <div className="inner">
                  <h4>job type</h4>
                  <div className="type_list">
                    <div className="lblBtn">
                      <div className="switchBtn">
                        <input type="checkbox" name id="part-time" />
                      </div>
                      <label htmlFor="part-time">Part Time</label>
                    </div>
                    <div className="lblBtn">
                      <div className="switchBtn">
                        <input
                          type="checkbox"
                          name
                          id="full-time"
                          defaultChecked
                        />
                      </div>
                      <label htmlFor="full-time">Full Time</label>
                    </div>
                    <div className="lblBtn">
                      <div className="switchBtn">
                        <input type="checkbox" name id="internship" />
                      </div>
                      <label htmlFor="internship">Internship</label>
                    </div>
                    <div className="lblBtn">
                      <div className="switchBtn">
                        <input type="checkbox" name id="temporary" />
                      </div>
                      <label htmlFor="temporary">Temporary</label>
                    </div>
                  </div>
                  <hr />
                  <h4>Experience Level</h4>
                  <div className="type_list">
                    <div className="lblBtn">
                      <input type="checkbox" name id="all" />
                      <label htmlFor="all">All</label>
                    </div>
                    <div className="lblBtn">
                      <input type="checkbox" name id="_internship" />
                      <label htmlFor="_internship">Internship</label>
                    </div>
                    <div className="lblBtn">
                      <input type="checkbox" name id="entry-level" />
                      <label htmlFor="entry-level">Entry level</label>
                    </div>
                    <div className="lblBtn">
                      <input type="checkbox" name id="associate" />
                      <label htmlFor="associate">Associate</label>
                    </div>
                    <div className="lblBtn">
                      <input type="checkbox" name id="Mid-Senior" />
                      <label htmlFor="Mid-Senior">Mid-Senior level4</label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="popup pricing_popup" data-popup="pricing_support">
        <div className="tableDv">
          <div className="tableCell">
            <div className="_inner">
              <div className="crosBtn" />
              <h3>FLEX PACKAGES</h3>
              <p>Fill up to hundreds of positions per year!</p>
              <form action>
                <div className="row formRow">
                  <div className="col-md-6">
                    <h6>Company</h6>
                    <input type="text" className="txtBox" name />
                  </div>
                  <div className="col-md-6">
                    <h6>Full Name</h6>
                    <input type="text" className="txtBox" name />
                  </div>
                  <div className="col-md-6">
                    <h6>Email</h6>
                    <input type="text" className="txtBox" name />
                  </div>
                  <div className="col-md-6">
                    <h6>Phone</h6>
                    <input type="text" className="txtBox" name />
                  </div>
                  <div className="col-md-12">
                    <h6>What are your estimated monthly or yearly needs?</h6>
                    <textarea name id className="txtBox" defaultValue={""} />
                  </div>
                  <div className="col-md-12">
                    <div className="text-center">
                      <button className="webBtn">Send Request</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="contain">
          <div className="flexRow flex">
            <div className="col">
              <h5>
                <Text string={header_footer.seaction_1_heading} />
              </h5>
              <ul className="lst">
                <li>
                  <Link to="/">{header_footer.section_1_link_1}</Link>
                </li>
                <li>
                  <Link to="/about-us">{header_footer.section_1_link_2}</Link>
                </li>
                <li>
                  <Link to="/how-it-works">
                    {header_footer.section_1_link_3}
                  </Link>
                </li>
                <li>
                  <Link to="/pricing">{header_footer.section_1_link_4}</Link>
                </li>
                <li>
                  <Link to="/blogs">{header_footer.section_1_link_5}</Link>
                </li>
                <li>
                  <Link to="/training-programs">
                    {header_footer.section_1_link_6}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col">
              <h5>
                <Text string={header_footer.seaction_2_heading} />
              </h5>
              <ul className="lst">
                <li>
                  <Link to="/faqs">{header_footer.section_2_link_1}</Link>
                </li>
                <li>
                  <Link to="/contact-us">{header_footer.section_2_link_2}</Link>
                </li>
                <li>
                  <Link to="/terms-and-conditions">
                    {header_footer.section_2_link_3}
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy">
                    {header_footer.section_2_link_4}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col">
              <h5>
                <Text string={header_footer.seaction_3_heading} />
              </h5>
              <ul className="lst">
                <li>
                  <a href={`tel:${site_settings.site_phone}`}>
                    {header_footer.section_3_link_1}: {site_settings.site_phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site_settings.site_email}`}>
                    {header_footer.section_3_link_2}: {site_settings.site_email}
                  </a>
                </li>
                <li>
                  {header_footer.section_3_link_3} :{" "}
                  {site_settings.site_address}
                </li>
              </ul>
            </div>
            <div className="col">
              <h5>
                <Text string={header_footer.seaction_4_heading} />
              </h5>

              <select
                className="txtBox languageSwitch"
                onChange={(e) => handleLanguageChange(e)}
                value={localStorage.getItem("site_lang")}
              >
                <option value="french">French</option>
                <option value="eng">English</option>
              </select>

              <form
                method="post"
                autoComplete="off"
                className
                onSubmit={handleSubmit(onSubmit)}
              >
                <label htmlFor="email">
                  <Text string={header_footer.section_4_link_1} />
                </label>
                <div className="txtGrp relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="txtBox"
                    placeholder={header_footer.section_4_link_2}
                    {...register("email", {
                      required: 'Email is required',
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    })}
                  />
                  <button type="submit">
                    {/* <div className="text-dark"><FormProcessingSpinner /></div> */}
                    {isFormProcessing ? <div className="text-dark"><FormProcessingSpinner /></div> : <i className="fi-arrow-right fi-2x" />}
                  </button>
                </div>
                {errors.email && (
                  <span className="validation-error">
                    {errors.email.message}
                  </span>
                )}
              </form>
              <h5>
                <Text string={header_footer.section_4_link_3} />
              </h5>
              <ul className="social flex">
                <li>
                  <a
                    href={site_settings.site_instagram}
                    target="_blank"
                    style={{ display: "block" }}
                  >
                    <img src="images/social-instagram.svg" alt="" />
                  </a>
                </li>
                <li>
                  <a
                    href={site_settings.site_facebook}
                    target="_blank"
                    style={{ display: "block" }}
                  >
                    <img src="images/social-facebook.svg" alt="" />
                  </a>
                </li>
                <li>
                  <a
                    href={site_settings.site_youtube}
                    target="_blank"
                    style={{ display: "block" }}
                  >
                    <img src="images/social-youtube.svg" alt="" />
                  </a>
                </li>
                {/* <li>
                  <a
                    href={site_settings.site_twitter}
                    target="_blank"
                    style={{ display: "block" }}
                  >
                    <img src="images/social-twitter.svg" alt="" />
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
        <div className="copyright relative">
          <div className="contain">
            <div className="inner">
              <p>
                <Text string={header_footer.copyright_text} />
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
