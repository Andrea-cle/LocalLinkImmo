// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { APP_ROUTES } from "../../constants/route.const.js";
// import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.scss";
import Banner from "../Banner/Banner.jsx";
import Button from "../Button/Button.jsx";
// import Contact from "../Contact/Contact";
// import Footer from "../Footer/Footer";
import Header from "../Header/Header.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import Input from "../Input/Input.jsx";
import LoginForm from "../Login/LoginForm.jsx";
import SignUp from "../LoginForm/LoginForm.jsx";
import Home from "../Home/Home.jsx";
import Documents from "../Documents/Documents.jsx";


const App = () => {
  const dispatch = useDispatch();

 
  // useEffect(() => {
  //   dispatch(getArticleThunk());
  // }, []);

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
                  <section className="logIn">
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
                    <Documents />
                  </section>
                  {/* <section id="contact" className="contact">
                    <Contact />
                  </section> */}
                  <section className="Home">
                    <Home />
                  </section>
                </>
              }
            />
            {/* <Route
              path={APP_ROUTES.USER}
              element={
                <>
                  <User email={"andrea@gmail.com"} />
                </>
              }
            /> */}
            <Route
              path={"*"}
              element={
               <>
               <h1>Oops !</h1>
                  <em>Erreur : 404</em>
                  <p>cette page n'existe pas.</p>
                 </>
                  
              }
            />
          </Routes>
        </main>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
};

export default App;
