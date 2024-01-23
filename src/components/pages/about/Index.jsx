import React, { useEffect } from "react";
import Header from "../../shared/Header";
import Footer from "../../shared/Footer";

import { fetchAboutUs } from "../../../states/actions/fetchAboutUs";
import { useSelector, useDispatch } from "react-redux";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import LoadingScreen from "../../common/LoadingScreen";

import Text from "../../common/Text";
import { getBackgroundImageUrlThumb } from "../../../helpers/helpers";
import ImageControl from "../../common/ImageControl";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fetchAboutUs.content);
  const isLoading = useSelector((state) => state.fetchAboutUs.isLoading);
  const { content, site_settings, partners } = data;

  useEffect(() => {
    dispatch(fetchAboutUs());
  }, []);

  useDocumentTitle(data.page_title);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Header site_settings={site_settings} />
          <main index>
            <section
              className="outer_banner"
              style={{
                backgroundImage: `url(${getBackgroundImageUrlThumb(
                  content.image1
                )})`
              }}
            >
              <div className="contain">
                <div className="cntnt">
                  <h1>
                    <Text string={content.banner_heading} />
                  </h1>
                  <Text string={content.banner_detail} />
                </div>
              </div>
            </section>
            <section className="welcom abt_page">
              <div className="contain">
                <div className="flex">
                  <div className="colL">
                    <div className="flex">
                      <div className="col">
                        <div className="inner">
                          <div className="img-ico">
                            <ImageControl
                              folder="images"
                              isThumb={true}
                              src={content.image2}
                            />
                          </div>
                          <div className="inner_cntnt">
                            <h3>
                              <Text string={content.au_card_heading1} />
                            </h3>
                            <p>
                              <Text string={content.au_card_detail1} />
                            </p>
                          </div>
                        </div>
                        <div className="inner">
                          <div className="img-ico">
                            <ImageControl
                              folder="images"
                              isThumb={true}
                              src={content.image3}
                            />
                          </div>
                          <div className="inner_cntnt">
                            <h3>
                              <Text string={content.au_card_heading2} />
                            </h3>
                            <p>
                              <Text string={content.au_card_detail2} />
                            </p>
                          </div>
                        </div>
                        <div className="inner">
                          <div className="img-ico">
                            <ImageControl
                              folder="images"
                              isThumb={true}
                              src={content.image4}
                            />
                          </div>
                          <div className="inner_cntnt">
                            <h3>
                              <Text string={content.au_card_heading3} />
                            </h3>
                            <p>
                              <Text string={content.au_card_detail3} />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="colR">
                    <div className="sec_heading">
                      <h3>
                        <Text string={content.ov_heading_tag} />
                      </h3>
                      <h2>
                        <Text string={content.ov_heading} />
                      </h2>
                    </div>
                    <Text string={content.au_detail} />
                  </div>
                </div>
              </div>
            </section>
            <section className="why-we">
              <div className="contain">
                <div className="flex">
                  <div className="cntnt">
                    <div className="sec_heading">
                      <h3>
                        <Text string={content.wwa_heading_tag} />
                      </h3>
                      <h2>
                        <Text string={content.wwa_heading} />
                      </h2>
                    </div>
                    <Text string={content.wwa_detail} />
                  </div>
                  <div className="outer-image new_abt_mini_img">
                    <div className="abt-image">
                      <ImageControl
                        folder="images"
                        isThumb={true}
                        src={content.image5}
                      />
                    </div>
                    <div className="mini_img1">
                      <ImageControl
                        folder="images"
                        // isThumb={true}
                        src={content.image6}
                      />
                    </div>
                    <div className="mini_img2">
                      <ImageControl
                        folder="images"
                        // isThumb={true}
                        src={content.image7}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="post_job_sec abt_job_sec">
              <div className="contain">
                <div className="flex">
                  <div className="colL">
                    <div className="image">
                      <ImageControl
                        folder="images"
                        isThumb={true}
                        src={content.image11}
                      />
                    </div>
                    <div className="applicant_list">
                      <div className="head_listing">
                        <Text string={content.enl_mid_heading} />
                      </div>
                      <ul>
                        <li>
                          <div className="small_icon">
                            <ImageControl
                              folder="images"
                              src={content.image13}
                            />
                          </div>
                          <div className="cntnt">
                            <h4>
                              <Text string={content.enl_card_heading1} />
                            </h4>
                            <p>
                              <Text string={content.enl_card_detail1} />
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="small_icon">
                            <ImageControl
                              folder="images"
                              src={content.image14}
                            />
                          </div>
                          <div className="cntnt">
                            <h4>
                              <Text string={content.enl_card_heading2} />
                            </h4>
                            <p>
                              <Text string={content.enl_card_detail2} />
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="small_icon">
                            <ImageControl
                              folder="images"
                              src={content.image15}
                            />
                          </div>
                          <div className="cntnt">
                            <h4>
                              <Text string={content.enl_card_heading3} />
                            </h4>
                            <p>
                              <Text string={content.enl_card_detail3} />
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="search_job_abt_mini">
                      <ImageControl folder="images" src={content.image12} />
                    </div>
                  </div>
                  <div className="colR">
                    <div className="sec_heading">
                      <h3>
                        <Text string={content.enl_heading_tag} />
                      </h3>
                      <h2>
                        <Text string={content.enl_heading} />
                      </h2>
                    </div>
                    <p>
                      <Text string={content.enl_detail} />
                    </p>
                    <div className="bTn">
                      <Link
                        to={content.enl_button_link_right}
                        className="webBtn"
                      >
                        <Text string={content.enl_button_title_right} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="option_grid">
              <div className="contain">
                <div className="flex">
                  <div className="col">
                    <div className="inner">
                      <div className="cntnt">
                        <div className="sec_heading">
                          <h2>
                            <Text string={content.sec5_heading1} />
                          </h2>
                        </div>
                        <p>
                          <Text string={content.sec5_detail1} />
                        </p>
                        <Link className="webBtn" to="/signup-candidate">
                          <Text string={content.sec5_button_title1} />
                        </Link>
                      </div>
                      <div className="right_img">
                        <ImageControl
                          folder="images"
                          isThumb={true}
                          src={content.image8}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="inner">
                      <div className="cntnt">
                        <div className="sec_heading">
                          <h2>
                            <Text string={content.sec5_heading2} />
                          </h2>
                        </div>
                        <p>
                          <Text string={content.sec5_detail2} />
                        </p>
                        <Link className="webBtn" to="/pricing">
                          <Text string={content.sec5_button_title2} />
                        </Link>
                      </div>
                      <div className="right_img">
                        <ImageControl
                          folder="images"
                          isThumb={true}
                          src={content.image9}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="_cta_sec cta_bottom_mrgn">
              <div className="contain">
                <div
                  className="cntnt"
                  style={{
                    backgroundImage: `url(${getBackgroundImageUrlThumb(
                      content.image10
                    )})`
                  }}
                >
                  <div className="sec_heading">
                    <h2>
                      {" "}
                      <Text string={content.bchb_heading} />
                    </h2>
                    <p>
                      <Text string={content.bchb_detail} />
                    </p>
                  </div>
                  <div className="bTn">
                    <Link className="webBtn" to={content.bchb_button_link_left}>
                      <Text string={content.bchb_button_title_left} />
                    </Link>
                    <Link
                      className="webBtn blankBtn"
                      to={content.bchb_button_link_right}
                    >
                      <Text string={content.bchb_button_title_right} />
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

export default AboutUs;
