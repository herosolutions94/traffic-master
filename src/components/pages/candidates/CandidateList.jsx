import React, { useState, useEffect } from "react";
import { API_UPLOADS_URL } from "../../../constants/paths";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const CandidateList = ({ candidateList, isFetching, pageNo, handlePageClick, totalCandidate, itemsPerPage }) => {
  const initialPage = pageNo - 1;
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setPageCount(Math.ceil(totalCandidate / itemsPerPage));
  }, [totalCandidate]);

  return (
    <>
      {isFetching ? (
        <div className="col">
          <div className="inner">
            <p>Fetching...</p>
          </div>
        </div>
      ) : candidateList?.length > 0 ? (
        <>
          {candidateList?.map((candidate, index) => (
            <div className="col">
              <div className="inner">
                <div className="head_job">
                  <div className="img_ico">
                    <img
                      src={candidate.mem_image ? API_UPLOADS_URL + "/members/" + candidate.mem_image : "/images/dummy_img.png"}
                      alt=""
                    />
                  </div>
                  <div className="cntnt">
                    <h4>
                      <a
                        href={`/candidate/candidate-detail/${candidate.mem_id}`}
                        target="_blank"
                      >
                        {candidate.mem_fname} {candidate.mem_lname}
                      </a>
                    </h4>
                    <p>
                      <small>{candidate.profession}</small>
                    </p>
                  </div>
                </div>
                <div className="job_bdy">
                  <ul>
                    <li>
                      <i className="fi fi-rr-marker" />{" "}
                      <span>
                        {candidate.mem_country + ", " + candidate.mem_city}
                      </span>
                    </li>
                    <li>
                      <i className="fi fi-rr-briefcase" />
                      <span>{candidate.mem_experience} Years Experience</span>
                    </li>
                  </ul>
                  <p>{candidate.details?.professional_summary}</p>
                  <div className="skils">
                    {candidate.details?.skills
                      ?.split(",")
                      .map((skill, index) => (
                        <span key={index}>{skill}</span>
                      ))}
                  </div>
                </div>
                <div className="job_footer">
                  <div className="job_price">
                    ${candidate.details?.min_price} -{" "}
                    {candidate.details?.max_price}
                  </div>
                  <a
                    href={`/candidate/candidate-detail/${candidate.mem_id}`}
                    className="webBtn mdBtn"
                    target="_blank"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="col">
          <div className="inner">
            <div className="no_job">
              <p>
                <small>No Candidate Found</small>
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="d-flex justify-content-center align-items-center">
        <ReactPaginate
          initialPage={initialPage}
          forcePage={initialPage}
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={false}
        />
      </div>
    </>
  );
};

export default CandidateList;
