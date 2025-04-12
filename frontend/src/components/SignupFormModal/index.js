import "./SignUpFormPage.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { useRef } from "react";
import OpenModalButton from "../OpenModalButton";
import AdminSignup from "./AdminSignup";
import { useNavigate } from "react-router";
import { useModal } from "../../context/Modal";

function SignupFormModal() {

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupRole, setSignupRole] = useState("start");
  const [prevRole, setPrevRole] = useState(signupRole)
  const [errors, setErrors] = useState({});

  const nav = useNavigate();

  const {closeModal} = useModal();

  useEffect(() => {
    if (sessionUser) nav('/')
    console.log(signupRole)
  }, [sessionUser])

  const ref = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      dispatch(
        sessionActions.signup({
          email,
          role,
          firstName,
          lastName,
          password,
        })
      ).then(res => {}).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });

      closeModal();
      nav('/');
      
    }
    else return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  const onRoleSelect = (e) => {
    e.preventDefault();

    setSignupRole(e.target.value);
  };

  const userSignup = (
    <div>
      <h1>Sign Up</h1>
        <div className="form-field">
        <label>
          First Name
          <br/><input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        </div>
        {(errors.firstName && <p>{errors.firstName}</p>) || <p></p>}
        <div className="form-field">
        <label>
          Last Name
          <br/><input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        </div>
        {(errors.lastName && <p>{errors.lastName}</p>) || <p></p>}
        <div className="form-field">
        <label>
          Email
          <br/><input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        </div>
        {(errors.email && <p>{errors.email}</p>) || <p></p>}
        <div className="form-field">
        <label>
          Password
          <br/><input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        </div>
        {(errors.password && <p>{errors.password}</p>) || <p></p>}
        <div className="form-field">
        <label>
          Confirm Password
          <br/><input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        </div>
        {(errors.confirmPassword && <p>{errors.confirmPassword}</p>) || <p></p>}
        <div id="buttons">
        <div><button type="submit" onClick={handleSubmit}>Sign Up</button></div>
        <div><button value={prevRole} onClick={e => setSignupRole(e.target.value)}>Back</button></div>
        </div>
    </div>
  );

  const PrincipalSignup = (
    <>This is the principal signup</>
  )

  return (
    <div className="modal" ref={ref}>
      {signupRole === "start" && (
        <div>
          <h1>Please select a role:</h1>
          <div id="btns-div">
            <div>
              <button value={'customer'} onClick={e => {
                setPrevRole(signupRole)
                onRoleSelect(e)
              }}>Customer</button>
            </div>
            <div>
            <button value={'Principal'} onClick={e => {
                setPrevRole(signupRole)
                onRoleSelect(e)
              }}>Principal</button>
            </div>
            <div>
            <button value={'admin'} onClick={e => {
                setPrevRole(signupRole)
                onRoleSelect(e)
              }}>Admin</button>
            </div>
          </div>
        </div>
      )}
      {signupRole === 'customer' && (userSignup)}
    </div>
  );
}

export default SignupFormModal;
