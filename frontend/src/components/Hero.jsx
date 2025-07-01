import React from "react";
import hero from "../images/hero.png";
const Hero = () => {
  return (
    <>
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src="https://img.freepik.com/premium-vector/professional-woman-flat-tech-vector-illustration-white-background_1322560-66972.jpg?w=1060"
              className="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              width="800"
              height="500"
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <h2 className="display-5 fw-bold lh-1 mb-3">
              Welcome to<span className="sp-text"> InsightSphere</span> </h2>
              <h4>where technology meets personal experiences! 🚀</h4>
            
            <p className="lead">
              Here, I share my journey through coding, innovative projects, and
              real-life lessons. Whether it’s breaking down complex tech
              concepts, discussing the latest trends, or reflecting on
              achievements and challenges, this blog is a blend of knowledge and
              inspiration!
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <a href="#blog"><button
                type="button"
                className=" btnNormal btn btn-lg px-4 me-md-2"
              >
                Get Started
              </button></a>
              <button
                type="button"
                className=" btnWhite btn btn-lg px-4 me-md-2"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
  </>
  );
};

export default Hero;
