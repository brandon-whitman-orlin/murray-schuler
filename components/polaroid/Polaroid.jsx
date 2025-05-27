import React from "react";
import PropTypes from "prop-types";
import MobileDetect from "mobile-detect";

import "./Polaroid.css";

import { ReactComponent as Share } from "../../assets/icons/share.svg";
import { ReactComponent as Download } from "../../assets/icons/download.svg";

const Polaroid = ({
  text,
  image,
  rotation = 0,
  style = {},
  className = "",
  active = false,
}) => {
  const combinedStyle = {
    ...style,
    "--polaroidRotation": `${rotation}deg`,
  };

  const combinedClassName = `polaroid ${className}`.trim();

  const handleDownload = () => {
    const md = new MobileDetect(window.navigator.userAgent);

    if (md.mobile()) {
      // Open in new tab for manual saving on mobile
      window.open(image, "_blank");
    } else {
      // Desktop download
      const link = document.createElement("a");
      link.href = image;
      link.download = image.split("/").pop() || "image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: text,
          text: `Check out this photo: ${text}`,
          url: image,
        });
      } else {
        alert("Web Share API is not supported in this browser.");
      }
    } catch (error) {
      console.error("Sharing failed:", error);
    }
  };

  return (
    <div className={combinedClassName} style={combinedStyle}>
      <img src={image} alt={text} className="polaroid-image" />
      {active ? (
        <div className="polaroid-info">
          <button
            className="polaroid-icon"
            id="share-button"
            onClick={handleShare}
          >
            <Share />
          </button>
          <div className="polaroid-caption">{text}</div>
          <button
            className="polaroid-icon"
            id="download-button"
            onClick={handleDownload}
          >
            <Download />
          </button>
        </div>
      ) : (
        <div className="polaroid-caption">{text}</div>
      )}
    </div>
  );
};

Polaroid.propTypes = {
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  rotation: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
  active: PropTypes.bool,
};

export default Polaroid;
