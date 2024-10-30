import React, { Suspense } from "react";

// ** Router Import
import Router from "./router/Router";
import './App.css'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Suspense fallback={null}>
        <Router />
      </Suspense>
    </>
  );
};

export default App;
