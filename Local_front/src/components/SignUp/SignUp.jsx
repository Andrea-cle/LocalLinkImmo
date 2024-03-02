import React, { useState } from "react";
import "./signUp.scss";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { APP_ROUTES } from "../../constants/route.const";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPass: "",
    role: "tenant",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleRedirect = () => {
    dispatch(switchRoute({ route: APP_ROUTES.SIGN_IN }));
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
        required={true}
        value={form.password}
        onChange={(value) => updateForm(value, "password")}
      />

      <Input
        label="Confirmation du mot de passe"
        value={form.confirmPass}
        onChange={(value) => updateForm(value, "confirmPass")}
      />

      <select
        label="role"
        value={form.role}
        onChange={(value) => updateForm(value, "role")}
      >
        <option value="tenant">Locataire</option>
        <option value="owner">Propriétaire</option>
      </select>
      <div className="btns">
        <Button type={"submit"} text={"Valider"} color={"var(--primary)"} />
      </div>
      <div className="btns">
        <Button
          type={"button"}
          text={"Se connecter"}
          onClick={handleRedirect}
        />
      </div>
    </form>
  );
};

export default SignUp;
