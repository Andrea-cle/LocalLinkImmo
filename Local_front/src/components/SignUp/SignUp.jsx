import React, { useState } from "react";
import "./signUp.scss";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { postRequest } from "../../api/api";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPass: "",
    role: "tenant",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await postRequest("user", form);

    if (response.error) {
      console.error(response.error);
    } else {
      localStorage.setItem("userEmail", form.email);
      localStorage.setItem("userRole", form.role);

      // Redirection vers une autre page après la création du compte
      // Par exemple, rediriger vers une page de confirmation ou une page de connexion
      // window.location.href = "/confirmation"; // Remplacez "/confirmation" par l'URL de votre choix
    }
  };

  const updateForm = (value, inputName) => {
    setForm({
      ...form,
      [inputName]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="sign-up-form">
      <Input
        label="Email"
        required={true}
        value={form.email}
        onChange={(value) => updateForm(value, "email")}
      />
      <Input
        label="Mot de passe"
        type="password"
        required={true}
        value={form.password}
        onChange={(value) => updateForm(value, "password")}
      />
      <Input
        label="Confirmation du mot de passe"
        type="password"
        value={form.confirmPass}
        onChange={(value) => updateForm(value, "confirmPass")}
      />
      <select
        id="role"
        label="role"
        value={form.role}
        onChange={(event) => updateForm(event.target.value, "role")}
      >
        <option value="tenant">Locataire</option>
        <option value="owner">Propriétaire</option>
      </select>
      <div className="btns">
        <Button type={"submit"} text={"Valider"} color={"var(--primary)"} />
      </div>
    </form>
  );
};

export default SignUp;
