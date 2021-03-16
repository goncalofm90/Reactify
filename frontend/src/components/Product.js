import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      {/* image */}
      <a href={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </a>

      {/* name */}
      <Card.Body>
        <a href={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </a>

        {/* rating */}
        <Card.Text as="div">
          <div className="my-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </div>
        </Card.Text>

        {/* price */}
        <Card.Text as="h5">
          <div className="my-3">${product.price}</div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
