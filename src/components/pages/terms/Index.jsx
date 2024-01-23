import React, { useEffect, useState } from "react";
import Header from "../../shared/Header";
import Footer from "../../shared/Footer";

import { fetchTerms } from "../../../states/actions/fetchTerms";
import { useSelector, useDispatch } from "react-redux";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import LoadingScreen from "../../common/LoadingScreen";

import Text from "../../common/Text";

const Terms = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fetchTerms.content);
  const isLoading = useSelector((state) => state.fetchTerms.isLoading);
  const { content, site_settings, faqs } = data;

  useEffect(() => {
    dispatch(fetchTerms());
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
            <section className="text-pages">
              <div className="contain">
                <div className="sec_heading">
                  <h2>
                    <Text string={content.banner_heading} />
                  </h2>
                </div>
                <div className="ckEditor text-blk">
                  <Text string={content.detail} />
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

export default Terms;
