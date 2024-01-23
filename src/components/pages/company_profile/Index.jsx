import React, { useEffect, useState } from "react";
import Header from "../../shared/Header";
import Footer from "../../shared/Footer";
import { Link } from "react-router-dom";
import {
    fetchSignup,
    createAccount
  } from "../../../states/actions/fetchSignup";
  import { useSelector, useDispatch } from "react-redux";
  import useDocumentTitle from "../../../hooks/useDocumentTitle";
  import LoadingScreen from "../../common/LoadingScreen";
  import FormProcessingSpinner from "../../common/FormProcessingSpinner";
  import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
const CompanyProfile = () => {
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
  return (
    <>
       {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <ToastContainer />
          <Header site_settings={site_settings} />
          <main index>
            <section  className="candidate_pofile">
                <div  className="contain">
                    <div  className="profile_flex">
                        <div  className="img_ico">
                            <img src="images/3-1.png" alt="" />
                        </div>
                        <div  className="cntnt">
                            <div  className="name">Hero Solutions</div>
                            <ul  className="">
                                <li><i  className="fi fi-rr-marker"></i> <span>200 via de lago, suite b Altamonte springs , fl 32701</span></li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
            </section>
            <section  className="job_detail_sec">
                <div  className="contain">
                    <div  className="cntnt company-profile-blk">
                        <div  className="ckEditor">
                            <h4>Biography</h4>
                            <p>Hi, I am Danica Lewis, a professional Ui/Ux and Graphic designer with 4+ years of experience. I can design website ui, app ui, dashboard ui, thank you card, logo, flyer, brochure, banner, etc. If you need any help just give me a knock. Looking forward to working with you!</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis illum fuga eveniet. Deleniti asperiores, commodi quae ipsum quas est itaque, ipsa, dolore beatae voluptates nemo blanditiis iste eius officia minus. Id nisi, consequuntur sunt impedit quidem, vitae mollitia!</p>
                            <h4>Work Process</h4>
                            <p>Mauris nec erat ut libero vulputate pulvinar. Aliquam ante erat, blandit at pretium et, accumsan ac est. Integer vehicula rhoncus molestie. Morbi ornare ipsum sed sem condimentum, et pulvinar tortor luctus. Suspendisse condimentum lorem ut elementum aliquam. Mauris nec erat ut libero vulputate pulvinar.</p>
                        </div>
                        <br />
                        <div  className="videoBlk abt_video">
                            <video poster="https://vshoney.herosolutions.com.pk/vshoney/uploads/images/thumb_0a113ef6b61820daa5611c870ed8d5ee_1665665719_1142.png">
                                <source src="images/intro.mp4" type="video/mp4" />
                            </video>
                            <div  className="videoBtn fa-play"></div>
                        </div>
                        <br />
                        <div  className="ckEditor">
                            <h4>Experience</h4>
                            <p>Hi, I am Danica Lewis, a professional Ui/Ux and Graphic designer with 4+ years of experience. I can design website ui, app ui, dashboard ui, thank you card, logo, flyer, brochure, banner, etc. If you need any help just give me a knock. Looking forward to working with you!</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis illum fuga eveniet. Deleniti asperiores, commodi quae ipsum quas est itaque, ipsa, dolore beatae voluptates nemo blanditiis iste eius officia minus. Id nisi, consequuntur sunt impedit quidem, vitae mollitia!</p>
                            <h4>Work Process</h4>
                            <p>Mauris nec erat ut libero vulputate pulvinar. Aliquam ante erat, blandit at pretium et, accumsan ac est. Integer vehicula rhoncus molestie. Morbi ornare ipsum sed sem condimentum, et pulvinar tortor luctus. Suspendisse condimentum lorem ut elementum aliquam. Mauris nec erat ut libero vulputate pulvinar.</p>
                        </div>
                        <div  className="bTn">
                            <Link to="/contact"  className="webBtn">Contact Us</Link>
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

export default CompanyProfile;
