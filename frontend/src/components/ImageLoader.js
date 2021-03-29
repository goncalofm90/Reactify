import React from "react";
import { Spinner } from "react-bootstrap";

const ImageLoader = () => {
  return (
    <div style={{ width: "10%", margin: "auto" }}>
      <Spinner
        animation="spinner"
        variant="primary"
        role="status"
        style={{
          width: "6px",
          height: "6px",
          margin: "2px",
          padding: "2px",
          display: "inline-block",
        }}
      >
        <span className="sr-only">loading image...</span>
      </Spinner>
    </div>
  );
};

export default ImageLoader;
