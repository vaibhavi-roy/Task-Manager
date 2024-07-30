"use client";
import { useGlobalState } from "@/app/context/globalProvider";

import React from "react";
import styled from "styled-components";

interface Props {
    icon?: React.ReactNode;
    name?: string;
    background?: string;
    padding?: string;
    borderRad?: string;
    fw?: string;
    fs?: string;
    click?: () => void;
    type?: "submit" | "button" | "reset" | undefined;
    border?: string;
    color?: string;
}

function Button({
    icon,
    name,
    background,
    padding,
    borderRad,
    fw,
    fs,
    click,
    type,
    border,
    color,
}: Props) {
    const { theme } = useGlobalState();

    return (
        <ButtonStyled
            type={type}
            style={{
                background: background,
                padding: padding || "0.25rem 0.5rem",
                borderRadius: borderRad || "0.25rem",
                fontWeight: fw || "500",
                fontSize: fs || "0.875rem", // Adjusted font size
                border: border || "none",
                color: color || theme.colorGrey0,
            }}
            theme={theme}
            onClick={click}
        >
            <h4 className="logout">{name}</h4>
            {icon && icon}
        </ButtonStyled>
    );
}

const ButtonStyled = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colorGrey3};
  z-index: 5;
  cursor: pointer;

  transition: all 0.55s ease-in-out;

  i {
    margin-right: 0.5rem; // Adjusted margin for smaller spacing
    color: ${(props) => props.theme.colorGrey3};
    font-size: 1rem; // Adjusted icon size
    transition: all 0.55s ease-in-out;
  }

  .logout{
    color:${(props) => props.theme.colorGrey3};
  }

  &:hover {
    color: ${(props) => props.theme.colorGrey5};
    i {
      color: ${(props) => props.theme.colorGrey5};
    }
    .logout {
      color: ${(props) => props.theme.colorGrey5};
    }
  }
`;

export default Button;
