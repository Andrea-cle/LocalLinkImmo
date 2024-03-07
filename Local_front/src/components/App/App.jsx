import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { APP_ROUTES } from "../../constants/route.const";
import "./App.scss";
import Header from "../Header/Header";
import HomePage from "../HomePage/HomePage";
import Footer from "../Footer/Footer";
import User from "../User/User";
import SignUp from "../SignUp/SignUp";
import SignInForm from "../SignInForm/SignInForm";
import Dashboard from "../Dashboard/Dashboard";

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
                  <section className="home-page">
                    <HomePage />
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
              path={APP_ROUTES.SIGN_IN}
              element={
                <section className="Connexion">
                  <SignInForm />
                </section>
              }
            />
            <Route
              path={APP_ROUTES.DASHBOARD}
              element={
                <section className="Tableau_bord">
                  <Dashboard />
                </section>
              }
            />

            {/* <Route
              path={APP_ROUTES.DOC}
              element={
                <>
                  <h1>Oops !</h1>
                  <em>Erreur : 404</em>
                  <p>Cette page n'existe pas.</p>
                </>
              }
            /> */}
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
};
export default App;
