import React from "react";
import Menu from "./Menu";

import Footer from "./Footer";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => (
  <>
    <Menu />
    <div>
      <div className="container">
        <h2>{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <Footer />
  </>
);

export default Layout;
