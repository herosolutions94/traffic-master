import React, { useEffect, useState } from "react";
import Header from "../../shared/Header";
import Footer from "../../shared/Footer";

import { fetchHome } from "../../../states/actions/fetchHome";
import { useSelector, useDispatch } from "react-redux";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import LoadingScreen from "../../common/LoadingScreen";

import { getBackgroundImageUrlThumb } from "../../../helpers/helpers";
import ImageControl from "../../common/ImageControl";
import { Link } from "react-router-dom";
import { API_UPLOADS_URL } from "../../../constants/paths";
import Rating from "../../common/Rating";
import { useNavigate } from "react-router-dom";

import Text from "../../common/Text";
import Typewriter from "typewriter-effect";
import Carousel from 'react-elastic-carousel';
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.fetchHome.content);
  console.log(data?.content?.image2)
  const isLoading = useSelector((state) => state.fetchHome.isLoading);
  const { content, site_settings, sec5ls, sec5rs } = data;
  const [jobSearch, setJobSearch] = useState("");

  useEffect(() => {
    dispatch(fetchHome());
  }, []);

  const handleJobSearch = (e) => {
    e.preventDefault();
    if (jobSearch) {
      navigate(`/jobs/1?search=${jobSearch}`);
    }
  };

  useDocumentTitle(data.page_title);
  const memType = localStorage.getItem("memType");

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Header site_settings={site_settings} />
          <main index>
            <section
              id="banner"
              style={{
                backgroundImage: `url(${getBackgroundImageUrlThumb(
                  content.image1
                )})`,
              }}
            >
              <div className="contain">
                <div className="inner_cntnt">
                  <div className="content">
                    <h1>
                      {content.banner_heading}
                      <Typewriter
                        options={{
                          strings: [content.banner_heading_animated],
                          autoStart: true,
                          loop: true,
                        }}
                      />
                      <em>
                        <Text string={content.banner_heading_2} />
                      </em>
                    </h1>
                    <p>
                      <Text string={content.banner_tagline} />
                    </p>
                  </div>
                  <div className="banner-form">
                    <form action method="post" autoComplete="off" onSubmit={handleJobSearch}>
                      <div className="flex">
                        <div className="col">
                          <div className="_txtGrp">
                            <i className="fi-search" />
                            <input
                              type="text"
                              className="txtBox"
                              placeholder={content.banner_field_heading}
                              onChange={(e) => setJobSearch(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col_last">
                          <button
                            type="submit"
                            name
                            className="webBtn colorBtn"
                          >
                            <Text string={content.banner_button_text} />
                          </button>
                        </div>
                      </div>
                    </form>
                    <p>
                      <Text string={content.banner_search_tagline} />
                    </p>
                  </div>
                </div>
                <div className="right_banner_image">
                  <div className="main_image">
                    <ImageControl
                      folder="images"
                      isThumb={true}
                      src={content.image2}
                    />
                  </div>
                  {/* <div className="small_img1">
                    <ImageControl folder="images" src={content.image3} />
                  </div>
                  <div className="small_img2">
                    <ImageControl folder="images" src={content.image4} />
                  </div>
                  <div className="small_img3">
                    <ImageControl folder="images" src={content.image5} />
                  </div> */}
                </div>
              </div>
            </section>
            {/* banner */}
            <section className="cate_sec">
              <div className="contain">
                <div className="sec_heading">
                  <h3>
                    <Text string={content.wwu_heading_1} />
                  </h3>
                  <h2>
                    <Text string={content.wwu_heading_2} />
                  </h2>
                </div>
                <div className="listing">
                  <div className="item">
                    <Link to={content.wwu_link1} className="inner">
                      <div className="_cntnt">
                        <h1>
                          <Text string={content.wwu_heading1} />
                        </h1>
                        <h4>
                          <Text string={content.wwu_detail1} />
                        </h4>
                      </div>
                    </Link>
                  </div>
                  <div className="item">
                    <Link to={content.wwu_link2} className="inner">
                      <div className="_cntnt">
                        <h1>
                          <Text string={content.wwu_heading2} />
                        </h1>
                        <h4>
                          <Text string={content.wwu_detail2} />
                        </h4>
                      </div>
                    </Link>
                  </div>
                  <div className="item">
                    <Link to={content.wwu_link3} className="inner">
                      <div className="_cntnt">
                        <h1>
                          <Text string={content.wwu_heading3} />
                        </h1>
                        <h4>
                          <Text string={content.wwu_detail3} />
                        </h4>
                      </div>
                    </Link>
                  </div>
                  <div className="item">
                    <Link to={content.wwu_link4} className="inner">
                      <div className="_cntnt">
                        <h1>
                          <Text string={content.wwu_heading4} />
                        </h1>
                        <h4>
                          <Text string={content.wwu_detail4} />
                        </h4>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
            <section className="post_job_sec">
              <div className="contain">
                <div className="flex">
                  <div className="colL">
                    <div className="image">
                      <ImageControl
                        folder="images"
                        isThumb={true}
                        src={content.image6}
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
                              isThumb={true}
                              src={content.image9}
                            />
                          </div>
                          <div className="cntnt">
                            <h4>
                              <Text string={content.enl_card_home_heading1} />
                            </h4>
                            <p>
                              <Text string={content.enl_card_home_detail1} />
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="small_icon">
                            <ImageControl
                              folder="images"
                              isThumb={true}
                              src={content.image10}
                            />
                          </div>
                          <div className="cntnt">
                            <h4>
                              <Text string={content.enl_card_home_heading2} />
                            </h4>
                            <p>
                              <Text string={content.enl_card_home_detail2} />
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="small_icon">
                            <ImageControl
                              folder="images"
                              isThumb={true}
                              src={content.image11}
                            />
                          </div>
                          <div className="cntnt">
                            <h4>
                              <Text string={content.enl_card_home_heading3} />
                            </h4>
                            <p>
                              <Text string={content.enl_card_home_detail3} />
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="colR">
                    <div className="sec_heading">
                      <h3>
                        <Text string={content.enl_home_heading_tag} />
                      </h3>
                      <h2>
                        <Text string={content.enl_home_heading} />
                      </h2>
                    </div>
                    <Text string={content.enl_home_detail} />
                    {/* button here */}
                    {memType === "employer" && (
                      <div className="bTn">
                        <Link
                          to="/employer/post-job"
                          className="webBtn"
                        >
                          <Text string={content.enl_home_button_title_right} />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
            <section className="_cta_sec">
              <div className="contain">
                <div
                  className="cntnt"
                  style={{
                    backgroundImage: `url(${getBackgroundImageUrlThumb(
                      content.image7
                    )})`,
                  }}
                >
                  <div className="sec_heading">
                    <h2>
                      <Text string={content.bchb_heading} />
                    </h2>
                    <p>
                      <Text string={content.bchb_detail} />
                    </p>
                  </div>
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
            <section className="how-it-work">
              <div className="contain">
                <div className="flex">
                  <div className="colL">
                    <div className="sec_heading">
                      <h3>
                        <Text string={content.hiw_heading} />
                      </h3>
                      <h2>
                        <Text string={content.hiw_heading_2} />
                      </h2>
                    </div>
                    <Text string={content.hiw_detail} />
                    <Link to={content.hiw_button_link_left} className="webBtn">
                      <Text string={content.hiw_button_title_left} />
                    </Link>
                  </div>
                  <div className="colR">
                    <div className="_col">
                      <div className="how_work_heading">
                        <h3>
                          <Text string={content.hiw_mid_heading} />
                        </h3>
                      </div>
                      <ul>
                        {sec5ls &&
                          sec5ls.map((row) => (
                            <li>
                              <div className="_step">{row.txt1}</div>
                              <div className="_cntnt">
                                <div className="icon_img">
                                  <i className={`fi ${row.txt2}`} />
                                </div>
                                <div className="inner_cntnt">
                                  <h3>{row.title}</h3>
                                  <p>{row.detail}</p>
                                </div>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="_col">
                      <div className="how_work_heading">
                        <h3>
                          <Text string={content.hiw_right_heading} />
                        </h3>
                      </div>
                      <ul>
                        {sec5rs &&
                          sec5rs.map((row) => (
                            <li>
                              <div className="_step">{row.txt1}</div>
                              <div className="_cntnt">
                                <div className="icon_img">
                                  <i className={`fi ${row.txt2}`} />
                                </div>
                                <div className="inner_cntnt">
                                  <h3>{row.title}</h3>
                                  <p>{row.detail}</p>
                                </div>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="more_info">
              <div className="contain">
                <div className="flex">
                  <div className="colL">
                    <div className="image">
                      <ImageControl
                        folder="images"
                        isThumb={true}
                        src={content.image8}
                      />
                    </div>
                  </div>
                  <div className="colR">
                    <div className="inner">
                      <div className="sec_heading">
                        <h3>
                          <Text string={content.enl_heading_tagline} />
                        </h3>
                        <h2>
                          <Text string={content.enl_heading} />
                        </h2>
                      </div>
                      <p>
                        <Text string={content.enl_detail} />
                      </p>
                      {/* <a href="?" class="webBtn"><i class="fi fi-rr-upload"></i> Upload Your Resume</a> */}
                      <div className="bTn">
                        <Link
                          to={content.enl_button_link_left}
                          className="webBtn"
                        >
                          <Text string={content.enl_button_title_left} />
                        </Link>
                        <Link
                          to={content.enl_button_link_right}
                          className="webBtn"
                        >
                          <Text string={content.enl_button_title_right} />
                        </Link>
                      </div>
                      <div className="flex" id="counter">
                        <div className="col">
                          <div className="_inner">
                            <h1>
                              <Text string={content.enl_card_heading1} />
                            </h1>
                            <h4>
                              <Text string={content.enl_card_detail1} />
                            </h4>
                          </div>
                        </div>
                        <div className="col">
                          <div className="_inner">
                            <h1>
                              <Text string={content.enl_card_heading2} />
                            </h1>
                            <h4>
                              <Text string={content.enl_card_detail2} />
                            </h4>
                          </div>
                        </div>
                        <div className="col">
                          <div className="_inner">
                            <h1>
                              <Text string={content.enl_card_heading3} />
                            </h1>
                            <h4>
                              <Text string={content.enl_card_detail3} />
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="testimonial_sec">
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
                                    <ImageControl
                                      folder="testimonials"
                                      isThumb={true}
                                      src={row.image}
                                    />
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

export default Home;
