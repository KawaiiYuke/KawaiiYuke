import React from "react";
import "./css/AboutUs.css";

export default function AboutUs() {
  return (
    <div className="about-us">
      <div>
        <div class="about-section">
          <h1>About Us</h1>
        </div>

        {/* <h2 style="text-align:center">Our Team</h2> */}
        <div class="row">
          <div class="column">
            <div className="each-dev">
              {/* <img src="/w3images/team1.jpg" alt="Jane" style="width:100%"> */}
              <div class="container">
                <h2 style={{ paddingTop: "0.3em" }}>Mike Ross</h2>
                <p class="title">Art Director</p>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                <p style={{ paddingBottom: "0.7em" }}>mike@example.com</p>
              </div>
            </div>
          </div>

          <div class="column">
            <div className="each-dev">
              {/* <img src="/w3images/team2.jpg" alt="Mike" style="width:100%"> */}
              <div class="container">
                <h2 style={{ paddingTop: "0.3em" }}>Mike Ross</h2>
                <p class="title">Art Director</p>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                <p style={{ paddingBottom: "0.7em" }}>mike@example.com</p>
              </div>
            </div>
          </div>

          <div class="column">
            <div className="each-dev">
              {/* <img src="/w3images/team3.jpg" alt="John" style="width:100%"> */}
              <div class="container">
                <h2 style={{ paddingTop: "0.3em" }}>Mike Ross</h2>
                <p class="title">Art Director</p>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                <p style={{ paddingBottom: "0.7em" }}>mike@example.com</p>
              </div>
            </div>
          </div>

          <div class="column">
            <div className="each-dev">
              {/* <img src="/w3images/team3.jpg" alt="John" style="width:100%"> */}
              <div class="container">
                <h2 style={{ paddingTop: "0.3em" }}>Mike Ross</h2>
                <p class="title">Art Director</p>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                <p style={{ paddingBottom: "0.7em" }}>mike@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
