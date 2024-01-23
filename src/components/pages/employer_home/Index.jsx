import React, { useEffect } from "react";
import Header from "../../shared/Header";
import Footer from "../../shared/Footer";

import { fetchEmployerHome } from "../../../states/actions/fetchEmployerHome";
import { useSelector, useDispatch } from "react-redux";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import LoadingScreen from "../../common/LoadingScreen";

import Text from "../../common/Text";
import { getBackgroundImageUrlThumb } from "../../../helpers/helpers";
import ImageControl from "../../common/ImageControl";
import { Link } from "react-router-dom";

const EmployerHome = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fetchEmployerHome.content);
  const isLoading = useSelector((state) => state.fetchEmployerHome.isLoading);
  const { content, site_settings, sec2u, sec2d } = data;

  useEffect(() => {
    dispatch(fetchEmployerHome());
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
            <section className="employer_home">
              <div className="contain">
                <div className="flex mini_flex_half">
                  <div className="cntnt">
                    <div className="sec_heading">
                      <h2>
                        <Text string={content.sec2_heading_tag} />
                      </h2>
                    </div>
                    <p>
                      <Text string={content.sec2_heading} />
                    </p>
                  </div>
                  <div className="right_cntnt"></div>
                </div>
                <div className="flex text_flex">
                  {sec2u && sec2u.map((row) => <h4>{row.title}</h4>)}
                </div>
                <div className="icon_icon_flex flex">
                  {sec2d &&
                    sec2d.map((row) => (
                      <div className="col">
                        <div className="inner">
                          <h1>{row.title}</h1>
                          <p>{row.detail}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </section>
            <section className="employers_strip">
              <div className="contain">
                <div className="flex">
                  <div className="colL">
                    <div className="cntnt">
                      <h4>
                        <Text string={content.dop_heading} />
                      </h4>
                      <p>
                        <Text string={content.dop_detail} />
                      </p>
                      <div className="bTn">
                        <Link
                          to={content.dop_button_link_left}
                          className="webBtn"
                        >
                          <Text string={content.dop_button_title_left} />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="colR">
                    <div className="inner_logo">
                      <ImageControl folder="images" src={content.image2} />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="option_grid employer_grid_home">
              <div className="contain">
                <div className="flex">
                  <div className="col">
                    <div className="inner">
                      <div className="cntnt">
                        <div className="sec_heading">
                          <h2>
                            <Link to={content.dop_button_link_left} className="text-white">
                              <Text string={content.sec4_heading1} />
                            </Link>
                          </h2>
                        </div>
                        <p>
                          <Text string={content.sec4_detail1} />
                        </p>
                      </div>
                      <div className="right_img">
                        <ImageControl folder="images" src={content.image3} />
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="inner">
                      <div className="cntnt">
                        <div className="sec_heading">
                          <h2>
                            <Link to={content.dop_button_link_left} className="text-white">
                              <Text string={content.sec4_heading2} />
                            </Link>
                          </h2>
                        </div>
                        <p>
                          <Text string={content.sec4_detail2} />
                        </p>
                      </div>
                      <div className="right_img">
                        <ImageControl folder="images" src={content.image4} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="other_employer">
              <div className="contain">
                <div className="first_blk flex">
                  <div className="cntnt">
                    <h4>
                      <Text string={content.sec5_1_heading} />
                    </h4>
                    <p>
                      <Text string={content.sec5_1_detail} />
                    </p>
                  </div>
                  <div className="bTn">
                    <Link
                      to={content.sec5_1_button_link_left}
                      className="webBtn"
                    >
                      {content.sec5_1_button_title_left}
                    </Link>
                  </div>
                </div>
                <div className="second_blk">
                  <div className="cntnt">
                    <h4>
                      <Text string={content.sec5_2_heading} />
                    </h4>
                    <h6>
                      <Text string={content.sec5_2_heading_2} />
                    </h6>
                    <p>
                      <Text string={content.sec5_2_detail} />
                    </p>
                  </div>
                  <div className="flex second_one">
                    <div className="left_cntnt">
                      <div className="progress_img">
                        <ImageControl folder="images" src={content.image5} />
                      </div>
                    </div>
                    <div className="right_cntnt">
                      <div className="inner">
                        <Text string={content.sec5_right_detail} />
                      </div>
                    </div>
                  </div>
                  <div className="cntnt">
                    <h4>
                      <Text string={content.sec5_3_heading} />
                    </h4>
                    <p>
                      <Text string={content.sec5_3_detail} />
                    </p>
                  </div>
                  <div className="second_flex_blk_full flex">
                    <div className="left_flex">
                      <div className="inner flex">
                        <i className="fa fa-file-o" />
                        <div className="_inner">
                          <h6>
                            <Text string={content.sec5_4_heading} />
                          </h6>
                          <p>
                            <Text string={content.sec5_4_detail} />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="right_flex">
                      <div className="bTn">
                        <Link
                          to={content.sec5_4_button_link_left}
                          className="webBtn"
                        >
                          <Text string={content.sec5_4_button_title_left} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="partner_blk_sec">
              <div className="contain">
                <div className="sec_heading">
                  <h2>
                    <Text string={content.sec6_heading} />
                  </h2>
                </div>
                <div className="image">
                  <ImageControl folder="images" src={content.image6} />
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

export default EmployerHome;
