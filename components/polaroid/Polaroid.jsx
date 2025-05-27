import React from 'react';
import PropTypes from 'prop-types';
import './Polaroid.css';

const Polaroid = ({ text, image, rotation = 0, style = {}, className = "" }) => {
  const combinedStyle = {
    ...style,
    '--polaroidRotation': `${rotation}deg`,
  };

  // Combine the default "polaroid" class with any additional className passed
  const combinedClassName = `polaroid ${className}`.trim();

  return (
    <div className={combinedClassName} style={combinedStyle}>
      <img src={image} alt={text} className="polaroid-image" />
      <div className="polaroid-caption">{text}</div>
    </div>
  );
};

Polaroid.propTypes = {
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  rotation: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default Polaroid;
