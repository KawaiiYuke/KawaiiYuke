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
                <h2 style={{ paddingTop: "0.3em" }}>Hang Yu</h2>
                <p class="title">Developer</p>
                <p>
                  Hang started out as a graphic designer and am looking for
                  other collaboration and innovation areas. She found software
                  development exciting and wanted to learn how to build
                  applications. Hang looks forward to building applications in a
                  cooperative and creative environment.
                </p>
                <p style={{ paddingBottom: "0.7em" }}>mike@example.com</p>
              </div>
            </div>
          </div>

          <div class="column">
            <div className="each-dev">
              {/* <img src="/w3images/team2.jpg" alt="Mike" style="width:100%"> */}
              <div class="container">
                <h2 style={{ paddingTop: "0.3em" }}>Wei Liu</h2>
                <p class="title">Developer</p>
                <p>
                  Passionate Full Stack Developer with double majoring in
                  Technical Systems Management and Applied Mathematics and over
                  6 years of excellent customer service experience, designs,
                  develops, and implements applications using a range of
                  technologies and programming languages. Seeking to leverage
                  broad development experience and hands-on technical expertise
                  in a challenging role as a Full-stack Developer.
                </p>
                <p style={{ paddingBottom: "0.7em" }}>mike@example.com</p>
              </div>
            </div>
          </div>

          <div class="column">
            <div className="each-dev">
              {/* <img src="/w3images/team3.jpg" alt="John" style="width:100%"> */}
              <div class="container">
                <h2 style={{ paddingTop: "0.3em" }}>Yuki Mei</h2>
                <p class="title">Developer</p>
                <p>
                  Yuki is a pharmacist who is aspiring to become a software
                  engineer! As fulfilling as it was guiding patients to live
                  healthier lives, she felt a bigger impact could be made by
                  working behind the scenes to improve or create
                  tools/interfaces and provide better technological solutions to
                  be used. Yuki is always motivated to learn and grow more in
                  her career.
                </p>
                <p style={{ paddingBottom: "0.7em" }}>mike@example.com</p>
              </div>
            </div>
          </div>

          <div class="column">
            <div className="each-dev">
              {/* <img src="/w3images/team3.jpg" alt="John" style="width:100%"> */}
              <div class="container">
                <h2 style={{ paddingTop: "0.3em" }}>Yuri Yoo</h2>
                <p class="title">Devloper</p>
                <p>
                  Yuri is a former dancer who is passionate about solving
                  problems and being creative. She is excited to start her
                  journey as a software developer and making global impacts with
                  technology.
                </p>
                <p style={{ paddingBottom: "0.7em" }}>mike@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
