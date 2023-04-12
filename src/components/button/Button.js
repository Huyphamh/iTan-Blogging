import React, { Children } from "react";
import styled, { css } from "styled-components";
import LoadingSpinner from "../loading/LoadingSpinner";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";

const ButtonStyled = styled.button`
  cursor: pointer;
  padding: 0 25px;
  line-height: 1;
  color: white;
  border-radius: 8px;
  font-weight: 600;
  font-size: 18px;
  height: ${(props) => props.height || "66px"};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: ${(props) => props.theme.primary};
  ${(props) =>
    props.kind === "secondary" &&
    css`
      color: white;
      background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
      );
    `};
  ${(props) =>
    props.kind === "primary" &&
    css`
      color: white;
      background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
      );
    `}
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
/**
 * @param onClick - Handler onClick
 * @requires
 * @param {string} type Type of button 'button' | 'submit'
 * @returns
 */
const Button = ({
  type = "button",
  onClick = () => {},
  kind = "secondary",
  children,
  ...props
}) => {
  const { isLoading, to } = props;
  const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  if (to !== "" && typeof to === "string") {
    return (
      <NavLink
        to={to}
        style={{
          display: "inline-block",
        }}
      >
        <ButtonStyled type={type} kind={kind} onClick={onClick} {...props}>
          {child}
        </ButtonStyled>
      </NavLink>
    );
  }
  return (
    <ButtonStyled type={type} kind={kind} onClick={onClick} {...props}>
      {child}
    </ButtonStyled>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]),
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  kind: PropTypes.oneOf(["primary", "secondary"]),
};

export default Button;
