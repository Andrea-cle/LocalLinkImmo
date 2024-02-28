import { APP_ROUTES } from "../../constants/route.const";
import "./footer.scss";

const Footer = () => {
  return (
    <>
      <section className="footer">
        <div className="footer-content">
          <p>Contactez-nous : andrea@gmail.com</p>
          <div className="footer-navigate">
            <ul>
              <li>
                <a href="/mentions">Mentions légales</a>
              </li>
              <li>
                <a href="/plan">Plan du site</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-brand">
            <p>&copy; 2024 Local Link Immo</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
