import React, { useState } from "react";
import "./signinForm.scss";
import Button from "../Button/Button";
import { APP_ROUTES } from "../../constants/route.const";

const SignInForm = (props) => {
  const [role, setRole] = useState("Locataire");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const updateForm = (value, inputName) => {};
  const handleRedirect = () => {
    dispatch(switchRoute({ route: APP_ROUTES.SIGN_UP }));
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="sign-up-form">
        <Input
          label="Email"
          value={""}
          onChange={(value) => updateForm(value, "email")}
        />
        <Input
          label="Mot de passe"
          type="password"
          value={""}
          onChange={(value) => updateForm(value, "password")}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="tenant">Locataire</option>
          <option value="owner">Propriétaire</option>
        </select>
        <div className="btns">
          <Button
            type={"button"}
            text={"Creer son compte"}
            onClick={handleRedirect}
          />
          <Button
            type={"submit"}
            text={"Valider"}
            color={"var(--green-light)"}
          />
        </div>
      </form>
    </>
  );
};
export default SignInForm;
