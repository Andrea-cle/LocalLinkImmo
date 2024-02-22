import { APP_ROUTES } from "../../constants/route.const";
// import Button from "../Button/Button";
import "./banner.scss";

const Banner = () => {
  return (
    <>
      <section className="banner">
        <div className="banner_header">
          <div className="banner_logo">
            <img src="/public/logo.png" alt="Logo LocalLinkImmo" />
          </div>
          <h1>La gestion des biens immobiliers pour particuliers</h1>
        </div>
        <div className="banner_text">
          <p>Gérer vos biens en toute autonomie et sérénité</p>
          <div className="banner_buttons">
            {/* <Button btnStyle="" text="C'est parti !" /> */}
            <div className="btn-wrapper">
              <a className="btn" href={APP_ROUTES.ACCOUNT}>
                Connection
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
