import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Import de la fonction useNavigate pour la navigation
import "./dashboard.scss";
import { getRequest, deleteRequest } from "../../api/api";
import Button from "../Button/Button";

const Dashboard = () => {
  const [homes, setHomes] = useState([]);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const role = JSON.parse(window.localStorage.getItem("Role"));
    if (role !== 2 && role !== 3) {
      navigate("/");
    } else {
      fetchHomes();
    }
  }, []);

  const fetchHomes = async () => {
    try {
      const response = await getRequest("/home");
      if (response.status === 200) {
        setHomes(response.result.homes);
      } else {
        setErrors(
          "Une erreur s'est produite lors de la récupération des maisons."
        );
      }
    } catch (error) {
      setErrors("Erreur de communication avec le serveur.");
    }
  };

  const handleDeleteHouse = async (houseId) => {
    // Vérification du rôle avant de supprimer la maison
    const role = JSON.parse(window.localStorage.getItem("Role"));
    if (role !== 2) {
      // Si l'utilisateur n'a pas le rôle 2, ne pas permettre la suppression
      setErrors("Vous n'avez pas les autorisations nécessaires.");
      return;
    }

    try {
      const response = await deleteRequest(`/home/${houseId}`);
      if (response.status === 200) {
        setHomes(homes.filter((house) => house.id !== houseId));
      } else {
        setErrors(
          "Une erreur s'est produite lors de la suppression de la maison."
        );
      }
    } catch (error) {
      setErrors("Erreur de communication avec le serveur.");
    }
  };

  return (
    <div className="dashboard-admin">
      <h2>Tableau de bord administrateur</h2>
      {errors && <p className="error_red">{errors}</p>}
      <div className="house-list">
        {homes.map((house) => (
          <div key={house.id} className="house">
            <div className="details">
              <p>ID : {house.id}</p>
              <p>Adresse : {house.address}</p>
              <p>ID Propriétaire : {house.id_user_owner}</p>
            </div>
            <div className="btns">
              {role === 2 && ( // Afficher le bouton de suppression uniquement pour le rôle 2
                <Button
                  type={"submit"}
                  text={"Supprimer"}
                  onClick={() => handleDeleteHouse(house.id)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
