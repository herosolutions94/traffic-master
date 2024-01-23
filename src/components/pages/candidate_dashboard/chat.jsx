import React, { useState, useRef, useEffect } from "react";
import HeaderLogged from "../../shared/HeaderLogged";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllMembers } from '../../../states/actions/members';
import http from "../../../helpers/http";
import * as helpers from "../../../helpers/helpers";
import ImageControl from "../../common/ImageControl";
import socketIOClient from "socket.io-client";


const CandidateChat = () => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.content.members);
  const [message, setMessage] = useState("");
  const attachmentRef = useRef(null);
  const [attachments, setAttachments] = useState([]);
  const [attachmentsName, setAttachmentsName] = useState([]);
  const [activeMember, setActiveMember] = useState(null);
  const [receiverId, setReceiverId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllMembers());
  }, []);

  const handleFiles = (e) => {
    e.preventDefault();
    attachmentRef.current.click();
  };

  const handleSelectAttachment = (e) => {
    setAttachments([...attachments, ...e.target.files]);

    let formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      // formData.append('attachments', e.target.files[i]);
      formData.append('attachments[]', e.target.files[i]);
    }

    http.post('/upload-attachments', formData)
      .then((res) => {
        setAttachmentsName(res.data.attachment_names);
      })
      .catch((err) => {
        console.log(err);
      })

  };

  const handleRemoveAttachment = (index) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  const handleChatMember = (mem_id, receiver_id) => {
    setActiveMember(mem_id);
    setReceiverId(receiver_id);
  };


  const ENDPOINT = "https://comdocks.com:3002";
  const socket = socketIOClient(ENDPOINT);
  const sendMessage = (e) => {
    e.preventDefault();
    let userToken = localStorage.getItem("authToken");
    let msgData = {
      message: message,
      userToken,
      attachments: attachmentsName,
      receiverId
    };
    let sent = null;
    socket.emit("send-message", msgData, (responseData) => {
      console.log('response');

      let newChat = this.state.chat.concat(responseData[0]);
      let newAttachments = [];
      this.setState({
        chat: newChat,
        message: "",
        attachment: newAttachments
      }, function () {
        console.log(this.state);
      });

      // var myDiv = document.getElementById("chat-messages");
      // myDiv.scrollTop = myDiv.scrollHeight;
    });

    console.log('here');






    // let userToken = localStorage.getItem("authToken");
    // if (message == '' && attachments.length == 0) {
    //   return;
    // }
    // let data = {
    //   message,
    //   userToken,
    //   attachments: attachmentsName,
    //   receiverId
    // }
    // console.log(data);
  };

  return (
    <>
      <HeaderLogged />
      <main common="" inbox="">
        <div className="contain-fluid">
          <div className="barBlk relative">
            <div className="srch relative">
              <input type="text" className="txtBox" placeholder="Search contact" />
              <button type="button"><img src="/images/search.svg" alt="" /></button>
            </div>
            <ul className="frnds scrollbar">
              {members?.map((member, index) => {
                return (
                  <li data-chat="person1"
                    className={activeMember == member.mem_id ? 'active' : ''}
                    onClick={() => handleChatMember(member.mem_id, member.mem_auth_token)}
                  >
                    <div className="inner sms">
                      <div className="ico">
                        <ImageControl isThumb={true} folder="members" src={member.mem_image ? member.mem_image : ''} />
                      </div>
                      <div className="txt">
                        <h5>{member.mem_fname} {member.mem_lname}</h5>
                        <p>Welcome to Ticket Graze</p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
          {receiverId && (
            <div className="chatBlk relative">
              <div className="chatPerson">
                <div className="backBtn"><a href="javascript:void(0)" className="fi-arrow-left" /></div>
                <div className="ico"><img src="/images/1.png" alt="" /></div>
                <h6>Samantha James</h6>
              </div>
              <div className="chat scrollbar active" data-chat="person1">
                <div className="buble you">
                  <div className="ico"><img src="/images/2.png" alt="" /></div>
                  <div className="txt">
                    <div className="time">11:59 am</div>
                    <div className="cntnt">Hello</div>
                  </div>
                </div>
                <div className="buble me">
                  <div className="ico"><img src="/images/1.png" alt="" /></div>
                  <div className="txt">
                    <div className="time">11:59 am</div>
                    <div className="cntnt">it's me.</div>
                  </div>
                </div>
                <div className="buble you">
                  <div className="ico"><img src="/images/2.png" alt="" /></div>
                  <div className="txt">
                    <div className="time">11:59 am</div>
                    <div className="cntnt">I was wondering...</div>
                  </div>
                </div>
                <div className="buble you">
                  <div className="ico"><img src="/images/1.png" alt="" /></div>
                  <div className="txt">
                    <div className="time">11:59 am</div>
                    <div className="cntnt">
                      Lorem ipsum sit amen dolor, lorem ipsum sit amen dolor?
                    </div>
                  </div>
                </div>
                <div className="buble me">
                  <div className="ico"><img src="/images/2.png" alt="" /></div>
                  <div className="txt">
                    <div className="time">11:59 am</div>
                    <div className="cntnt">About who we used to be. </div>
                  </div>
                </div>
                <div className="buble you">
                  <div className="ico"><img src="/images/1.png" alt="" /></div>
                  <div className="txt">
                    <div className="time">11:59 am</div>
                    <div className="cntnt">Hello, can you hear me? </div>
                  </div>
                </div>
                <div className="buble you">
                  <div className="ico"><img src="/images/2.png" alt="" /></div>
                  <div className="txt">
                    <div className="time">11:59 am</div>
                    <div className="cntnt">I'm in California dreaming </div>
                  </div>
                </div>
              </div>
              <div className="write">
                <form className="relative" onSubmit={sendMessage}>
                  <textarea className="txtBox" placeholder="Type a message" value={message} onChange={(e) => setMessage(e.target.value)} />

                  <div className="btm">
                    <div className="attachments_sec">
                      <button type="button" className="webBtn smBtn labelBtn arrowBtn upBtn" title="Upload Files" onClick={handleFiles}><img src="/images/clip.png" alt="" /></button>
                      {attachments.length > 0 && (
                        <div className="attachments">
                          {attachments.map((attachment, index) => (
                            <div className="attachment" key={index}>
                              <span>{attachment.name}</span>
                              <i className="fa fa-times-circle remove" aria-hidden="true" onClick={() => handleRemoveAttachment(index)}></i>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <button type="submit" className="webBtn smBtn labelBtn icoBtn">Send <img src="/images/message.png" alt="" /></button>
                    <input
                      type="file"
                      name="attachments"
                      ref={attachmentRef}
                      className="hidden"
                      onChange={handleSelectAttachment}
                      multiple
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default CandidateChat;
