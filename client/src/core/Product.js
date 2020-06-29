import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <>
      <Layout
        title={product && product.name}
        description={
          product &&
          product.description &&
          product.description.substring(0, 100)
        }
        className="container"
      >
        <div className="row product-page__product-wrapper">
          <div className="single-product-wrapper">
            {product && product.description && (
              <Card product={product} showViewProductButton={false} />
            )}
          </div>

          <div className="row related-products-wrapper mt-5">
            <h4 className="mt-5">Related products</h4>

            {relatedProduct.map((p, i) => (
              <div className="col-md-3 col-sm-6 mb-4">
                <Card key={i} product={p} />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Product;
