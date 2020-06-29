import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url }) => (
  <img
    src={`${API}/${url}/photo/${item._id}`}
    alt={item.name}
    className="img-responsive"
    style={{
      maxHeight: "100vh",
      maxWidth: "100vh",
      width: "100%",
      height: "100%",
      overflow: "none",
    }}
  />
);

export default ShowImage;
