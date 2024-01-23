import React, { useEffect } from "react";
import Header from "../../shared/Header";
import Footer from "../../shared/Footer";

import {
  fetchBlogs,
  searchBlogsData,
} from "../../../states/actions/fetchBlogs";
import { useSelector, useDispatch } from "react-redux";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import LoadingScreen from "../../common/LoadingScreen";

import Text from "../../common/Text";
import { eventDateFormat } from "../../../helpers/helpers";
import ImageControl from "../../common/ImageControl";
import { Link } from "react-router-dom";

const Blogs = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fetchBlogs.content);
  const isLoading = useSelector((state) => state.fetchBlogs.isLoading);
  const isSearching = useSelector((state) => state.fetchBlogs.isSearching);
  const blogs = useSelector((state) => state.fetchBlogs.blogs);
  const { content, site_settings, cats, p_blogs, f_blogs } = data;

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  const searchBlogs = (cat_id) => {
    let formData = { cat_id: parseInt(cat_id) };
    dispatch(searchBlogsData(formData));
  };

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
                <div className="featured_posts">
                  <div className="flex">
                    {f_blogs &&
                      f_blogs.map((blog) => (
                        <div className="col_feature">
                          <div className="inner">
                            <Link
                              to={`/blog-detail/${blog.id}`}
                              className="image_feature"
                            >
                              <ImageControl
                                folder="blogs"
                                src={blog.image}
                                specificWidth="400p_"
                              />
                            </Link>
                            <div className="txt">
                              <div className="ctgry">
                                <Text string={blog.category_name} />
                              </div>
                              <h4>
                                <Link to={`/blog-detail/${blog.id}`}>
                                  <Text string={blog.title} />
                                </Link>
                              </h4>
                              <div className="blog_date">
                                {eventDateFormat(blog.created_date)}
                              </div>
                              <Text string={blog.description} length={100} />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="flex blog_flex">
                  <div className="colL">
                    <div className="inner_blog">
                      {isSearching
                        ? "fetching..."
                        : blogs.length > 0
                        ? blogs.map((blog) => (
                            <div className="col">
                              <div className="inner">
                                <Link
                                  to={`/blog-detail/${blog.id}`}
                                  className="image"
                                >
                                  <ImageControl
                                    folder="blogs"
                                    src={blog.image}
                                    specificWidth="400p_"
                                  />
                                </Link>
                                <div className="txt">
                                  <div className="ctgry">
                                    <Text string={blog.category_name} />
                                  </div>
                                  <h5>
                                    <Link to={`/blog-detail/${blog.id}`}>
                                      <Text string={blog.title} />
                                    </Link>
                                  </h5>
                                  <div className="blog_date">
                                    {eventDateFormat(blog.created_date)}
                                  </div>
                                  <Text
                                    string={blog.description}
                                    length={100}
                                  />
                                </div>
                              </div>
                            </div>
                          ))
                        : "No blog found."}
                    </div>
                  </div>
                  <div className="colR">
                    <div className="ctgryBlk">
                      <h4>Categories</h4>
                      <ul className="ctgryLst">
                        {cats.map((c) => (
                          <li>
                            <span
                              onClick={() => {
                                searchBlogs(c.id);
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              {c.title}
                            </span>
                          </li>
                        ))}
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

export default Blogs;
