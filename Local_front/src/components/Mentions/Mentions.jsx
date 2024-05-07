import React from "react";
import "./mentions.scss";

const Mentions = () => {
  return (
    <div className="mentions-legales">
      <div className="mention">
        <h2>Mentions légales</h2>
        <article>
          <p>
            Ce site est édité par Andréa CLEMENT, créatrice du site Local Link
            Immo.
          </p>
          <p>Adresse : Rue du Paradis, Arc en Ciel</p>
          <p>Responsable de la publication : Andréa CLEMENT</p>
          <p>
            Contact : <a href="mailto:andrea@labosse.fr">andrea@labosse.fr</a>
          </p>
          <p>
            Propriété intellectuelle : Tous les contenus présents sur le site
            Local Link Immo, incluant, mais sans s'y limiter, les textes,
            images, graphiques, logos, icônes, clips audio et vidéo, sont la
            propriété exclusive de Andrea CLEMENT ou de ses partenaires et sont
            protégés par les lois nationales et internationales relatives aux
            droits d'auteur et à la propriété intellectuelle. Toute
            reproduction, distribution, modification, transmission, ou
            utilisation de tout ou partie de ces contenus sans l'autorisation
            préalable et écrite de Andrea CLEMENTest strictement interdite.
          </p>
          <p>
            Liens externes : Le site Local Link Immo peut contenir des liens
            vers d'autres sites web ou ressources externes qui ne sont pas sous
            le contrôle de Andrea CLEMENT Nous déclinons toute responsabilité
            quant au contenu de ces sites externes et aux éventuels dommages ou
            préjudices résultant de leur utilisation.
          </p>
          <p>
            Protection des données personnelles : Andrea CLEMENT s'engage à
            respecter la confidentialité des informations personnelles fournies
            par les utilisateurs du site Local Link Immo. Pour plus
            d'informations sur la collecte et le traitement de vos données
            personnelles, veuillez consulter notre politique de confidentialité.
          </p>
          <p>
            Modification des mentions légales : Andrea CLEMENT se réserve le
            droit de modifier à tout moment et sans préavis les présentes
            mentions légales afin de les adapter aux évolutions du site et/ou à
            toute nouvelle réglementation applicable. Nous vous recommandons de
            consulter régulièrement cette page pour prendre connaissance des
            éventuelles modifications.
          </p>
        </article>
      </div>
    </div>
  );
};

export default Mentions;
