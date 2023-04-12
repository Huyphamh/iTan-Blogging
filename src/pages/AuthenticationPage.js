import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const AuthenticationPageStyle = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 60px;
  }
  .form {
    max-width: 600px;
    margin: 0 auto;
  }
  .input-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
  .have-account {
    margin-bottom: 20px;
    a {
      color: ${(props) => props.theme.primary};
      display: inline-block;
      font-weight: 500;
    }
  }
  label{
    font-weight: 500;
  }
`;
const AuthenticationPage = ({ children }) => {
  return (
    <AuthenticationPageStyle>
      <div className="container">
        <NavLink to="/">
          <img
            srcSet="/logo.png 2x"
            alt="monkey-blogging"
            className="logo"
          ></img>
        </NavLink>

        <h1 className="heading"> Monkey Blogging</h1>
        {children}
      </div>
    </AuthenticationPageStyle>
  );
};

export default AuthenticationPage;
