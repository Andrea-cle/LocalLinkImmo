import React, { useState, useEffect } from "react";

const DocumentsData = () => {
  // State pour stocker la liste des documents et les données du formulaire
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const getToken = localStorage.getItem(`token`);
  const token = JSON.parse(getToken);
  // // Fonction pour charger la liste des documents depuis le serveur
  // const loadDocuments = async () => {
  //   try {
  //     const response = await fetch(`${API_URL}all`);
  //     if (!response.ok) {
  //       throw new Error("Erreur lors du chargement des documents");
  //     }
  //     const data = await response.json();
  //     setDocuments(data.result);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // Effet pour charger la liste des documents lors du chargement du composant
  useEffect(() => {
    // loadDocuments();
  }, []);

  // Fonction pour gérer la soumission du formulaire d'ajout de document
  const handleSubmitBaux = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("doc", file);

    const insertdoc = await postRequest(`/doc/insert`, token);
    // const insertdoc2 = await postRequest(
    //   `/doc/insert/baux/${homeId}/${tenantId}`,
    //   token
    // );

    // try {
    //   const response = await fetch(`${API_URL}`, {
    //     method: "POST",
    //     body: formData,
    //   });
    //   if (!response.ok) {
    //     throw new Error("Erreur lors de l'ajout du document");
    //   }
    //   // Recharger la liste des documents après l'ajout
    //   loadDocuments();
    // } catch (error) {
    //   console.error(error);
    // }
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
      <h2>Ajouter un document</h2>
      {/* {user.role === "owner" && (
        <form onSubmit={handleSubmitBaux}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Ajouter</button>
        </form>
      )}
      {user.role === "tenant" && (
        <form onSubmit={handleSubmitInsurance}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Ajouter</button>
        </form>
      )} */}
      <form onSubmit={handleSubmitBaux}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default DocumentsData;
