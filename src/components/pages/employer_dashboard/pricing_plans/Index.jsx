import React, { useState, useEffect } from "react";
import EmployerSidebar from "../../../shared/Employer-Sidebar";
import HeaderLogged from "../../../shared/HeaderLogged";
import { Link } from "react-router-dom";
import { fetchPricing } from "../../../../states/actions/fetchPricing";
import { useSelector, useDispatch } from "react-redux";
import Text from "../../../common/Text";
import LoadingScreen from "../../../common/LoadingScreen";

const PricingPlans = () => {
  const dispatch = useDispatch();
  const [pushPopup, setPushPopup] = useState(false);
  const data = useSelector((state) => state.fetchPricing.content);
  const isLoading = useSelector((state) => state.fetchPricing.isLoading);
  const { plans } = data;
  const TogglePush = () => {
    setPushPopup(!pushPopup);
  };


  useEffect(() => {
    dispatch(fetchPricing());
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
                  <EmployerSidebar />
                </div>
                <div className="content_area">
                  <div className="dash_header">
                    <h3>
                      Dashboard <span>/ Pricing Plans </span>
                    </h3>
                  </div>
                  <div className="dash_body">
                    <div className="packages dashboard_pkgs">
                      <div className="flex">
                        {plans &&
                          plans.map((row) => (
                            <div className="col">
                              <div className={`inner ${row.is_active ? "active_pkg" : ""}`}>
                                <div className="top-package">
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
                                    {row.is_active ? (
                                      row.plan_buy_status === "false" ? (
                                        <Link
                                          to={`/employer-signup/${row.encoded_id}`}
                                          className="webBtn"
                                        >
                                          Buy Plan
                                        </Link>
                                      ) : (
                                        <Link
                                          to={''}
                                          className="webBtn"
                                        >
                                          Selected
                                        </Link>
                                      )
                                    ) : (
                                      <Link
                                        to={`/employer-signup/${row.encoded_id}`}
                                        className="webBtn"
                                      >
                                        Upgrade Plan
                                      </Link>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
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

export default PricingPlans;
