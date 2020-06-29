import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
// import Sand from "./Sand";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#8d5f3c", textDecoration: "underline" };
  } else {
    return { color: "#000000" };
  }
};

const Menu = ({ history }) => (
  <>
    <div className="site-navbar bg-white py-2 ">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <div className="logo">
            <div className="site-logo">
              <Link to="/" className="">
                B&o shop
              </Link>
            </div>
          </div>
          <div className="main-nav d-none d-lg-block">
            <nav
              className="site-navigation text-right text-md-center"
              role="navigation"
            >
              <ul className="site-menu d-none d-lg-block">
                <li>
                  <Link className="" style={isActive(history, "/")} to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link style={isActive(history, "/shop")} to="/shop">
                    Shop
                  </Link>
                </li>

                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                  <li>
                    <Link
                      style={isActive(history, "/user/dashboard")}
                      to="/user/dashboard"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}

                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                  <li>
                    <Link
                      style={isActive(history, "/admin/dashboard")}
                      to="/admin/dashboard"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}

                <li>
                  <Link to="contact.html">Contact</Link>
                </li>
                <li>
                  <Link to="contact.html">Who we are</Link>
                </li>
                {!isAuthenticated() && (
                  <>
                    <li>
                      <Link style={isActive(history, "/signin")} to="/signin">
                        Signin
                      </Link>
                    </li>

                    <li>
                      <Link style={isActive(history, "/signup")} to="/signup">
                        Signup
                      </Link>
                    </li>
                  </>
                )}
                {isAuthenticated() && (
                  <li>
                    <span
                      style={{ cursor: "pointer", color: "#000000" }}
                      onClick={() =>
                        signout(() => {
                          history.push("/");
                        })
                      }
                    >
                      Signout
                    </span>
                  </li>
                )}
              </ul>
            </nav>
          </div>
          <div className="icons">
            <Link to="#" className="icons-btn d-inline-block">
              <span className="icon-user-o" />
            </Link>

            <Link
              className="icons-btn d-inline-block bag"
              style={isActive(history, "/cart")}
              to="/cart"
            >
              <span className="icon-shopping-bag" />
              <span className="number">{itemTotal()}</span>
            </Link>

            <Link
              to="#"
              className="site-menu-toggle ml-3 d-inline-block d-lg-none"
            >
              <span className="icon-menu" />
            </Link>
          </div>
        </div>
      </div>
    </div>
    {/* <Sand /> */}
  </>
);

export default withRouter(Menu);
