import React from "react";
import { Link } from "react-router-dom";
import Placeholder from "../assets/images/square-balance.webp";

const Footer = () => {
  return (
    <>
      <footer className="site-footer custom-border-top">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
              <h3 className="footer-heading mb-4">Stories</h3>
              <Link to="#" className="block-6">
                <img
                  src={Placeholder}
                  alt="placeholder"
                  className="img-fluid rounded mb-4"
                />
                <h3 className="font-weight-light  mb-0">
                  Amazing sound, everywhere you go
                </h3>
                <p>Read more...</p>
              </Link>
            </div>
            <div className="col-lg-5 ml-auto mb-5 mb-lg-0">
              <div className="row">
                <div className="col-md-12">
                  <h3 className="footer-heading mb-4">Quick Links</h3>
                </div>
                <div className="col-md-6 col-lg-4">
                  <ul className="list-unstyled">
                    <li>
                      <Link to="#">Experience in store</Link>
                    </li>
                    <li>
                      <Link to="#">Our journey</Link>
                    </li>
                    <li>
                      <Link to="#">Shopping cart</Link>
                    </li>
                    <li>
                      <Link to="#">Students</Link>
                    </li>
                    <li>
                      <Link to="#">Technical support</Link>
                    </li>
                    <li>
                      <Link to="#">Trade-in programme</Link>
                    </li>
                    <li>
                      <Link to="#">Environment</Link>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6 col-lg-4">
                  <ul className="list-unstyled">
                    <li>
                      <Link to="#">Speakers</Link>
                    </li>
                    <li>
                      <Link to="#">Headphones</Link>
                    </li>
                    <li>
                      <Link to="#">Televisions</Link>
                    </li>
                    <li>
                      <Link to="#">Accessories</Link>
                    </li>
                    <li>
                      <Link to="#">Mix and match</Link>
                    </li>
                    <li>
                      <Link to="#">Packages</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="block-5 mb-5">
                <h3 className="footer-heading mb-4">Contact Info</h3>
                <ul className="list-unstyled">
                  <li className="address">
                    <Link>
                      203 SomeSt. Mountain View, Vancouver, BC, Canada
                    </Link>
                  </li>
                  <li className="phone">
                    <Link to="tel://23923929210">+2 604 3929 210</Link>
                  </li>
                  <li className="email">
                    <Link> support@bandoshop.com </Link>
                  </li>
                </ul>
              </div>
              <div className="block-7">
                <form action="#" method="post">
                  <label htmlFor="email_subscribe" className="footer-heading">
                    Subscribe
                  </label>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control py-4"
                      id="email_subscribe"
                      placeholder="Email"
                    />
                    <input
                      type="submit"
                      className="btn btn-primary rounded-0"
                      defaultValue="Send"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="row pt-5 mt-5 text-center">
            <div className="col-md-12">
              <p>
                <Link to="/" className="text-primary">
                  Copyright ©2020 All rights reserved | B&O Shop
                </Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
