import React, { useEffect, useState } from "react";
import EmployerSidebar from "../../../shared/Employer-Sidebar";
import HeaderLogged from "../../../shared/HeaderLogged";
import { Link } from "react-router-dom";
import DashboardStatCard from "../../../common/DashboardStatCard";
import DashboardJobsListing from "../../../common/DashboardJobsListing";
import { fetchEmployerData } from "../../../../states/actions/employerData";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../../common/LoadingScreen";

const EmployerDashboard = () => {
  const dispatch = useDispatch();
  const employer = useSelector((state) => state.employerData.content);
  const jobsApplication = useSelector((state) => state.employerData.content.applicants
  );
  const [applications, setApplications] = useState([]);
  const isLoading = useSelector((state) => state.employerData.isLoading);



  useEffect(() => {
    dispatch(fetchEmployerData());
  }, []);

  useEffect(() => {
    if (jobsApplication) {
      let tempApplications = [];
      jobsApplication.forEach((job) => {
        tempApplications.push(job.job);
      });
      setApplications(tempApplications);
    }
  }, [jobsApplication]);
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
                  <EmployerSidebar />
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
                        number={employer?.jobs?.length}
                        icon="briefcase.svg"
                        link={"/employer/my-jobs"}
                      />
                      {/* <DashboardStatCard
                        title="Send Offers"
                        number={15}
                        icon="document.svg"
                        link={""}
                      /> */}
                      <DashboardStatCard
                        title="Messages"
                        number={20}
                        icon="chat.svg"
                        link={"/employer/chat"}
                      />
                      <DashboardStatCard
                        title="Notifications"
                        number={12}
                        icon="bell.svg"
                        link={"/employer/notification"}
                      />
                    </div>
                    <div className="dash_heading_sec">
                      <h2>Latest Candidate Applications</h2>
                    </div>
                    <DashboardJobsListing data={applications} link={"/candidate-profile"} />
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

export default EmployerDashboard;
