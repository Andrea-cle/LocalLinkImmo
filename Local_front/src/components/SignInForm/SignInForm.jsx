import { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./signinForm.scss";

const SignInForm = (props) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de soumission du formulaire
  };

  const updateForm = (value, inputName) => {
    setForm({
      ...form,
      [inputName]: value,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="signinform">
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

        <div className="btns">
          <Button type={"submit"} text={"Valider"} color={"var(--primary)"} />
        </div>
      </form>
    </>
  );
};

export default SignInForm;
