import "./footer.scss";

// Permet de gérer le footer des pages
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <ul>
          <p>
            <a href="/FormContact">Contactez-nous</a>
          </p>
          <p>
            <a href="/mentions">Mentions légales</a>
          </p>
          <p>
            <a href="/plan">Plan du site</a>
          </p>
        </ul>

        <div className="footer-brand">
          <p>&copy; 2024 Local Link Immo</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
