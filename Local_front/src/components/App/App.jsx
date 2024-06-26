import { BrowserRouter, Routes, Route } from "react-router-dom";
import { APP_ROUTES } from "../../constants/route.const";
import Header from "../Header/Header";
import HomePage from "../HomePage/HomePage";
import Footer from "../Footer/Footer";
import User from "../User/User";
import SignUp from "../SignUp/SignUp";
import SignInForm from "../SignInForm/SignInForm";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import Dashboard from "../Dashboard/Dashboard";
import DocumentsData from "../Documents/DocumentsData";
import ConfirmationPage from "../Confirmation/Confirmation";
import FormContact from "../FormContact/FormContact";
import Mentions from "../Mentions/Mentions";
import PlanSite from "../Plan/Plan";

const App = () => {
  const isAdmin = true;

  return (
    <div>
      <BrowserRouter>
        <Header />

        <main className="container">
          <Routes>
            <Route
              path={APP_ROUTES.HOME_PAGE}
              element={
                <div>
                  <section className="home-page">
                    <HomePage />
                  </section>
                </div>
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
              path={APP_ROUTES.CONFIRMATION}
              element={
                <section className="confirmation">
                  <ConfirmationPage />
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
            {isAdmin ? (
              <Route
                path={APP_ROUTES.ADMIN_DASHBOARD}
                element={
                  <section className="AdminDashboard">
                    <AdminDashboard />
                  </section>
                }
              />
            ) : (
              <Route
                path={APP_ROUTES.DASHBOARD}
                element={
                  <section className="Dasboard">
                    <Dashboard />
                  </section>
                }
              />
            )}
            <Route
              path={APP_ROUTES.DOC}
              element={
                <div>
                  <section className="Documents">
                    <DocumentsData />
                  </section>
                </div>
              }
            />
            <Route
              path="FormContact"
              element={
                <div>
                  <section className="FormContact">
                    <FormContact />
                  </section>
                </div>
              }
            />
            <Route
              path="Mentions"
              element={
                <div>
                  <section className="MentionsLegales">
                    <Mentions />
                  </section>
                </div>
              }
            />
            <Route
              path="Plan"
              element={
                <div>
                  <section className="Plan-du-site">
                    <PlanSite />
                  </section>
                </div>
              }
            />
            <Route
              path="*"
              element={
                <div>
                  <h1>Oops !</h1>
                  <em>Erreur : 404</em>
                  <p>Cette page n'existe pas.</p>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
export default App;
