import React from "react";
import { API_UPLOADS_URL } from "../../../constants/paths";
import ReactPaginate from "react-paginate";
import ReactHtmlParser from 'html-react-parser';
import { Link } from "react-router-dom";
import ImageControl from "../../common/ImageControl";


const Trainers = ({ trainers }) => {
  //getting start_date and End_date from the API and show the formate in 27+29 Jan 
  const getDate = (date) => {
    let date1 = new Date(date);
    let date2 = new Date(date1);
    date2.setDate(date2.getDate() + 1);
    let month1 = date1.toLocaleString("default", { month: "short" });
    let month2 = date2.toLocaleString("default", { month: "short" });
    let day1 = date1.getDate();
    let day2 = date2.getDate();
    return day1 + " - " + day2 + " " + month1;
  };


  return (
    <>
      {trainers?.length > 0 ? (
        <div className="flex">
          {trainers.map((trainer, index) => (
            <div className="col" key={index}>
              <div className="inner">
                <div className="panel_body">
                  <div className="badge_training">
                    <span>{trainer.badge_text}</span>
                  </div>
                  <a href={trainer.link} target="_blank">
                    <div className="image">
                      <ImageControl isThumb={true} folder="training_program" src={trainer.image} />
                    </div>
                  </a>
                </div>
                <div className="penal_heading">
                  <h4>{trainer.heading}</h4>
                  <p>{trainer.sub_heading}</p>
                </div>
                <div className="panel_footer">
                  <div className="summery">
                    <p>
                      {ReactHtmlParser(trainer.detail)}
                    </p>
                  </div>
                  <div className="flex">
                    <div className="listing_public">
                      <div className="_innerlst">
                        <div className="panel-heading">PUBLIC</div>
                        <div className="flex">
                          <div className="date">
                            <div className="rolodex-widget">
                              <div className="rings">
                                <span className="left-ring" />
                                <span className="right-ring" />
                              </div>
                              <div className="sheet">
                                <span>{getDate(trainer.start_date)}</span>

                              </div>
                            </div>
                          </div>
                          <div className="duration">
                            <ul>
                              <li>
                                <strong>Durée :</strong>
                                <span>7h00</span>
                              </li>
                              <li>
                                <strong>Niveau :</strong>
                                <span>Débutant-Intermédiaire</span>
                              </li>
                            </ul>
                          </div>
                          <div className="_price">{trainer.price}$</div>
                        </div>
                      </div>
                    </div>
                    <div className="listing_private">
                      <div className="_innerlst">
                        <div className="panel-heading">Private</div>
                        <p>100% personnalisé selon vos besoins d'entreprise</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="col">
          <div className="inner">
            <div className="no_job">
              <h4>No Training Program Found</h4>
              <p>
                <small>Sorry, we couldn't find any Program.</small>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Trainers;
