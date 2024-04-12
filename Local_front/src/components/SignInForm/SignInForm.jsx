import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./signinForm.scss";
import { APP_ROUTES } from "../../constants/route.const";
import { postRequest } from "../../api/api";

const SignInForm = () => {
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation

  useEffect(() => {
    if (localStorage.getItem("/user")) {
      navigate(APP_ROUTES.DASHBOARD, { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Veuillez saisir un e-mail et un mot de passe");
      return;
    }
    try {
      const response = await postRequest(`/user/sign-in`, {
        email: form.email,
        password: form.password,
      });
      console.log(response.result.user.token);

      localStorage.setItem(`token`, JSON.stringify(response.result.user.token));
      localStorage.setItem(
        "/user",
        JSON.stringify({
          email: form.email,
          connected: true,
        })
      );
      navigate(APP_ROUTES.DASHBOARD, { replace: true });
    } catch (error) {
      setError(error.response.data);
    }
  };

  const updateForm = (value, inputName) => {
    setForm({
      ...form,
      [inputName]: value,
    });
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className="sign-in-form">
        <Input
          label="Email"
          id="Email"
          // required={true}
          value={form.email}
          onChange={(value) => updateForm(value, "email")}
        />

        <Input
          label="Mot de passe"
          type="password"
          // required={true}
          value={form.password}
          onChange={(value) => updateForm(value, "password")}
        />
        <div className="btns">
          <Button type={"submit"} text={"Go !"} color={"var(--primary)"} />
        </div>
      </form>
    </section>
  );
};

export default SignInForm;
