// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { APP_ROUTES } from "../../constants/route.const";
// import { useState } from "react";
import "./App.scss";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Footer from "../Footer/Footer";
import User from "../User/User";
import SignUp from "../SignUp/SignUp";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route
              path={APP_ROUTES.HOME}
              element={
                <>
                  <section className="home">
                    <Home />
                  </section>
                </>
              }
            />
            <Route
              path={APP_ROUTES.USER}
              element={
                <section className="utilisateur">
                  <User />
                </section>
              }
            />
            <Route
              path={APP_ROUTES.SIGN_UP}
              element={
                <section className="Inscription">
                  <SignUp />
                </section>
              }
            />
            <Route
              path={APP_ROUTES.SIGN_UP}
              element={
                <section className="Connexion">
                  <SignUp />
                </section>
              }
              path={APP_ROUTES.DOC}
              element={
                <section className="Tableau de bord">
                  <Document />
                </section>
              }
            />

            <Route
              path={APP_ROUTES.DOC}
              element={
                <>
                  <h1>Oops !</h1>
                  <em>Erreur : 404</em>
                  <p>Cette page n'existe pas.</p>
                </>
              }
            />
            <Route
              path={APP_ROUTES.SIGN_UP}
              element={
                <section className="Connexion">
                  <User />
                </section>
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
