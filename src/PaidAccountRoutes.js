import React, {useState, useEffect} from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import http from "./helpers/http";
import * as helpers from "./helpers/helpers";
import LoadingScreen from "./components/common/LoadingScreen";

const PaidAccountRoutes = () => {
  const authToken = useSelector((state) => state.fetchSignin.authToken);
  const [isPaidAccount, setIsPaidAccount] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkPaidAccount = async () => {
      if (authToken) {
        try {
          const { data } = await http.post("auth/check-paid-account", helpers.doObjToFormData({authToken}));
          if (data.plan_buy_status == "true") {
            setIsPaidAccount(true);
          }
        } catch (error) {
          console.log(error);
        }
      }
      setIsLoading(false);
    };

    checkPaidAccount();
  }, [authToken]);

    return (
        <>
        {isLoading ? (
            <LoadingScreen />
                ) : (
                <>
                    {isPaidAccount && authToken ? (
                        <Outlet />
                    ) : (
                        <Navigate to="/signin" replace />
                    )}
                </>
            )}
        </>
    );
};

export default PaidAccountRoutes;