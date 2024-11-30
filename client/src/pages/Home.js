import React from "react";
import style from "../styles/home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className={style.homePage} id="wrapper">
      <div className={style.content} id="content">
        <h2>Choose a Service</h2>
        <div className={style.services}>
          <div className={style.service}>
            <Link to={"/taxfile"}>
              <h3>Tax Filing →</h3>
              <p>
                Streamline tax return with easy, up-to-date rules, maximum tax
                savings, and expert support all in one platform.
              </p>
            </Link>
          </div>
          <div className={style.service}>
            <Link to={"#"}>
              <h3>Book a Lawyer →</h3>
              <p>Book a consultation with our lawyer.</p>
            </Link>
          </div>
          <div className={style.service}>
            <Link to={"#"}>
              <h3>Corporate Tax →</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Dolores at molestiae ipsam voluptatibus, possimus eveniet.
              </p>
            </Link>
          </div>
          <div className={style.service}>
            <Link to={"/taxcalc"}>
              <h3>Tax Calculator →</h3>
              <p>
                Simply input your details, and let our AI-powered tax calculator
                give you instant tax estimates.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
