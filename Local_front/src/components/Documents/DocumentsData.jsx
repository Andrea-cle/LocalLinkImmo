import React, { useState, useEffect } from "react";
import { postRequest } from "../../api/api";

const DocumentsData = () => {
  // State pour stocker la liste des documents et les données du formulaire
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [userData, setUserData] = useState([]);
  const getToken =
    typeof localStorage !== "undefined" ? localStorage.getItem(`token`) : null;
  const token = getToken ? JSON.parse(getToken) : null;

  // // Fonction pour charger la liste des documents depuis le serveur
  const loadDocuments = async () => {
    try {
      const response = await fetch(`${API_URL}/all`);
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des documents");
      }
      const data = await response.json();
      setDocuments(data.result);
    } catch (error) {}
  };

  // Effet pour charger la liste des documents lors du chargement du composant
  useEffect(() => {
    loadDocuments();
  }, []);

  // Fonction pour gérer la soumission du formulaire d'ajout de document
  const handleSubmitLease = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("doc", file);

    try {
      const insertDocResponse = await postRequest(
        `/doc/insert`,
        formData,
        token
      );
      const insertLeaseResponse = await postRequest(
        `/doc/insert/${homeId}/${tenantId}`,
        formData,
        token
      );

      if (!insertDocResponse.error && !insertLeaseResponse.error) {
        // Recharger la liste des documents après l'ajout
        loadDocuments();
      } else {
        throw new Error("Erreur lors de l'ajout du document");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour mettre à jour le fichier sélectionné dans le state
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div>
      <h2>Liste des documents</h2>
      <ul>
        {documents.map((document) => (
          <li key={document.doc_id}>
            Nom : {document.name}, Type : {document.type}
          </li>
        ))}
      </ul>

      {/* Formulaire pour ajouter un document */}
      <h3>Ajouter un document</h3>
      {/* Formulaire pour télécharger un document */}
      {userData && userData.role === "owner" && (
        <form onSubmit={handleSubmitLease}>
          <label htmlFor="leaseFile">Sélectionner un fichier:</label>
          <input type="file" id="leaseFile" onChange={handleFileChange} />
          <button type="submit">Ajouter un bail</button>
        </form>
      )}
      {userData && userData.role === "tenant" && (
        <form onSubmit={handleSubmitInsurance}>
          <label htmlFor="insuranceFile">Selectionner un fichier:</label>
          <input type="file" id="insuranceFile" onChange={handleFileChange} />
          <button type="submit">Ajouter une assurance</button>
        </form>
      )}
    </div>
  );
};

export default DocumentsData;
