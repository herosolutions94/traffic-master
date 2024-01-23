import React, { useEffect } from 'react'
import Footer from '../../shared/Footer'
import Header from '../../shared/Header'
import { useSelector, useDispatch } from "react-redux";
import { fetchCandidateDetail } from '../../../states/actions/fetchCandidateDetail';
import { fetchCandidates } from '../../../states/actions/fetchCandidates';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import LoadingScreen from '../../common/LoadingScreen';
import { useParams } from 'react-router-dom';
import { API_UPLOADS_URL } from '../../../constants/paths';
import ImageControl from '../../common/ImageControl';

const Candidatedetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.fetchCandidates.content);
    const isLoading = useSelector((state) => state.fetchCandidates.isLoading);
    const candidateDetails = useSelector((state) => state.fetchCandidateDetail.content);
    const { content, site_settings, sec3s } = data;

    useEffect(() => {
        dispatch(fetchCandidates());
    }, []);

    useEffect(() => {
        dispatch(fetchCandidateDetail(id));
    }, [id]);

    useDocumentTitle(data.page_title);
    return (
        <>   {isLoading ? (
            <LoadingScreen />
        ) : (
            <>

                <Header site_settings={site_settings} />
                <section className="candidate_pofile">
                    <div className="contain">
                        <div className="profile_flex">
                            <div className="img_ico">
                                <ImageControl isThumb={true} folder="members" src={candidateDetails.content?.mem_image} />
                            </div>
                            <div className="cntnt">
                                <div className="name">{candidateDetails.content?.mem_fname} {candidateDetails.content?.mem_lname}</div>
                                <ul>
                                    <li><i className="fi fi-rr-marker"></i> <span>{candidateDetails.content?.mem_city} </span></li>
                                    <li><i className="fi fi-rr-briefcase"></i> <span>{candidateDetails.content?.profession}</span></li>
                                    <li><i className="fi fi-rr-clock-seven"></i> <span>${candidateDetails.professional_details?.min_price} - ${candidateDetails.professional_details?.max_price}</span></li>
                                </ul>
                                <div className="skils">
                                    {candidateDetails.professional_details?.skills
                                        ?.split(",")
                                        .map((skill, index) => (
                                            <span key={index}>{skill}</span>
                                        ))
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                <section className="job_detail_sec">
                    <div className="contain">
                        <div className="cntnt">
                            <div className="job_detail_grid_pg">

                                <ul>
                                    <li>
                                        <h4><i className="fi fi-rr-briefcase"></i><span>Experience</span></h4>
                                        <p>{candidateDetails.content?.mem_experience} Years</p>
                                    </li>

                                    <li>
                                        <h4><i className="fi fi-rr-graduation-cap"></i><span>Education</span></h4>
                                        <p>Behance Accounting</p>
                                    </li>

                                    <li>
                                        <h4><i className="fi fi-rr-smartphone"></i><span>Phone</span></h4>
                                        <p>{candidateDetails.content?.mem_phone}</p>
                                    </li>
                                    <li>
                                        <div className="bTn">
                                            <a href={candidateDetails.professional_details?.resume ? API_UPLOADS_URL + '/members/resume/' + candidateDetails.professional_details?.resume : "#"} className="webBtn" target="_blank">Download CV</a>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="bTn">
                                            <a href="/contact-us" className="webBtn blankBtn">Contact Me</a>
                                        </div>
                                    </li>

                                </ul>
                                <br />
                                <div className="ckEditor">
                                    <h4>Biography</h4>
                                    <p>
                                        {candidateDetails.professional_details?.professional_summary}
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                <Footer site_settings={site_settings} />
            </>
        )}

        </>
    )
}

export default Candidatedetail
