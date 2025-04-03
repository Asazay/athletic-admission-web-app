import "./Homepage.css";

function Homepage() {
  return (
    <div>
      <div id="homepage-img-div">
        <div>
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
        <form id="school-search-form">
          <div>
            <div>
              <label for="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your school name"
              />
            </div>
            <div>
              <label for="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter your city"
              />
            </div>
            <div>
              <label for="state">State:</label>
              <select id="state" name="state">
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
              <label for="zip">Zip code:</label>
              <input
                type="text"
                id="zipCode"
                name="zip"
                placeholder="Enter your zip code"
              />
            </div>
            <div id="submit-btn">
              <button type="submit">Search</button>
            </div>
          </div>
        </form>
      </div>
      <div>Div 3</div>
    </div>
  );
}
export default Homepage;
