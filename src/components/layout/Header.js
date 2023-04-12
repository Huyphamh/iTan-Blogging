import React from "react";
import styled from "styled-components";
import Button from "../button/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
const menuLinks = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/",
    title: "Blog",
  },
  {
    url: "/",
    title: "Contact",
  },
];
const HeaderStyle = styled.header`
  padding: 20px 0;
  .header-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    display: block;
    max-width: 50px;
  }
  .menu {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 40px;
    list-style: none;
    font-weight: 600;
  }

  .search {
    margin-left: auto;
    padding: 15px 25px;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 100%;
    max-width: 320px;
    display: flex;
    align-items: center;
    position: relative;
    margin-right: 20px;
  }
  .search-input {
    flex: 1;
    padding-right: 45px;
    font-weight: 500;
  }
  .search-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 25px;
  }
  .header-button,
  .header-auth {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  @media screen and (max-width: 1023.98px) {
    .logo {
      max-width: 30px;
    }
    .menu,
    .search,
    .header-button,
    .header-auth {
      display: none;
    }
  }
`;

function getLastName(name) {
  if (!name) return "User";
  const length = name.split(" ").length;
  return name.split(" ")[length - 1];
}
const Header = () => {
  const { userInfo } = useAuth();
  // console.log("Header ~ userInfo", userInfo);
  return (
    <HeaderStyle>
      <div className="container">
        <div className="header-main">
          <Link to="/">
            <img
              className="logo"
              srcSet="/logo.png "
              alt="monkey-blogging"
            ></img>
          </Link>
          <ul className="menu">
            {menuLinks.map((item) => (
              <li className="menu-item" key={item.title}>
                <Link to={item.url} className="menu-linl">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="search-input">
          
          </div>
          {/* <div className="search">
            <input
              type="text"
              className="search-input"
              placeholder="Search post"
            ></input>
            <span className="search-icon">
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="7.66669"
                  cy="7.05161"
                  rx="6.66669"
                  ry="6.05161"
                  stroke="#999999"
                  strokeWidth="1.5"
                />
                <path
                  d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div> */}
          {!userInfo ? (
            <Button
              type="button"
              style={{ maxWidth: "200px" }}
              height="54px"
              className="header-button"
              to="/sign-in"
            >
              Login
            </Button>
          ) : (
            <div className="header-auth ">
              <span>Welcome </span>
              <strong className="text-priramy">
                {getLastName(userInfo?.displayName)}
              </strong>
              <Button
                type="button"
                height="56px"
                className="header-button"
                to="/dashboard"
              >
                Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </HeaderStyle>
  );
};

export default Header;
