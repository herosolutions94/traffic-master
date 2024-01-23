import React from "react";
import { Link } from "react-router-dom";
import HeaderLogged from "../../shared/HeaderLogged";
const EmployerChat = () => {
  return (
    <>
      <HeaderLogged />
      <main common="" inbox="">
        <div className="contain-fluid">
          <div className="barBlk relative">
            <div className="srch relative">
              <input
                type="text"
                className="txtBox"
                placeholder="Search contact"
              />
              <button type="button">
                <img src="/images/search.svg" alt="" />
              </button>
            </div>
            <ul className="frnds scrollbar">
              <li data-chat="person1" className="active">
                <div className="inner sms">
                  <div className="ico">
                    <img src="/images/1.png" alt="" />
                  </div>
                  <div className="txt">
                    <h5>Jennifer Kem</h5>
                    <p>Welcome to Ticket Graze</p>
                  </div>
                </div>
              </li>
              <li data-chat="person2">
                <div className="inner unread">
                  <div className="ico">
                    <img src="/images/2.png" alt="" />
                  </div>
                  <div className="txt">
                    <h5>Chris Gale</h5>
                    <p>Could you describe please</p>
                  </div>
                </div>
              </li>
              <li data-chat="person3">
                <div className="inner sms">
                  <div className="ico">
                    <img src="/images/1.png" alt="" />
                  </div>
                  <div className="txt">
                    <h5>Sofia Safinaz</h5>
                    <p>Great, Thank You!</p>
                  </div>
                </div>
              </li>
              <li data-chat="person4">
                <div className="inner">
                  <div className="ico">
                    <img src="/images/2.png" alt="" />
                  </div>
                  <div className="txt">
                    <h5>John Wick</h5>
                    <p>The best Innovative Chatbox</p>
                  </div>
                </div>
              </li>
              <li data-chat="person5">
                <div className="inner unread">
                  <div className="ico">
                    <img src="/images/1.png" alt="" />
                  </div>
                  <div className="txt">
                    <h5>Alina Gill</h5>
                    <p>
                      Lorem ipsum sit amen dolor, lorem ipsum sit amen dolor?
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="chatBlk relative">
            <div className="chatPerson">
              <div className="backBtn">
                <a href="javascript:void(0)" className="fi-arrow-left" />
              </div>
              <div className="ico">
                <img src="/images/1.png" alt="" />
              </div>
              <h6>Samantha James</h6>
            </div>
            <div className="chat scrollbar active" data-chat="person1">
              <div className="buble you">
                <div className="ico">
                  <img src="/images/2.png" alt="" />
                </div>
                <div className="txt">
                  <div className="time">11:59 am</div>
                  <div className="cntnt">Hello</div>
                </div>
              </div>
              <div className="buble me">
                <div className="ico">
                  <img src="/images/1.png" alt="" />
                </div>
                <div className="txt">
                  <div className="time">11:59 am</div>
                  <div className="cntnt">it's me.</div>
                </div>
              </div>
              <div className="buble you">
                <div className="ico">
                  <img src="/images/2.png" alt="" />
                </div>
                <div className="txt">
                  <div className="time">11:59 am</div>
                  <div className="cntnt">I was wondering...</div>
                </div>
              </div>
              <div className="buble you">
                <div className="ico">
                  <img src="/images/1.png" alt="" />
                </div>
                <div className="txt">
                  <div className="time">11:59 am</div>
                  <div className="cntnt">
                    Lorem ipsum sit amen dolor, lorem ipsum sit amen dolor?
                  </div>
                </div>
              </div>
              <div className="buble me">
                <div className="ico">
                  <img src="/images/2.png" alt="" />
                </div>
                <div className="txt">
                  <div className="time">11:59 am</div>
                  <div className="cntnt">About who we used to be. </div>
                </div>
              </div>
              <div className="buble you">
                <div className="ico">
                  <img src="/images/1.png" alt="" />
                </div>
                <div className="txt">
                  <div className="time">11:59 am</div>
                  <div className="cntnt">Hello, can you hear me? </div>
                </div>
              </div>
              <div className="buble you">
                <div className="ico">
                  <img src="/images/2.png" alt="" />
                </div>
                <div className="txt">
                  <div className="time">11:59 am</div>
                  <div className="cntnt">I'm in California dreaming </div>
                </div>
              </div>
            </div>
            <div className="write">
              <form className="relative">
                <textarea
                  className="txtBox"
                  placeholder="Type a message"
                  onkeypress="textAreaAdjust(this)"
                  defaultValue={""}
                />
                <div className="btm">
                  <button
                    type="button"
                    className="webBtn smBtn labelBtn arrowBtn upBtn"
                    title="Upload Files"
                  >
                    <img src="/images/clip.png" alt="" />
                  </button>
                  <button
                    type="submit"
                    className="webBtn smBtn labelBtn icoBtn"
                  >
                    Send <img src="/images/message.png" alt="" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default EmployerChat;
