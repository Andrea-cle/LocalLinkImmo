import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./dashboard.scss";
import { getRequest } from "../../api/api";
import { postRequest } from "../../api/api"; // Importez la fonction postRequest
import { APP_ROUTES } from "../../constants/route.const";
import Button from "../Button/Button";

const Dashboard = ({ userId }) => {
  const navigate = useNavigate();
  const [docData, setDocumentData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userAccessData, setUserAccessData] = useState(null);
  const getToken = localStorage.getItem(`token`);
  const token = JSON.parse(getToken);

  // Ajouter un état pour stocker le fichier sélectionné
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDisconnect = () => {
    localStorage.clear();
    navigate(APP_ROUTES.SIGN_IN, { replace: true });
  };

  // Fonction pour gérer le changement de fichier
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmitInsurance = async (event) => {
    event.preventDefault();
  };

  const handleSubmitLease = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Envoyer le fichier au serveur
      const response = await postRequest("/doc/insert", formData, token);

      // Mettre à jour l'état ou afficher un message de succès
    } catch (error) {
      console.error("Erreur lors de l'envoi du document :", error);
      // Afficher un message d'erreur à l'utilisateur si nécessaire
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les données de tous les documents

        const docResponse = await getRequest(`/doc/all`, token);

        const docData = docResponse.result.result;
        setDocumentData(docData);
        // Récupérer les données de l'utilisateur par son ID

        const userResponse = await getRequest(`/user/read`, token);
        const userData = userResponse.result.result[0];
        setUserData(userData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => console.log(userData), [userData]);
  return (
    <div className="dashboard">
      <i className="fa-solid fa-keyboard" />
      <h2>Dashboard</h2>
      <Button onClick={handleDisconnect} text={"Déconnexion"} />
      {/* Affichage des documents associés */}
      <h3>Documents associés :</h3>
      <ul>
        {Array.isArray(docData) &&
          docData.map((document) => (
            <li key={document.id}>
              Nom : {document.name}, Type : {document.type}
            </li>
          ))}
      </ul>

      {/* Link pour naviguer vers la liste des documents */}
      <Link to="/doc">Voir la liste des documents</Link>

      {/* Affichage des informations utilisateur */}
      <h3>Informations utilisateur :</h3>
      {userData && (
        <div>
          <p>Email : {userData.email}</p>
          {/* Ajoutez d'autres informations utilisateur si nécessaire */}
        </div>
      )}

      {/* Affichage des données d'accès utilisateur */}
      <h3>Accès utilisateur :</h3>
      {userAccessData && (
        <div>{/* Affichage des données d'accès utilisateur */}</div>
      )}

      {/* Link pour naviguer vers la liste des utilisateurs */}
      <Link to={`/user ${userId}`}>Voir la liste des utilisateurs</Link>

      {/* Formulaire pour télécharger un document */}
      {userData?.role === "owner" && (
        <form onSubmit={handleSubmitLease}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Ajouter un bail</button>
        </form>
      )}
      {userData?.role === "tenant" && (
        <form onSubmit={handleSubmitInsurance}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Ajouter une assurance</button>
        </form>
      )}
      {/* <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Ajouter</button>
      </form> */}
    </div>
  );
};

export default Dashboard;
