import React from "react";
import { Link } from "react-router-dom";

const Sand = () => {
  return (
    <div className="site-navbar bg-white py-2">
      <div className="search-wrap">
        <div className="container">
          <Link to="#" className="search-close js-search-close">
            <span className="icon-close2" />
          </Link>
          <form action="#" method="post">
            <input
              type="text"
              className="form-control"
              placeholder="Search keyword and hit enter..."
            />
          </form>
        </div>
      </div>
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <div className="logo">
            <div className="site-logo">
              <Link to="index.html" className="js-logo-clone">
                ShopMax
              </Link>
            </div>
          </div>
          <div className="main-nav d-none d-lg-block">
            <nav
              className="site-navigation text-right text-md-center"
              role="navigation"
            >
              <ul className="site-menu js-clone-nav d-none d-lg-block">
                <li>
                  <Link to="shop.html">Shop</Link>
                </li>
                <li>
                  <Link to="#">Catalogue</Link>
                </li>
                <li>
                  <Link to="#">New Arrivals</Link>
                </li>
                <li>
                  <Link to="contact.html">Contact</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="icons">
            <Link to="#" className="icons-btn d-inline-block js-search-open">
              <span className="icon-search" />
            </Link>
            <Link to="#" className="icons-btn d-inline-block">
              <span className="icon-heart-o" />
            </Link>
            <Link to="cart.html" className="icons-btn d-inline-block bag">
              <span className="icon-shopping-bag" />
              <span className="number">2</span>
            </Link>
            <Link
              to="#"
              className="site-menu-toggle js-menu-toggle ml-3 d-inline-block d-lg-none"
            >
              <span className="icon-menu" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sand;
