import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./dashboard.scss";

const Dashboard = ({ userId }) => {
  const [document, setDocumentData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userAccessData, setUserAccessData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les données de tous les documents
        const docResponse = await getRequest(`/doc`);
        const docData = docResponse.result;
        setDocumentData(docData);

        // Récupérer les données de l'utilisateur par son ID
        const userResponse = await getRequest(`/api/user/${userId}`);
        const userData = userResponse.result;
        setUserData(userData);

        // Récupérer les données d'accès de l'utilisateur par son ID
        const userAccessResponse = await getRequest(
          `/api/user/${userId}/access`
        );
        const userAccessData = userAccessResponse.result;
        setUserAccessData(userAccessData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="dashboard">
      <i className="fa-solid fa-keyboard" />
      <h2>Dashboard</h2>

      {/* Affichage des documents associés */}
      <h3>Documents associés :</h3>
      <ul>
        {documentData &&
          documentData.map((document) => (
            <li key={document.id}>
              Nom : {document.name}, Type : {document.type}
            </li>
          ))}
      </ul>
      {/* Utilisez Link pour naviguer vers la liste des documents */}
      <Link to="/documents">Voir la liste des documents</Link>

      {/* Affichage des informations utilisateur */}
      <h3>Informations utilisateur :</h3>
      {userData && (
        <div>
          <p>Nom : {userData.name}</p>
          <p>Email : {userData.email}</p>
          {/* Ajoutez d'autres informations utilisateur si nécessaire */}
        </div>
      )}

      {/* Affichage des données d'accès utilisateur */}
      <h3>Accès utilisateur :</h3>
      {userAccessData && (
        <div>{/* Affichage des données d'accès utilisateur */}</div>
      )}

      {/* Utilisez Link pour naviguer vers la liste des utilisateurs */}
      <Link to={`/users/${userId}`}>Voir la liste des utilisateurs</Link>
    </div>
  );
};

export default Dashboard;

// <Link to="/dashboard">
//         <i className="fa-solid fa-keyboard" />
//         Tableau de Bord
//       </Link>
