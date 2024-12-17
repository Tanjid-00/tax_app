import React from "react";
import style from "../styles/home.module.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className={style.homePage} id="wrapper">
      <div className={style.content} id="content">
        <h2>Choose a Service</h2>
        <div className={style.services}>
          <div className={style.service}>
            <Link to={"/users"}>
              <h3>User Management →</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus, voluptates. Quibusdam ullam tempore sed ad.
              </p>
            </Link>
          </div>
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
              <h3>Corporate Tax →</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Dolores at molestiae ipsam voluptatibus, possimus eveniet.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
