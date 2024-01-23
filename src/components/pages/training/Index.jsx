import React, { useEffect } from "react";
import Header from "../../shared/Header";
import Footer from "../../shared/Footer";

import { fetchTraining } from "../../../states/actions/fetchTraining";
import { useSelector, useDispatch } from "react-redux";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import LoadingScreen from "../../common/LoadingScreen";

import Text from "../../common/Text";
import { getBackgroundImageUrlThumb } from "../../../helpers/helpers";
import Trainers from "./Trainers";

const TrainingPrograms = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fetchTraining.content);
  const isLoading = useSelector((state) => state.fetchTraining.isLoading);
  const { content, site_settings, partners, trainers } = data;

  useEffect(() => {
    dispatch(fetchTraining());
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
            <section className="training_blk">
              <div className="contain">
                <div className="sec_heading">
                  <h2>
                    <Text string={content.sec2_HEADING} />
                  </h2>
                </div>
                <Trainers trainers={trainers} />
                <div className="highlight_blk_gray">
                  <Text string={content.last_para} />
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
