import React from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import SecurityTwoToneIcon from '@mui/icons-material/SecurityTwoTone';

const AdminDashBoard = () => {
  const {
    user: { name, email, role }
  } = isAutheticated();

  const adminLeftSide = () => {
    return (
      <div className="car border rounded-top text-center">
        <h4 className="card-header bg-dark text-white r">
          <span>< SecurityTwoToneIcon style={{height:"150px",width:"150px"}} /></span> <br></br>
        <span className="purpColor"> Admin Navigation</span> </h4>
        <ul className="list-group">
        <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-success">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-success">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-success">
              Create Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/manage/categories" className="nav-link text-success">
              Manage Category
            </Link>
          </li>
         
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="container mb-4">
        <h4 className="card-header purpColor ">Admin Information</h4>
        <ul className="list-group ">
          <li className="list-group-item">
            <span className="badge  bg-dark badge-success mr-2">Name:</span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge bg-dark badge-success mr-2">Email:</span> {email}
          </li>
          <li className="list-group-item">
            <span className="badge  bg-primary badge-danger">Admin Area</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welcome to admin area"
      description="Manage all of your products here"
      className="container p-4 "
    >
      <div className="row">
        <div className="col-6">{adminRightSide()}</div>
        <div className="col-4">{adminLeftSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
