import React from "react";

const Dashboard = ({ userType }) => {
  // Simulons des données de documents pour le locataire et le propriétaire
  const tenantDocuments = [
    { id: 1, name: "Contrat de location", type: "PDF" },
    { id: 2, name: "Assurance", type: "PDF" },
  ];

  const ownerDocuments = [
    { id: 1, name: "Bail", type: "PDF" },
    { id: 2, name: "Documents", type: "PDF" },
  ];

  // Fonction pour afficher les documents
  const renderDocuments = (documents) => {
    return (
      <ul>
        {documents.map((document) => (
          <li key={document.id}>
            {document.name} ({document.type})
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      {userType === "tenant" && (
        <>
          <h3>Documents du locataire :</h3>
          {renderDocuments(tenantDocuments)}
        </>
      )}
      {userType === "owner" && (
        <>
          <h3>Documents du propriétaire :</h3>
          {renderDocuments(ownerDocuments)}
        </>
      )}
    </div>
  );
};

export default Dashboard;

/* <li>
  <Link to="/dashboard">
    <i className="fa-solid fa-keyboard" />
    Tableau de Bord
  </Link>
</li>; */
