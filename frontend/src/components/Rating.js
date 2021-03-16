import React from "react";
import PropTypes from "prop-types";

const Rating = ({ value, text, color }) => {
  return (
    <div className="rating">
      <span>
        {/* Star Logic, show number of stars depending on rating */}
        {[1, 2, 3, 4, 5].map((index) => (
          <i
            style={{ color }}
            className={
              value >= index
                ? "fas fa-star" //full star
                : value >= index - 0.5
                ? "fas fa-star-half-alt" //half star
                : "far fa-star" //empty star
            }
          ></i>
        ))}
      </span>
      <span>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: "#eb6864",
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Rating;
