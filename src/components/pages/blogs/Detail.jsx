import React, { useEffect } from "react";
import Header from "../../shared/Header";
import Footer from "../../shared/Footer";

import { fetchBlogDetail } from "../../../states/actions/fetchBlogDetail";
import { useSelector, useDispatch } from "react-redux";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import LoadingScreen from "../../common/LoadingScreen";

import { useParams } from "react-router-dom";

import Text from "../../common/Text";
import { eventDateFormat } from "../../../helpers/helpers";
import ImageControl from "../../common/ImageControl";
import { Link } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fetchBlogDetail.content);
  const isLoading = useSelector((state) => state.fetchBlogDetail.isLoading);
  const { blog, site_settings, category_name, p_blogs } = data;

  useEffect(() => {
    dispatch(fetchBlogDetail({ id }));
  }, [id]);

  useDocumentTitle(data.page_title);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Header site_settings={site_settings} />
          <main index>
            <section className="blog_page">
              <div className="contain">
                <div className="flex blog_flex">
                  <div className="colL">
                    <div className="blog_detail_blk">
                      <div className="image">
                        <ImageControl
                          folder="blogs"
                          src={blog.image}
                          specificWidth="1000p_"
                        />
                      </div>
                      <div className="imp_info flex">
                        <div className="ctgry">
                          <Text string={category_name} />
                        </div>
                        <span>|</span>
                        <div className="blog_date">
                          {eventDateFormat(blog.created_date)}
                        </div>
                      </div>
                      <div className="ckEditor">
                        <Text string={blog.description} />
                      </div>
                    </div>
                  </div>
                  <div className="colR">
                    <div className="ctgryBlk" style={{ display: "none" }}>
                      <h4>Categories</h4>
                      <ul className="ctgryLst">
                        <li>
                          <a href="blog-detail.php">Education</a>
                        </li>
                        <li>
                          <a href="blog-detail.php">Information</a>
                        </li>
                        <li>
                          <a href="blog-detail.php">Interview</a>
                        </li>
                        <li>
                          <a href="blog-detail.php">Job Seeking</a>
                        </li>
                        <li>
                          <a href="blog-detail.php">Jobs</a>
                        </li>
                        <li>
                          <a href="blog-detail.php">Learn</a>
                        </li>
                        <li>
                          <a href="blog-detail.php">Skill</a>
                        </li>
                      </ul>
                    </div>
                    <div className="blog_side_blk">
                      <h4>Most Popular Posts</h4>
                      <ul>
                        {p_blogs &&
                          p_blogs.map((blog) => (
                            <li>
                              <Link
                                to={`/blog-detail/${blog.id}`}
                                className="small_image"
                              >
                                <ImageControl
                                  folder="blogs"
                                  src={blog.image}
                                  specificWidth="400p_"
                                />
                              </Link>
                              <div className="txt">
                                <h5>
                                  <Link to={`/blog-detail/${blog.id}`}>
                                    <Text string={blog.title} />
                                  </Link>
                                </h5>
                                <div className="blog_date">
                                  {eventDateFormat(blog.created_date)}
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
          </main>
          <Footer site_settings={site_settings} />
        </>
      )}
    </>
  );
};

export default Detail;
