import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { APP_ROUTES } from "../../constants/route.const";
// import { useState } from "react";
import "./App.scss";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Footer from "../Footer/Footer";
import LoginForm from "../SignUp/SignUp";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <section className="home">
            <Home />
          </section>
          <Routes>
            <Route
              path={APP_ROUTES.HOME}
              element={
                <>
                  <section className="header">
                    <Header />
                  </section>
                </>
              }
            />
            <Route
              path={APP_ROUTES.SIGN_UP}
              element={
                <section className="sign-up">
                  <SignUp />
                </section>
              }
            />
            <Route
              path={"*"}
              element={
                <>
                  <h1>Oops !</h1>
                  <em>Erreur : 404</em>
                  <p>Cette page n'existe pas.</p>
                </>
              }
            />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
};
export default App;
