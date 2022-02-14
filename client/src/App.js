import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import LogedInLayout from "./layouts/LogedInLayout";

function App() {
  return (
    <div className='App'>
      <ToastContainer />
      <Switch>
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/login' component={SignIn} />
        <LogedInLayout />
      </Switch>
    </div>
  );
}

export default App;
