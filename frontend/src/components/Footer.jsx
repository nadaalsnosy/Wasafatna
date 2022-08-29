import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

import { faPinterest } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="footerLight centeringBody grayBoderTop">
      <div className="d-flex justify-content-between">
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <FontAwesomeIcon className="footerIcons" icon={faFacebookF} />
        </a>
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <FontAwesomeIcon className="footerIcons" icon={faTwitter} />
        </a>
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <FontAwesomeIcon className="footerIcons" icon={faLinkedinIn} />
        </a>
        <a
          href="https://www.pinterest.com/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <FontAwesomeIcon className="footerIcons" icon={faPinterest} />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <FontAwesomeIcon className="footerIcons" icon={faInstagram} />
        </a>
      </div>
      <p className="text-success opacity-50 fs-6 mt-3">© 2022 ITI Netflix Project</p>
    </div>
  );
};

export default Footer;
