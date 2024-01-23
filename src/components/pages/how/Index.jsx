import React, { useEffect, useState } from "react";
import Header from "../../shared/Header";
import Footer from "../../shared/Footer";

import { fetchHowItWorks } from "../../../states/actions/fetchHowItWorks";
import { useSelector, useDispatch } from "react-redux";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import LoadingScreen from "../../common/LoadingScreen";

import Text from "../../common/Text";
import { getBackgroundImageUrlThumb } from "../../../helpers/helpers";
import ImageControl from "../../common/ImageControl";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const [vidPopup, setVidPopup] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fetchHowItWorks.content);
  const isLoading = useSelector((state) => state.fetchHowItWorks.isLoading);
  const { content, site_settings, partners } = data;

  useEffect(() => {
    dispatch(fetchHowItWorks());
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
            <section className="why_choose_us">
              <div className="contain">
                <div className="sec_heading text-center">
                  <h3>
                    <Text string={content.wcu_heading_tag} />
                  </h3>
                  <h2>
                    <Text string={content.wcu_heading} />
                  </h2>
                </div>
                <div className="flex choose_flex">
                  <div className="col">
                    <div className="inner flex">
                      <div className="side_icon">
                        <ImageControl
                          folder="images"
                          isThumb={true}
                          src={content.image2}
                        />
                      </div>
                      <div className="cntnt">
                        <h4>
                          <Text string={content.wcu_card_heading1} />
                        </h4>
                        <p>
                          <Text string={content.wcu_card_detail1} />
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="inner flex">
                      <div className="side_icon">
                        <ImageControl
                          folder="images"
                          isThumb={true}
                          src={content.image3}
                        />
                      </div>
                      <div className="cntnt">
                        <h4>
                          <Text string={content.wcu_card_heading2} />
                        </h4>
                        <p>
                          <Text string={content.wcu_card_detail2} />
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="inner flex">
                      <div className="side_icon">
                        <ImageControl
                          folder="images"
                          isThumb={true}
                          src={content.image4}
                        />
                      </div>
                      <div className="cntnt">
                        <h4>
                          <Text string={content.wcu_card_heading3} />
                        </h4>
                        <p>
                          <Text string={content.wcu_card_detail3} />
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="inner flex">
                      <div className="side_icon">
                        <ImageControl
                          folder="images"
                          isThumb={true}
                          src={content.image5}
                        />
                      </div>
                      <div className="cntnt">
                        <h4>
                          <Text string={content.wcu_card_heading4} />
                        </h4>
                        <p>
                          <Text string={content.wcu_card_detail4} />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {
              vidPopup === true ?
                <section className="popup pricing_popup" data-popup="filter" style={{ display: "block" }}>
                  <div className="tableDv">
                    <div className="tableCell">
                      <div className="_inner">
                        <div className="crosBtn" onClick={() => setVidPopup(false)} />
                        <div className="vidBlk">
                          <video
                            poster={getBackgroundImageUrlThumb(content.image6)} controls
                          >
                            <source src="/images/intro.mp4" type="video/mp4" />
                          </video>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                :
                ""
            }

            <section className="video_sec">
              <div className="contain">
                <div className="flex">
                  <div className="colL">
                    <div className="videoBlk abt_video">
                      <video
                        poster={getBackgroundImageUrlThumb(content.image6)}
                      >
                        <source src="/images/intro.mp4" type="video/mp4" />
                      </video>
                      <div className="videoBtn fa-play" onClick={() => setVidPopup(true)} />
                      {/* <div className="videoBtn fa-play" /> */}
                    </div>
                  </div>
                  <div className="colR">
                    <div className="sec_heading">
                      <h3>
                        <Text string={content.hiw_heading_tag} />
                      </h3>
                      <h2>
                        <Text string={content.hiw_heading} />
                      </h2>
                    </div>
                    <Text string={content.hiw_detail} />
                  </div>
                </div>
              </div>
            </section>
            <section className="why_choose_us">
              <div className="contain">
                <div className="sec_heading text-center">
                  <h3>
                    <Text string={content.cand_heading_tag} />
                  </h3>
                  <h2>
                    <Text string={content.cand_heading} />
                  </h2>
                </div>
                <div className="flex choose_flex choose_flex_small">
                  <div className="col">
                    <div className="inner flex">
                      <div className="side_icon">
                        <ImageControl
                          folder="images"
                          isThumb={true}
                          src={content.image7}
                        />
                      </div>
                      <div className="cntnt">
                        <h4>
                          <Text string={content.cand_card_heading1} />
                        </h4>
                        <p>
                          <Text string={content.cand_card_detail1} />
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="inner flex">
                      <div className="side_icon">
                        <ImageControl
                          folder="images"
                          isThumb={true}
                          src={content.image8}
                        />
                      </div>
                      <div className="cntnt">
                        <h4>
                          <Text string={content.cand_card_heading2} />
                        </h4>
                        <p>
                          <Text string={content.cand_card_detail2} />
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="inner flex">
                      <div className="side_icon">
                        <ImageControl
                          folder="images"
                          isThumb={true}
                          src={content.image9}
                        />
                      </div>
                      <div className="cntnt">
                        <h4>
                          <Text string={content.cand_card_heading3} />
                        </h4>
                        <p>
                          <Text string={content.cand_card_detail3} />
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="inner flex">
                      <div className="side_icon">
                        <ImageControl
                          folder="images"
                          isThumb={true}
                          src={content.image10}
                        />
                      </div>
                      <div className="cntnt">
                        <h4>
                          <Text string={content.cand_card_heading4} />
                        </h4>
                        <p>
                          <Text string={content.cand_card_detail4} />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="how_it_works">
              <div className="contain">
                <div className="sec_heading text-center">
                  <h3>
                    <Text string={content.emp_heading_tag} />
                  </h3>
                  <h2>
                    <Text string={content.emp_heading} />
                  </h2>
                </div>
                <div className="flex">
                  <div className="col">
                    <div className="inner">
                      <div className="image">

                        <Link to="/pricing" >
                          <ImageControl
                            folder="images"
                            isThumb={true}
                            src={content.image11}
                          />
                        </Link>
                      </div>
                      <h4>
                        <Text string={content.emp_card_heading1} />
                      </h4>
                      <p>
                        <Text string={content.emp_card_detail1} />
                      </p>
                    </div>
                  </div>
                  <div className="col">
                    <div className="inner">
                      <div className="image">

                        <Link to="/pricing" >
                          <ImageControl
                            folder="images"
                            isThumb={true}
                            src={content.image12}
                          />
                        </Link>
                      </div>
                      <h4>
                        <Text string={content.emp_card_heading2} />
                      </h4>
                      <p>
                        <Text string={content.emp_card_detail2} />
                      </p>
                    </div>
                  </div>
                  <div className="col">
                    <div className="inner">
                      <div className="image">

                        <Link to="/pricing" >
                          <ImageControl
                            folder="images"
                            isThumb={true}
                            src={content.image13}
                          />
                        </Link>
                      </div>
                      <h4>
                        <Text string={content.emp_card_heading3} />
                      </h4>
                      <p>
                        <Text string={content.emp_card_detail3} />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section
              className="more_info_blk"
              style={{
                backgroundImage: `url(${getBackgroundImageUrlThumb(
                  content.image14
                )})`
              }}
            >
              <div className="contain">
                <div className="cntnt">
                  <h3>
                    <Text string={content.bchb_heading} />
                  </h3>
                  <p>
                    <Text string={content.bchb_detail} />
                  </p>
                  <div className="bTn">
                    <Link to={content.bchb_button_link_left} className="webBtn">
                      <Text string={content.bchb_button_title_left} />
                    </Link>
                    <Link
                      to={content.bchb_button_link_right}
                      className="webBtn blankBtn"
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
