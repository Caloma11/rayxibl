import React, { useEffect, useState } from "react";
import {
  WhatsappShareButton,
  FacebookShareButton,
  FacebookMessengerShareButton
} from "react-share";
import ReactDOM from "react-dom";
import { FacebookMessengerIcon, WhatsappIcon, FacebookIcon } from "react-share";
import Clipboard from "./Clipboard";
import CloseIcon from "../images/gray-cross.svg";
import Share from "../images/share.svg";

const ShareModal = () => {
  const [copied, setCopied] = useState(false);
  const [mount, setMount] = useState(false);
  const [data, setData] = useState({});
  const [showLink, setShowLinks] = useState(false);

  const url = data => {
    return data.url
      ? data.url
      : "https://www.flxibl.io";
  };

  const buildData = () => {
    const element = document.querySelector(".share-link");
    data.title = element.dataset.title;
    data.text = element.dataset.text;
    data.url = element.dataset.url;
  }

  const copyLink = async () => {
    if ("clipboard" in navigator) {
      setCopied(true);
      await navigator.clipboard.writeText(url(data));
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    }
  };

  const handleClick = () => {
    setShowLinks(true);
  };

  const checkMobile = () => {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  };


  const initMobileShareButtons = (data) => {
    const element = document.querySelector(".share-link");
    element.addEventListener('click', async (e) => {
      e.preventDefault();
        if (checkMobile()) {
          if (navigator.share) {
            navigator.share({
              title: data.title,
              text: data.tile, // Had to use title here for some reason
              url: data.url
            });
          } else {
            setShowLinks(true);
          }
        } else {
          setShowLinks(true);
        }
    })
  }

  useEffect(() => {
    if (mount) return;
    setMount(true);
    buildData();
    initMobileShareButtons(data);
  }, []);


  return (
     <div id="socialButtons">
      {showLink ? (
        <div className={`linkModalBg`}>
          <div className="linkModal">
            <div className="shareLinks">
              <FacebookShareButton
                className="shareBtn"
                title={data.title}
                url={data.url}
                quote={data.title}
              >
                <FacebookIcon size={32} round={true} />
                Share on Facebook
              </FacebookShareButton>
              <WhatsappShareButton
                className="shareBtn"
                url={data.url}
                title={data.title}
                quote={data.title}
              >
                <WhatsappIcon size={32} round={true} />
                Share on WhatsApp
              </WhatsappShareButton>
              <button
                className="react-share__ShareButton shareBtn copyLink"
                onClick={copyLink}
              >
                <Clipboard />
                {copied ? "URL copied" : "Copy Link"}
              </button>
            </div>
            <img
              className="closeIcon"
              src={CloseIcon}
              onClick={() => setShowLinks(prevState => !prevState)}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

ReactDOM.render(<ShareModal />, document.querySelector(".shareModalContainer"));
