import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
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

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  let ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div id="pb-user-menu">
      <button onClick={(e) => toggleMenu(e)}>
        <i className="far fa-user-circle" style={{ fontSize: "24px" }} />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user && user.school && user.school.name && (
          <li style={{ fontWeight: "bold", fontSize: "18px" }}>
            {user.school.name}
          </li>
        )}
        <li>
          Role:{" "}
          <span style={{ fontWeight: "bold" }}>
            {user.role && user.role.toString().toUpperCase()}
          </span>
        </li>
        <li>{user.email}</li>
        <div>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </div>
      </ul>
    </div>
  );
}

export default ProfileButton;
