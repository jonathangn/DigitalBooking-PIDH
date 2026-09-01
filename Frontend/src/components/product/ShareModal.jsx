import { useState } from 'react';
import { BsShare } from 'react-icons/bs';
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

function ShareModal() {
  const [active, setActive] = useState(false);
  const toggle = () => setActive(!active);
  const pageURL = window.location.href;

  return (
    <>
      <div className="share-social-media">
        <BsShare onClick={toggle} />
      </div>

      {active && (
        <div className="modal-background-sm">
          <div className="modal-container-sm">
            <div className="modal-header">
              <h1>¡Compartí en tus redes sociales!</h1>
              <button onClick={toggle}> X </button>
            </div>
            <div className="body-modal">
              <FacebookShareButton url={pageURL} quote="Compartí en Facebook">
                <FacebookIcon size={45} round />
              </FacebookShareButton>
              <WhatsappShareButton url={pageURL}>
                <WhatsappIcon size={45} round />
              </WhatsappShareButton>
              <TwitterShareButton url={pageURL}>
                <TwitterIcon size={45} round />
              </TwitterShareButton>
              <TelegramShareButton url={pageURL}>
                <TelegramIcon size={45} round />
              </TelegramShareButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ShareModal;