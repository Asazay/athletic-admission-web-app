import React from "react";
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
        </div> /
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
        <div>Menu</div>
        <div style={{ fontSize: 60 }}><href onClick={e => navigate('/')}>GRANDEVENT</href></div>
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
