import React, { useState } from 'react';
import CopyToClipboard from "react-copy-to-clipboard";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon, TelegramShareButton, TelegramIcon } from 'react-share';

const JobShareModel = ({ setOpen, link }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 4000);
    };

    return (
        <>
            <div className="popup-modal-body">
                <div className="popup_modal">
                    <div className="cross-icon" >
                        <i className="fi fi-rr-cross" onClick={() => setOpen(false)} />
                    </div>
                    <div className="modal-body">
                        <h4>Share this job</h4>
                        <div className="share_link">
                            <input type="text" readOnly value={link} />
                            <CopyToClipboard text={link}>
                                <button className="btn btn-primary" onClick={handleCopy}>
                                    {copied ? 'Copied' : 'Copy'}
                                </button>
                            </CopyToClipboard>
                        </div>
                        <div className='social-links'>
                            <FacebookShareButton
                                url={link}
                                quote={'Dummy text!'}
                                hashtag="#muo"
                            >
                                <FacebookIcon size={32} round />
                            </FacebookShareButton>
                            <TwitterShareButton
                                url={link}
                                quote={'Dummy text!'}
                                hashtag="#muo"
                            >
                                <TwitterIcon size={32} round />
                            </TwitterShareButton>
                            <LinkedinShareButton
                                url={link}
                                quote={'Dummy text!'}
                                hashtag="#muo"
                            >
                                <LinkedinIcon size={32} round />
                            </LinkedinShareButton>
                            <TelegramShareButton
                                url={link}
                                quote={'Dummy text!'}
                                hashtag="#muo"
                            >
                                <TelegramIcon size={32} round />
                            </TelegramShareButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JobShareModel
