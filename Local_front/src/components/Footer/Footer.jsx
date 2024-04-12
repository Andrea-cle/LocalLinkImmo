import FormContact from "../FormContact/FormContact";
import "./footer.scss";

// Permet de gérer le footer des pages
const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <p>
            <a href="/FormContact">Contactez-nous</a>
          </p>
          <div className="footer-navigate">
            <ul>
              <li>
                <a href="/mentions">Mentions légales</a>
              </li>
              <li>
                <a href="/plan">Plan du site</a>
              </li>
            </ul>
          </div>
          <div className="footer-brand">
            <p>&copy; 2024 Local Link Immo</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
