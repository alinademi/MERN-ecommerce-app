import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className="card  rounded-0">
        <h4 className="card-header  rounded-0">Admin Links</h4>
        <ul className="list-group border-0">
          <li className="list-group-item  rounded-0">
            <Link className="nav-link" to="/create/category">
              Create Category
            </Link>
          </li>
          <li className="list-group-item rounded-0">
            <Link className="nav-link" to="/create/product">
              Create Product
            </Link>
          </li>
          <li className="list-group-item rounded-0">
            <Link className="nav-link" to="/admin/orders">
              View Orders
            </Link>
          </li>
          <li className="list-group-item rounded-0">
            <Link className="nav-link" to="/admin/products">
              Manage Products
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card mb-5 rounded-0">
        <h3 className="card-header rounded-0">User Information</h3>
        <ul className="list-group rounded-0">
          <li className="list-group-item border-0">{name}</li>
          <li className="list-group-item border-0">{email}</li>
          <li className="list-group-item border-0">
            {role === 1 ? "Admin" : "Registered User"}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="Dashboard"
      description={`Welcome ${name}!`}
      className="container mb-5 mt-5"
    >
      <div className="row mt-5 mb-5">
        <div className="col-3">{adminLinks()}</div>
        <div className="col-9">{adminInfo()}</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
