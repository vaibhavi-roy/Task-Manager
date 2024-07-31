"use client";
import React from "react";
import styled from "styled-components";
import { useGlobalState } from "@/app/context/globalProvider";
import Image from "next/image";

import menu from "@/app/utils/menu";
import menu1 from "@/app/utils/menu1";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { arrowLeft, bars, logout } from "@/app/utils/icons";
import { UserButton, useClerk, useUser } from "@clerk/nextjs";
import Button from "../Button/Button";

function Sidebar() {
  const { theme, collapsed, collapseMenu } = useGlobalState();
  const { signOut } = useClerk();

  const { user } = useUser();
  console.log(user?.fullName)

  const { fullName } = user || {
    fullName: "",
    // lastName: "",
    // imageUrl: "",
  };

  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (link: string) => {
    router.push(link);
  };
  return (
    <SidebarStyled theme={theme} collapsed={collapsed} className="p-5">
      <div className="profile-overlay"></div>
      <div className="user">
        {/* <div className="image">
          <Image width={50} height={50} src={imageUrl} alt="profile" />
        </div> */}
        <div className="user-btn">
          <UserButton />
        </div>
        <h1 className="capitalize ml-2">
          {fullName}
          Vaibhavi Roy
        </h1>
      </div>
      <div className="horizontal">
        <ul className="horizontal-nav-items">
          {menu1.map((item) => {
            const link = item.link;
            return (
              <li key={link}>
                {item.icon}
                {/* <Link href={link}>{item.title}</Link> */}
              </li>
            )
          })}
        </ul>
        <Button
          name={"Logout"}
          type={"submit"}
          padding={"0.4rem 0.8rem"}
          borderRad={"0.8rem"}
          fw={"500"}
          fs={"1.2rem"}
          icon={logout}
          click={() => {
            signOut(() => router.push("/signin"));
          }}
        />
      </div>
      <ul className="nav-items">
        {menu.map((item) => {
          const link = item.link;
          return (
            <li
              key={link}
              className={`nav-item ${pathname === link ? "active" : ""}`}
              onClick={() => {
                handleClick(link);
              }}
            >
              {item.icon}
              <Link href={link}>{item.title}</Link>
            </li>
          )
        })}
      </ul>
      <div className="sign-out relative m-6">

      </div>
      <button
        className="create-button w-full h-12 text-sm font-light text-white bg-purple-700 hover:bg-purple-800 rounded-xl"
        type="submit"
      >
        Create new task (+)
      </button>
      <img className="w-full mt-48 cursor-pointer" src="/download-the-app.png" alt="" />


    </SidebarStyled>
  )
}
const SidebarStyled = styled.nav<{ collapsed: boolean }>`
  position: relative;
  width: ${(props) => props.theme.sidebarWidth};
  background-color: ${(props) => props.theme.colorBg2};
  /* border-right: 2px solid #cac3c3; */
  padding-right: 15px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  color: ${(props) => props.theme.colorGrey3};
  
   .user {
    display: flex;
    align-items: center;
    margin: 1rem; 
   }

   .horizontal{
     display: flex;
    align-items: center;
    justify-content: space-between;
   }

   .create-button{
    margin: 5px 0 0 0;
   }

   .horizontal-nav-items{
    display: flex;
    align-items: center;
    margin-right: auto;

    li {
      display: flex;
      align-items: center;
      margin-right: 1rem;

      a {
        margin-left: 0.5rem;
        color: ${(props) => props.theme.colorGrey2};
        text-decoration: none;
        font-size: 0.875rem;
      }

      i {
        font-size: 1rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    }
  }


   .nav-items{
    margin-top: 10px;
   }
   

   .image{
    padding-right:10px;
   }

  @media screen and (max-width: 768px) {
    position: fixed;
    height: calc(100vh - 2rem);
    z-index: 100;

    transition: all 0.3s cubic-bezier(0.53, 0.21, 0, 1);
    transform: ${(props) =>
    props.collapsed ? "translateX(-107%)" : "translateX(0)"};

    .toggle-nav {
      display: block !important;
    }
  }

  .toggle-nav {
    display: none;
    padding: 0.8rem 0.9rem;
    position: absolute;
    right: -69px;
    top: 1.8rem;

    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;

    background-color: ${(props) => props.theme.colorBg2};
    border-right: 2px solid ${(props) => props.theme.borderColor2};
    border-top: 2px solid ${(props) => props.theme.borderColor2};
    border-bottom: 2px solid ${(props) => props.theme.borderColor2};
  }

  .user-btn {
    .cl-rootBox {
      width: 100%;
      height: 100%;

      .cl-userButtonBox {
        width: 100%;
        height: 100%;

        .cl-userButtonTrigger {
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
    }
  }

  .profile {
    margin: 1.5rem;
    padding: 1rem 0.8rem;
    position: relative;

    border-radius: 1rem;
    cursor: pointer;

    font-weight: 500;
    color: ${(props) => props.theme.colorGrey0};

    display: flex;
    align-items: center;
    

    .profile-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      background: ${(props) => props.theme.colorBg3};
      border-radius: 1rem;
      border: 2px solid ${(props) => props.theme.borderColor2};

      opacity: 0.2;
    }

    h1 {
      font-size: 1.2rem;
      display: flex;
      flex-direction: row;

      line-height: 1.4rem;
    }

    .image,
    h1 {
      position: relative;
      z-index: 1;
    }

    .image {
      flex-shrink: 0;
      display: inline-block;
      overflow: hidden;
      transition: all 0.5s ease;
      border-radius: 100%;

      width: 70px;
      height: 70px;

      img {
        border-radius: 100%;
        transition: all 0.5s ease;
      }
    }

    > h1 {
      margin-left: 0.8rem;
      font-size: clamp(1.2rem, 4vw, 1.4rem);
      line-height: 100%;
    }
  }

  .nav-item {
    position: relative;
    padding: 0.8rem 1rem 0.9rem 0rem;
    margin: 1% 0;

    display: grid;
    grid-template-columns: 40px 1fr;
    cursor: pointer;
    align-items: center;

    &::after {
      position: absolute;
      content: "";
      left: 0;
      top: 0;
      width: 0;
      height: 100%;
      background-color: ${(props) => props.theme.activeNavLinkHover};
      z-index: 1;
      transition: all 0.3s ease-in-out;
    }

    &::before {
      position: absolute;
      content: "";
      right: 0;
      top: 0;
      width: 0%;
      height: 100%;
      background-color: ${(props) => props.theme.colorGrey6};

      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
    }

    a {
      font-weight: 500;
      transition: all 0.3s ease-in-out;
      z-index: 2;
      line-height: 0;
    }

    i {
      display: flex;
      align-items: center;
      color: ${(props) => props.theme.colorIcons};
    }

    &:hover {
      &::after {
        width: 100%;
      }
    }
  }

  .active {
    background-color: ${(props) => props.theme.activeNavLink};

    i,
    a {
      color: ${(props) => props.theme.colorIcons2};
    }
  }

  .active::before {
    width: 0.3rem;
  }

  > button {
    margin: 1.5rem;
  }
`;

export default Sidebar;