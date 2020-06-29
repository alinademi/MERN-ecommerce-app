import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";
import Hero from "./Hero";
import Menu from "./Menu";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <>
      <Menu />
      <Hero />
      <Layout title="" description="" className="site-section">
        <Search />
        <div className="site-section">
          <div className="container">
            <div className="row">
              <div className="title-section  col-12">
                <h2 className="text-uppercase">New Arrivals</h2>
              </div>
            </div>
            <hr />
            <div className="row">
              {productsByArrival.map((product, i) => (
                <div key={i} className="col-lg-4 col-md-6 item-entry mb-4">
                  <Card product={product} />
                </div>
              ))}
            </div>

            <div className="row">
              <div className="title-section best-sellers col-12">
                <h2 className="text-uppercase">Best Sellers</h2>
              </div>
            </div>
            <hr />
            <div className="row">
              {productsBySell.map((product, i) => (
                <div key={i} className="col-lg-4 col-md-6 item-entry mb-4">
                  <Card product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
