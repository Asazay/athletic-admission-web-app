import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const user = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  // Redirect to proper homepage or prevent redirection when returning from 3rd party checkout
  useEffect(() => {
    if (
      user &&
      user.school &&
      !window.location.href.includes("confirm") &&
      !window.location.href.includes("cancel")
    ) {
      let school = user.school;
      navigate(
        `/schools/${school.state}/${school.city}/${school.name}/ges${school.zipCode}gei${school.id}`
      );
    } else if (
      !window.location.href.includes("confirm") &&
      !window.location.href.includes("cancel")
    )
      navigate("/");
  }, [user]);

  let sessionLinks;
  if (user) {
    sessionLinks = (
      <div>
        <ProfileButton user={user} />
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <div id="omb-div">
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          />
        </div>{" "}
        /
        <div id="omb-div">
          <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
        </div>
      </>
    );
  }

  let ulClassName = "profile-dropdown-menu" + (showMenu ? "" : " hidden");

  return (
    <div id="nav-bar">
      <div>
        <div>
          <button onClick={(e) => toggleMenu(e)}>
            <i class="fas fa-bars" style={{ fontSize: 24 }} />
          </button>
          <ul className={ulClassName} ref={ulRef}>
            <li><button onClick={e => {
              e.preventDefault();
              if(user && user.school) {
                let school = user.school
                navigate(`/schools/${school.state}/${school.city}/${school.name}/ges${school.zipCode}gei${school.id}`) 
              }
              else navigate('/')
              toggleMenu(e)
            }}>Home</button></li>
          </ul>
        </div>
        <div style={{ fontSize: 60 }}>
          <href
            onClick={(e) => {
              if (user && user.school) {
                let school = user.school;
                navigate(
                  `/schools/${school.state}/${school.city}/${school.name}/ges${school.zipCode}gei${school.id}`
                );
              } else navigate("/");
            }}
          >
            GRANDEVENT
          </href>
        </div>
        <div>
          {/* <li>
            <NavLink exact to="/">
              Home
            </NavLink>
          </li> */}
          {isLoaded && sessionLinks}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
