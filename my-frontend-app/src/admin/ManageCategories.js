import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getCategories } from "./helper/adminapicall";
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAutheticated();

  const preload = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-3">All products:</h2>
      <Link className="btn  bg-dark" to={`/admin/dashboard`}>
        <span className=" bg-dark purpColor">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-4">Total <span className="text-muted">{categories.length} </span> categories</h2>

          {categories.map((category, index) => {
            return (
              
              <div className="row text-center mb-2 ">
                <div className="col-12">
                 <h3 className="text-white" key={index}>
                {category.name}
              </h3>
              </div>
              {/* <div className="col-6">
              <DeleteForeverSharpIcon className="text-danger" />
              </div> */}
            </div>
            );
          })}
          
        </div>
      </div>
    </Base>
  );
};

export default ManageCategories;
