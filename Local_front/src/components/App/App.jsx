import { BrowserRouter, Route, Routes } from "react-router-dom";
import { APP_ROUTES } from "../../constants/route.const.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.scss";
import Banner from "../Banner/Banner.jsx";
// import Button from "../Button/Button";
// import Contact from "../Contact/Contact";
// import Footer from "../Footer/Footer";
import Header from "../Header/Header.jsx";
import Navbar from "../Navbar/Navbar.jsx";
// import Input from "../Input/Input";
// import SignIn from "../SignIn/SignIn";
// import SignUp from "../SignUp/SignUp";
import Home from "../Home/Home.jsx";
// import User from "../User/User";

const App = () => {
  const dispatch = useDispatch();

  //
  useEffect(() => {
    dispatch(getArticleThunk());
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            {/* Hello retest */}
            <Route
              path={APP_ROUTES.SIGN_UP}
              element={
                <>
                  <section className="signUp">
                    <SignUp />
                  </section>
                </>
              }
            />
            <Route
              path={APP_ROUTES.SIGN_IN}
              element={
                <>
                  <section className="signIn">
                    <SignIn />
                  </section>
                </>
              }
            />
            <Route
              path={APP_ROUTES.HOME}
              element={
                <>
                  <Banner />
                  <section className="documents">
                    <HomeDocuments />
                  </section>
                  <section id="contact" className="contact">
                    <Contact />
                  </section>
                  <section className="Home">
                    <Home />
                  </section>
                </>
              }
            />
            <Route
              path={APP_ROUTES.USER}
              element={
                <>
                  <User email={"andrea@gmail.com"} />
                </>
              }
            />
            <Route
              path={"*"}
              element={
                <main style={{ padding: "1rem" }}>
                  <h1>Oops !</h1>
                  <em>Erreur : 404</em>
                  <p>cette page n'existe pas.</p>
                </main>
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
