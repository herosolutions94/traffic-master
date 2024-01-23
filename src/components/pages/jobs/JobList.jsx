import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { ToastContainer } from "react-toastify";
import JobShareModel from "./JobShareModel";
import { useDispatch } from "react-redux";
import { saveLikeJob } from "../../../states/actions/likeJobs";
import SingleJobBlk from "./job-single";

const JobList = ({ jobList, pageNo, itemsPerPage, totalJobs, handlePageClick, isFetching, featuredJobs, setFeaturedJobs }) => {
  const dispatch = useDispatch();
  const initialPage = pageNo - 1;
  const [pageCount, setPageCount] = useState(0);
  const [islogin, setIslogin] = useState(false);
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState('');
  const [jobLists, setJobLists] = useState(jobList);
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    setPageCount(Math.ceil(totalJobs / itemsPerPage));
  }, [totalJobs]);

  useEffect(() => {
    setJobLists(jobList);
  }, [jobList]);

  useEffect(() => {
    if (authToken) {
      setIslogin(true);
    }
  }, [authToken]);

  const handleCopyLink = (index) => {
    setOpen(true);
    const baseUrl = window.location.origin;
    setLink(`${baseUrl}/job-details/${jobList[index].id}`);
  }

  const handleSaveJob = (id) => {
    const index = jobLists.findIndex((job) => job?.id === id);
    const newJobLists = [...jobLists];
    newJobLists[index].saved = true;
    setJobLists(newJobLists);

    const featuredIndex = featuredJobs.findIndex((job) => job?.id === id);
    if (featuredIndex !== -1) {
      const newFeaturedJobs = [...featuredJobs];
      newFeaturedJobs[featuredIndex].saved = true;
      setFeaturedJobs(newFeaturedJobs);
    }

    dispatch(saveLikeJob(id));
  }
  return (
    <>
      <ToastContainer />
      <div className="flex job_flex">
        {isFetching ? (
          ""
        ) : (
          featuredJobs?.length > 0 && pageNo === 1 ? (
            <>
              {featuredJobs?.map((job, index) => (
                <SingleJobBlk job={job} index={index} handleSaveJob={handleSaveJob} handleCopyLink={handleCopyLink} islogin={islogin} />
              ))}
            </>
          ) : (
            ""
          )
        )}
        {isFetching ? (
          <div className="col">
            <div className="inner">
              <p>Fetching...</p>
            </div>
          </div>
        ) : (
          jobLists?.length > 0 ? (
            <>
              {jobLists?.map((job, index) => (
                <SingleJobBlk job={job} index={index} handleSaveJob={handleSaveJob} handleCopyLink={handleCopyLink} islogin={islogin} />
              ))}
            </>
          ) : (
            <div className="col">
              <div className="inner">
                <div className="no_job">
                  <h4>No Jobs Found</h4>
                  <p>
                    <small>
                      Sorry, we couldn't find any jobs matching your search.
                    </small>
                  </p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
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
      {open && <JobShareModel setOpen={setOpen} link={link} />}

    </>
  );
};

export default JobList;
