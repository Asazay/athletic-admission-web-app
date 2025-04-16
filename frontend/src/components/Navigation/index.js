import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(window.location.href)
    
    if (
      sessionUser &&
      sessionUser.school &&
      !window.location.href.includes("confirm") &&
      !window.location.href.includes('cancel')
    ) {
      let school = sessionUser.school;
      navigate(
        `/schools/${school.state}/${school.city}/${school.name}/ges${school.zipCode}gei${school.id}`
      );
    } else if(!window.location.href.includes("confirm") &&
    !window.location.href.includes('cancel')) navigate("/");
  }, [sessionUser]);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        <ProfileButton user={sessionUser} />
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

  return (
    <div id="nav-bar">
      <div>
        <div>
          <i class="fas fa-bars" style={{ fontSize: 24 }} />
        </div>
        <div style={{ fontSize: 60 }}>
          <href onClick={(e) => {
            if(sessionUser && sessionUser.school) {
              let school = sessionUser.school
              navigate(
                `/schools/${school.state}/${school.city}/${school.name}/ges${school.zipCode}gei${school.id}`
              );
            }
            else navigate("/")
          }}>GRANDEVENT</href>
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
