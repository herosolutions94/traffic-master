import React, { useState, useEffect } from "react";
import EmployerSidebar from "../../../shared/Employer-Sidebar";
import HeaderLogged from "../../../shared/HeaderLogged";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { updatePaymentMethod, fetchPaymentMethodDetails } from "../../../../states/actions/paymentMethod";
import FormProcessingSpinner from "../../../common/FormProcessingSpinner";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";

const EditPaymentMethod = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const {
        register,
        watch,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm({ defaultValues: {} });

    const isFormProcessing = useSelector((state) => state.paymentMethod.isFormProcessing);
    const isLoading = useSelector((state) => state.paymentMethod.isLoading);
    const data = useSelector((state) => state.paymentMethod.data);

    useEffect(() => {
        dispatch(fetchPaymentMethodDetails(id));
    }, [id]);

    useEffect(() => {
        if (data) {
            setValue("bank_name", data.bank_name);
            setValue("account_title", data.account_title);
            setValue("account_number", data.account_number);
            setValue("swift_no", data.swift_no);
            setValue("name_on_card", data.name_on_card);
            if (data.expire_date) {
                setValue("expire_date", data.expire_date.split(" ")[0]);
            }
            setValue("cvc", data.cvc);
            setValue("status", data.status == 1 ? true : false);
        }
    }, [data]);

    const [pushPopup, setPushPopup] = useState(false);
    const TogglePush = () => {
        setPushPopup(!pushPopup);
    }

    const handleSave = (data) => {
        data.paymentMethodId = id;
        dispatch(updatePaymentMethod(data));
    }

    return (
        <>
            <ToastContainer />
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
                                    Dashboard <span>/ Payment Methods </span> <em>/ Update Payment Method</em>
                                </h3>
                            </div>
                            <div className="dash_body">
                                <div className="dash_heading_sec">
                                    <h2>Update Payment Method</h2>
                                    <Link to="/employer/payment-method">Back to page &gt;&gt;</Link>
                                </div>
                                <div className="dash_blk_box">
                                    <form action method="post" className="frmAjax" id="frmTopic"
                                        onSubmit={handleSubmit(handleSave)}
                                    >
                                        <div className="formRow row">
                                            <div className="col-md-6">
                                                <div className="txtGrp">
                                                    <label htmlFor className="move move_important">Bank Name</label>
                                                    <input
                                                        type="text"
                                                        className="txtBox"
                                                        defaultValue={watch("bank_name")}
                                                        {...register("bank_name", {
                                                            required: "Bank Name is required",
                                                        })}
                                                    />
                                                    {errors.bank_name && (
                                                        <span className="validation-error">{errors.bank_name.message}</span>
                                                    )}

                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="txtGrp">
                                                    <label htmlFor className="move move_important">Account Title</label>
                                                    <input type="text"
                                                        className="txtBox"
                                                        defaultValue={watch("account_title")}
                                                        {...register("account_title", {
                                                            required: "Account Title is required",
                                                        })}
                                                    />
                                                    {errors.account_title && (
                                                        <span className="validation-error">{errors.account_title.message}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="txtGrp">
                                                    <label htmlFor className="move move_important">Account Number</label>
                                                    <input type="number"
                                                        className="txtBox"
                                                        defaultValue={watch("account_number")}
                                                        {...register("account_number", {
                                                            required: "Account Number is required",
                                                        })}
                                                    />
                                                    {errors.account_number && (
                                                        <span className="validation-error">{errors.account_number.message}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="txtGrp">
                                                    <label htmlFor className="move move_important">Swift/Routing#</label>
                                                    <input type="number"
                                                        className="txtBox"
                                                        defaultValue={watch("swift_no")}
                                                        {...register("swift_no", {
                                                            required: "Swift/Routing# is required",
                                                        })}
                                                    />
                                                    {errors.swift_no && (
                                                        <span className="validation-error">{errors.swift_no.message}</span>
                                                    )}

                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="txtGrp">
                                                    <label htmlFor className="move move_important">Name on Card</label>
                                                    <input type="text"
                                                        className="txtBox"
                                                        defaultValue={watch("name_on_card")}
                                                        {...register("name_on_card", {
                                                            required: "Name on Card is required",
                                                        })}
                                                    />
                                                    {errors.name_on_card && (
                                                        <span className="validation-error">{errors.name_on_card.message}</span>
                                                    )}

                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="txtGrp">
                                                    <label htmlFor className="move move_important">Expiration Date</label>
                                                    <input type="date"
                                                        className="txtBox"
                                                        defaultValue={watch("expire_date")}
                                                        {...register("expire_date", {
                                                            required: "Expiration Date is required",
                                                        })}
                                                    />
                                                    {errors.expire_date && (
                                                        <span className="validation-error">{errors.expire_date.message}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="txtGrp">
                                                    <label htmlFor className="move move_important">CVC</label>
                                                    <input type="text"
                                                        className="txtBox"
                                                        defaultValue={watch("cvc")}
                                                        {...register("cvc", {
                                                            required: "CVC is required",
                                                        })}
                                                    />
                                                    {errors.cvc && (
                                                        <span className="validation-error">{errors.cvc.message}</span>
                                                    )}

                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <span>Make Default</span>
                                                <div className="switchBtn">
                                                    <input
                                                        type="checkbox"
                                                        name="status"
                                                        id="full-time"
                                                        defaultChecked={watch("status")}
                                                        {...register("status")}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bTn formBtn text-center">
                                            <button
                                                type="submit"
                                                className="webBtn icoBtn"
                                                disabled={isFormProcessing}
                                            >
                                                Submit
                                                <FormProcessingSpinner
                                                    isFormProcessing={isFormProcessing}
                                                />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default EditPaymentMethod;