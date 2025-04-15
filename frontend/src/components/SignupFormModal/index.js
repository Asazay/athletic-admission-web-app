import "./SignUpFormPage.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { createSchoolThunk } from "../../store/schools";
import { useRef } from "react";
import { useNavigate } from "react-router";
import { useModal } from "../../context/Modal";

function SignupFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [schoolName, setSchoolName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [signupRole, setSignupRole] = useState("start");
  const [prevRole, setPrevRole] = useState(signupRole);
  const [errors, setErrors] = useState({});

  const nav = useNavigate();

  const { closeModal } = useModal();

  useEffect(() => {
    if (sessionUser) nav("/");
  }, [sessionUser]);

  const ref = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      if (signupRole === "user") {
        setErrors({});
        await dispatch(
          sessionActions.signup({
            email,
            role: signupRole,
            firstName,
            lastName,
            password,
          })
        )
          .then((res) => {})
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
              setErrors(data.errors);
            }
          });

        closeModal();
        nav("/");
      }

      if(signupRole === 'principal'){
        setErrors({});
      const user = await dispatch(
        sessionActions.signup({
          email,
          role: signupRole,
          firstName,
          lastName,
          password
        })
      ).catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            return setErrors(data.errors);
          }
        });

      const newSchool = await dispatch(createSchoolThunk({
        principalId: user['id'],
        name: schoolName,
        address,
        city,
        state,
        zipCode,
      })).catch(res => {
        const data = res.json();
        if(data && data.errors) return setErrors(data.errors)
      })

      alert("Successfully registered.")
      closeModal();
      nav("/");
      }
    } else
      return setErrors({
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
      <div className="form-group">
        <label>
          First Name
          <br />
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
      </div>
      {(errors.firstName && <p>{errors.firstName}</p>) || <p></p>}
      <div className="form-group">
        <label>
          Last Name
          <br />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
      </div>
      {(errors.lastName && <p>{errors.lastName}</p>) || <p></p>}
      <div className="form-group">
        <label>
          Email
          <br />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
      </div>
      {(errors.email && <p>{errors.email}</p>) || <p></p>}
      <div className="form-group">
        <label>
          Password
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
      </div>
      {(errors.password && <p>{errors.password}</p>) || <p></p>}
      <div className="form-group">
        <label>
          Confirm Password
          <br />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
      </div>
      {(errors.confirmPassword && <p>{errors.confirmPassword}</p>) || <p></p>}
      <div id="buttons">
        <div>
          <button type="submit" onClick={handleSubmit}>
            Sign Up
          </button>
        </div>
        <div>
          <button
            value={prevRole}
            onClick={(e) => setSignupRole(e.target.value)}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );

  const PrincipalSignup = (
    <div className="modal">
      <div className="form-title">
        <h1>Principal Signup</h1>
      </div>
      <div className="form-group">
        <div className="form-label">
          <label>School Name:</label>
        </div>
        <div className="form-input">
          <input
            value={schoolName}
            type="text"
            required
            onChange={(e) => setSchoolName(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group">
        <div className="form-label">
          <label>Address:</label>
        </div>
        <div className="form-input">
          <input
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
            type="text"
          />
        </div>
      </div>
      <div
        className="form-group"
        style={{
          display: "-ms-inline-flexbox",
          justifyContent: "left",
          flexDirection: "row",
          width: "80%",
          boxSizing: "border-box",
        }}
      >
        <div className="form-label" style={{ margin: "0" }}>
          <label>City:</label>
          <div className="form-input">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              required
            />
          </div>
        </div>
        <div className="form-label" style={{ width: "60%" }}>
          <label>State:</label>
          <div className="form-input">
            <select
              required
              name="states"
              id="states"
              onChange={(e) => setState(e.target.value)}
            >
              <option value={""}>Select a state</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </div>
        </div>
        <div className="form-label" style={{ width: "30%" }}>
          <label>Zipcode:</label>
          <div className="form-input">
            <input
              required
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              type="text"
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="form-label">
          <label>First name:</label>
        </div>
        <div className="form-input">
          <input
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group">
        <div className="form-label">
          <label>Last name:</label>
        </div>
        <div className="form-input">
          <input
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group">
        <div className="form-label">
          <label>Official email:</label>
        </div>
        <div className="form-input">
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group">
        <div className="form-label">
          <label>Password</label>
        </div>
        <div className="form-input">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group">
        <div className="form-label">
          <label>Confirm password:</label>
        </div>
        <div className="form-input">
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
      <div id="btns-div">
        <div>
          <button onClick={e => handleSubmit(e)}>Submit</button>
        </div>
        <div>
          <button
            value={prevRole}
            onClick={(e) => setSignupRole(e.target.value)}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="modal" ref={ref}>
      {signupRole === "start" && (
        <div>
          <h1>Please select a role:</h1>
          <div id="btns-div">
            <div>
              <button
                value={"customer"}
                onClick={(e) => {
                  setPrevRole(signupRole);
                  onRoleSelect(e);
                }}
              >
                Customer
              </button>
            </div>
            <div>
              <button
                value={"principal"}
                onClick={(e) => {
                  setPrevRole(signupRole);
                  onRoleSelect(e);
                }}
              >
                Principal
              </button>
            </div>
            <div>
              <button
                value={"admin"}
                onClick={(e) => {
                  setPrevRole(signupRole);
                  onRoleSelect(e);
                }}
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      )}
      {signupRole === "customer" && userSignup}
      {signupRole === "principal" && PrincipalSignup}
    </div>
  );
}

export default SignupFormModal;
