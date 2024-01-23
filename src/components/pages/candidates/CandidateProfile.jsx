import React, { useEffect } from "react";
import Header from "../../shared/Header";
import Footer from "../../shared/Footer";

import { fetchCandidates } from "../../../states/actions/fetchCandidates";
import { useSelector, useDispatch } from "react-redux";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import LoadingScreen from "../../common/LoadingScreen";

import Text from "../../common/Text";
import { getBackgroundImageUrlThumb } from "../../../helpers/helpers";
import ImageControl from "../../common/ImageControl";
import { Link } from "react-router-dom";

const CandidateProfile = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fetchCandidates.content);
  const isLoading = useSelector((state) => state.fetchCandidates.isLoading);
  const { content, site_settings, sec3s } = data;

  useEffect(() => {
    dispatch(fetchCandidates());
  }, []);

  useDocumentTitle(data.page_title);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Header site_settings={site_settings} />
          <main index="">
          <section  className="candidate_pofile">
                <div  className="contain">
                    <div  className="profile_flex">
                        <div  className="img_ico">
                          <img src="images/img-candidate.png" alt="" />
                        </div>
                        <div className="cntnt">
                            <div className="name">Danica Lewis</div>
                            <ul>
                                <li><i className="fi fi-rr-marker"></i> <span>New York, NY</span></li>
                                <li><i className="fi fi-rr-briefcase"></i> <span>Ui/UX design</span></li>
                                <li><i className="fi fi-rr-clock-seven"></i> <span>$45 / hour</span></li>
                            </ul>
                            <div className="skils">
                                <span>App</span><span>Design</span><span>Digital</span><span>PSD</span>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
            <section  className="job_detail_sec">
                <div  className="contain">
                    <div  className="cntnt">
                    <div className="job_detail_grid_pg">
                        <ul>
                            <li>
                                <h4><i className="fi fi-rr-briefcase"></i><span>Experience</span></h4>
                                <p>4 years</p>
                            </li>
                            
                            <li>
                                <h4><i className="fi fi-rr-graduation-cap"></i><span>Education</span></h4>
                                <p>Behance Accounting</p>
                            </li>
                            
                            <li>
                                <h4><i className="fi fi-rr-time-fast"></i><span>Availablity</span></h4>
                                <p>260 Hrs</p>
                            </li>
                            <li>
                                <div className="bTn">
                                    <a href="?" className="webBtn">Download CV</a>
                                </div>
                            </li>
                            <li>
                                <div className="bTn">
                                    <a href="?" className="webBtn blankBtn">Contact Me</a>
                                </div>
                            </li>
                            
                        </ul>
                        <br/>
                        <div className="ckEditor">
                            <h4>Biography</h4>
                            <p>Hi, I am Danica Lewis, a professional Ui/Ux and Graphic designer with 4+ years of experience. I can design website ui, app ui, dashboard ui, thank you card, logo, flyer, brochure, banner, etc. If you need any help just give me a knock. Looking forward to working with you!</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis illum fuga eveniet. Deleniti asperiores, commodi quae ipsum quas est itaque, ipsa, dolore beatae voluptates nemo blanditiis iste eius officia minus. Id nisi, consequuntur sunt impedit quidem, vitae mollitia!</p>
                            <h4>Work Process</h4>
                            <p>Mauris nec erat ut libero vulputate pulvinar. Aliquam ante erat, blandit at pretium et, accumsan ac est. Integer vehicula rhoncus molestie. Morbi ornare ipsum sed sem condimentum, et pulvinar tortor luctus. Suspendisse condimentum lorem ut elementum aliquam. Mauris nec erat ut libero vulputate pulvinar.</p>
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

export default CandidateProfile;
