import { APP_ROUTES } from "../../constants/route.const.js";
import "./navbar.scss";

const Navbar = () => {
  return (
    <>
      <section className="navbar">
        <div className="navbar_control">
          <div className="navbar_logo">
            <ul className="menu">
              <li className="active">
                <a href="/home/">
                <FontAwesomeIcon icon="fa-solid fa-house" />
                  HOME
                </a>
              </li>
              <li className="">
                <a href="/fr/sign-in">
                  <FontAwesomeIcon icon="fa-solid fa-right-to-bracket" />
                  CONNEXION
                </a>
              </li>
              <li className="">
                <a href="/fr/about">
                  <FontAwesomeIcon icon="fa-solid fa-address-card" />
                  EN SAVOIR PLUS
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Navbar;
