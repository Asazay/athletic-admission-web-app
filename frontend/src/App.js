import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormModal";
import SignupFormPage from "./components/SignupFormModal";
import Navigation from "./components/Navigation";
import * as sessionActions from "./store/session";
import Homepage from "./components/Homepage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <>
        <Switch>
          <Route path="/" exact>
            <Homepage />
          </Route>
        </Switch>
      </>}
    </>
  );
}

export default App;
