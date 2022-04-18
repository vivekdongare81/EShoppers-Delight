import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAutheticated, signout } from "../auth/helper/index";
import Button from '@mui/material/Button'; 

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return "outlined";
  } else {
    return ;
  }
};

const Menu = ({ history }) => (
  <div >
  <nav class="navbar navbar-expand-lg navbar-dark myDarkBg p-2">
  <div class="container-fluid">
    
    <a class="navbar-brand mx-3 py-3 px-5  text-white cursiveFont" href="/">EShoppers Delight</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
    <ul className=" navbar-nav me-auto justify-content-center ">
      <li className="nav-item">
        <Link className="nav-link" to="/">
        <Button color="secondary" variant={currentTab(history, "/")} >Home</Button>
        </Link>
      </li>
     
      <li  className="nav-item">
        <Link
          className="nav-link"
          to="/cart"
        >
        <Button color="secondary" variant={currentTab(history, "/cart")} >Cart</Button>
        </Link>
      </li>
      { isAutheticated() && (
      <li className="nav-item">
        <Link
          className="nav-link"
          to="/user/dashboard"
        >
         <Button color="secondary" variant={currentTab(history, "/user/dashboard")} >Dashboard</Button>
        </Link>
      </li> ) }
      { isAutheticated() &&  isAutheticated().user.role === 1 && (
      <li className="nav-item">
        <Link
          className="nav-link"
          to="/admin/dashboard"
        >
        <Button color="secondary" variant={currentTab(history, "/admin/dashboard")}>admin dashboard</Button>
        </Link>
      </li> )}
      {!isAutheticated() && (
      <li className="nav-item">
        <Link
          className="nav-link"
          to="/signup"
        >
           <Button color="secondary" variant={currentTab(history, "/signup")} >Register</Button>
        </Link>
      </li> ) }
      {!isAutheticated() && (
      <li className="nav-item">
        <Link
          className="nav-link"
          to="/signin"
        >
         <Button color="secondary" variant={currentTab(history, "/signin")} >Sign in</Button>
        </Link>
         </li>)}
            {/* Conditional Render + signout and Redirect on Home Page   */}
    </ul>
      <form class="d-flex">
      {isAutheticated() && (
        <li className="nav-item d-flex right">
          <span
            className="nav-link text-warning"
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
           <Button color="error">Logout</Button>
          </span>
        </li>
    )}
      </form>
    </div>
  </div>
</nav>
  </div>
);
const withRouterr =   withRouter(Menu);
export default withRouterr;
