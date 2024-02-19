import { BrowserRouter, Route, Routes } from "react-router-dom";
import { APP_ROUTES } from "../../constants/route.const.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.scss";
import Banner from "../Banner/Banner";
import Button from "../Button/Button";
// import Contact from "../Contact/Contact";
// import Footer from "../Footer/Footer";
// import Header from "../Header/Header";
// import HeaderNav from "../HeaderNav/HeaderNav";
// import Input from "../Input/Input";
// import SignIn from "../SignIn/SignIn";
// import SignUp from "../SignUp/SignUp";
// import SocialMedia from "../SocialMedia/SocialMedia";
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
          <Admin />
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
                  <section className="articles">
                    <HomeArticles />
                  </section>
                  <section id="contact" className="contact">
                    <Contact />
                  </section>
                  <section className="socialmedia">
                    <SocialMedia />
                  </section>
                </>
              }
            />
            <Route
              path={APP_ROUTES.ACCOUNT}
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
