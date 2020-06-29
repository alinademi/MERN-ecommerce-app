import React from "react";
import { Link } from "react-router-dom";
import Model from "../assets/images/BS_1_SBI_2.webp";

const Hero = () => {
  return (
    <section className="site-blocks-cover">
      <div className="container">
        <div className="row">
          <div className="col-md-6 ml-auto order-md-2">
            <div className="site-block-cover-content">
              <h2 className="sub-title">
                #GET UP TO 15% OFF YOUR HOME SPEAKER SYSTEM
              </h2>
              <h1 className="text-brown">Your home. Your music. Your way.</h1>
              <p>
                <Link to="/shop" className="btn btn-black bg-brown rounded-0">
                  Shop Now
                </Link>
              </p>
            </div>
          </div>
          <div className="col-md-6 order-1 align-self-end">
            <img src={Model} alt="model" className="img-fluid" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
