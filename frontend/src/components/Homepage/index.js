import "./Homepage.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllSchoolsThunk } from "../../store/schools";
import { getSchoolBySearchThunk } from "../../store/schools";
import { useNavigate } from "react-router";

function Homepage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [schools, setSchools] = useState([]);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let newErrors = {};
    setErrors(newErrors);
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    setErrors(newErrors);
    const searchParams = {};
    if (name) searchParams.name = name;
    if (city) searchParams.city = city;
    if (state) searchParams.state = state;
    if (zipCode) searchParams.zipCode = zipCode;

    console.log(searchParams);

    if (Object.keys(searchParams).length === 0) {
      const response = await dispatch(getAllSchoolsThunk());

      if (response && response.length > 0) {
        setSchools(response);
      } else {
        setSchools([]);
        return;
      }
    }

    const response = await dispatch(getSchoolBySearchThunk(searchParams));

    if (response && response.length > 0) {
      setSchools(response);
    } else {
      setSchools([]);
      const newErrors = { ...errors, searchErr: "No schools found" };
      setErrors(newErrors);
    }
  };

  return (
    <div>
      <div id="homepage-img-div">
        <div id="img-div">
          <img
            id="homepage-img"
            src="https://images.squarespace-cdn.com/content/v1/595ea7d6e58c62dce01d1625/1646059790668-WUYC1039UVQ129AESXA4/2022_Aspen_SportsForAll_Webbanner_1-1mm.jpg?format=2500w"
            width={800}
            height={250}
          />
        </div>
      </div>
      <div id="school-search-div">
        <div id="search-title">School Search</div>
        <form id="school-search-form" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your school name"
              />
            </div>
            <div>
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city"
              />
            </div>
            <div>
              <label htmlFor="state">State:</label>
              <select
                id="state"
                name="state"
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">Select a state</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District of Columbia</option>
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
            <div>
              <label htmlFor="zip">Zip code:</label>
              <input
                type="text"
                id="zipCode"
                name="zip"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="Enter your zip code"
              />
            </div>
            <div id="submit-btn">
              <button type="submit">Search</button>
            </div>
            {Object.keys(errors).length > 0 && errors.searchErr && (
              <p style={{ color: "red", alignSelf: "center" }}>
                {errors.searchErr}
              </p>
            )}
          </div>
        </form>
      </div>
      {schools && schools.length > 0 && (
        <div id="school-list-div">
          <div id="school-list-title">Results</div>
          <div id="school-list">
            {schools.map((school) => (
              <div key={school.id} className="school-item">
                <div>
                  <h3>{school.name}</h3>
                </div>
                <div>
                  <p>
                    {school.city}, {school.state}, {school.zipCode}{" "}
                  </p>
                </div>
                <div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(
                        `/schools/${school.state}/${school.city}/${school.name}/ges${school.zipCode}gei${school.id}`
                      );
                    }}
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default Homepage;
