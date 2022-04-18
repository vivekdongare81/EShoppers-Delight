import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "",
  className = " text-white p-4",
  children
}) => (
  <div>
    <Menu />
    <div className="container-fluid mt-5">
      <div className="jumbotron  bg-dark text-white text-center pt-4">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
  
{/* <footer class="bg-dark p-4 text-white text-center">
  <small>(c) 2020 Written by Simon Köhler in Panama</small>
  <div class="icons">
      <a href="https://simon-koehler.com/en" target="_blank">
            <i class="fa fa-globe"></i>
          </a>
      <a href="https://www.linkedin.com/in/typo3-freelancer/" target="_blank">
            <i class="fab fa-linkedin"></i>
          </a>
      <a href="https://typo3.com/partners/professional-service-listing/detail/typo3-freelancer" target="_blank">
            <i class="fab fa-typo3"></i>
          </a>
      <a href="https://instagram.com/typo3freelancer" target="_blank">
            <i class="fab fa-instagram"></i>
          </a>
      <a href="https://github.com/koehlersimon/" target="_blank">
            <i class="fab fa-github"></i>
          </a>
      <a href="https://www.youtube.com/channel/UC_PtQESDvj-GZNeo9LarRuA?view_as=subscriber" target="_blank">
            <i class="fab fa-youtube"></i>
          </a>
    </div>
</footer> */}
  </div>
);

export default Base;
