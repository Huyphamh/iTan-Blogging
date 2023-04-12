import React from "react";
import styled from "styled-components";
import Button from "../../components/button/Button";

const HomeBannerStyles = styled.div`
  min-height: 520px;
  padding: 40px 0;
  margin-bottom: 20px;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .banner-content {
    max-width: 400px;
    color: white;
  }
  .banner-heading {
    font-size: 36px;
    margin-bottom: 20px;
  }
  .banner-desc {
    line-height: 1.75;
    margin-bottom: 40px;
  }
`;
const HomeBanner = () => {
  return (
    <HomeBannerStyles>
      <div className="container">
        <div className="banner">
          <div className="banner-content">
            <h1 className="banner-heading">iTan Blogging</h1>
            <p className="banner-desc">
              Hi, I am Huy Pham - A front-end developer base in Vietnam. Here is
              my Blogging Project, you can post your blogs, write your feeling
              and sharing interesting things with other people. Click the button
              to explore something new - Have fun my friends!
            </p>
            <Button to="/sign-up" kind="secondary">Get started</Button>
          </div>
          <div className="banner-image">
            <img src="/img-banner.png" alt="banner"></img>
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
