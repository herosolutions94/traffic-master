import React, { useEffect } from "react";
import Sidebar from "../../../shared/Sidebar";
import HeaderLogged from "../../../shared/HeaderLogged";
import { Link } from "react-router-dom";
import DashboardStatCard from "../../../common/DashboardStatCard";
import DashboardJobsListing from "../../../common/DashboardJobsListing";
import { useSelector, useDispatch } from "react-redux";
import { fetchCandidateApplications } from "../../../../states/actions/candidateApplications";
import LoadingScreen from "../../../common/LoadingScreen";

const CandidateDashboard = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.candidateApplications.content.applications);
  const isLoading = useSelector((state) => state.candidateApplications.isLoading);

  useEffect(() => {
    dispatch(fetchCandidateApplications());
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <HeaderLogged />
          <main dashboard="">
            <section className="dash_outer">
              <div className="inner_dash">
                <div className="side_bar">
                  <Sidebar />
                </div>
                <div className="content_area">
                  <div className="dash_header">
                    <h3>
                      Dashboard <span>/ Overview</span>
                    </h3>
                  </div>
                  <div className="dash_body">
                    <div className="tiles_blk flex">
                      <DashboardStatCard
                        title="My Jobs"
                        number={data?.length}
                        icon="briefcase.svg"
                        link={"/candidate/dashboard"}
                      />
                      {/* <DashboardStatCard
                        title="Received Offers"
                        number={15}
                        icon="document.svg"
                        linkt={""}
                      /> */}
                      <DashboardStatCard
                        title="Messages"
                        number={20}
                        icon="chat.svg"
                        link={"/candidate/chat"}
                      />
                      <DashboardStatCard
                        title="Notifications"
                        number={12}
                        icon="bell.svg"
                        link={"/candidate/notification"}
                      />
                    </div>
                    <div className="dash_heading_sec">
                      <h2>Recently Applied Jobs</h2>
                    </div>
                    <DashboardJobsListing data={data} />
                  </div>
                </div>
              </div>
            </section>
          </main>
        </>
      )}
    </>
  );
};

export default CandidateDashboard;
