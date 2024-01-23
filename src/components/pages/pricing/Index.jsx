import React, { useEffect } from "react";
import Header from "../../shared/Header";
import Footer from "../../shared/Footer";

import { fetchPricing } from "../../../states/actions/fetchPricing";
import { useSelector, useDispatch } from "react-redux";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import LoadingScreen from "../../common/LoadingScreen";

import Text from "../../common/Text";
import { getBackgroundImageUrlThumb } from "../../../helpers/helpers";
import ImageControl from "../../common/ImageControl";
import { Link } from "react-router-dom";
import { API_UPLOADS_URL } from "../../../constants/paths";
import Rating from "../../common/Rating";
import Carousel from 'react-elastic-carousel';
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

const TrainingPrograms = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fetchPricing.content);
  const isLoading = useSelector((state) => state.fetchPricing.isLoading);
  const { content, site_settings, sec3s, plans } = data;
  const memType = localStorage.getItem('memType');

  useEffect(() => {
    dispatch(fetchPricing());
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
            <section className="packages">
              <div className="contain">
                <div className="sec_heading">
                  <h2>
                    <Text string={content.banner_heading} />
                  </h2>
                  <Text string={content.banner_detail} />
                </div>
                <div className="flex">
                  {plans &&
                    plans.map((row) => (
                      <div className="col">
                        <div className="inner">
                          <div className="topBtn">
                            <Link to="/pricing" className="webBtn">
                              {row.plan_name}
                            </Link>
                          </div>
                          <div className="top-package">
                            <h4>From</h4>
                            <h3>${row.price}</h3>
                          </div>
                          <div className="inner-package">
                            <Text string={row.detail} />
                          </div>
                          <div className="bTn">
                            <Link
                              to={`/employer-signup/${row.encoded_id}`}
                              className={memType === 'candidate' ? 'webBtn candidate-loged' : 'webBtn'}
                            >
                              Choose Plan
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div
                  className="pricing_suport_blk popBtn"
                  data-popup="pricing_support"
                >
                  <div className="new_lbl">
                    <Text string={content.sec2_right_tag} />
                  </div>
                  <div className="inner_pricing_blk">
                    <h3>
                      <Text string={content.sec_heading_1} />
                    </h3>
                    <p>
                      <Text string={content.sec2_heading_2} />
                    </p>
                    <div className="bTn">
                      <a href="/contact-us" className="webBtn">
                        <Text string={content.sec2_button_text} />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex m_th">
                  {sec3s &&
                    sec3s.map((row) => (
                      <div className="_col">
                        <div className="_inner">
                          <h4>{row.title}</h4>
                          <p>{row.detail}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </section>
            <section className="testimonial_sec pricing_testi">
              <div className="contain">
                <div className="flex">
                  <div className="colL">
                    <div className="sec_heading">
                      <h3>
                        <Text string={content.testi_tag} />
                      </h3>
                      <h2>
                        <Text string={content.testi_heading} />
                      </h2>
                      <p>
                        <Text string={content.testi_tagline} />
                      </p>
                    </div>
                  </div>
                  <div className="colR">
                    <div id="owl-testi" className="owl-theme">
                      <Carousel breakPoints={breakPoints} showArrows={false} enableAutoPlay={true} autoPlaySpeed={5000} infinite={true}>
                        {data.testimonials &&
                          data.testimonials.map((row, index) => (
                            <div className="item" key={index} style={{ width: '393.333px', marginRight: '15px' }}>
                              <div className="inner">
                                <div className="comnt_testi">
                                  <div className="stars_revie">
                                    <Rating rating={row.rating} />
                                  </div>
                                  <p>
                                    {row.detail}
                                  </p>
                                </div>
                                <div className="flex">
                                  <div className="testi_icon">
                                    <ImageControl isThumb={true} folder="testimonials" src={row.image} />
                                  </div>
                                  <h5>{row.name}</h5>
                                </div>
                              </div>
                            </div>
                          ))}
                      </Carousel>
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

export default TrainingPrograms;
