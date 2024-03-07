import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./signinForm.scss";
import { APP_ROUTES } from "../../constants/route.const";

const SignInForm = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate(APP_ROUTES.DASHBOARD, { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: form.email,
        connected: true,
      })
    );
    navigate(APP_ROUTES.DASHBOARD, { replace: true });
  };

  const updateForm = (value, inputName) => {
    setForm({
      ...form,
      [inputName]: value,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="sign-in-form">
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
          <Button
            type={"submit"}
            text={"Se connecter"}
            color={"var(--primary)"}
          />
        </div>
      </form>
    </>
  );
};

export default SignInForm;
