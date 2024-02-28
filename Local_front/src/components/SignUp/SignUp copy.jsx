import "./signup.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateSignUpForm } from "../../redux/reducers/user.reducer";
import { APP_ROUTES } from "../../constants/route.const";
// import { switchRoute } from "../../redux/reducers/route.reducer";
const SignUpForm = (props) => {
  const dispatch = useDispatch();
  const { signUpForm, loading, user } = useSelector((store) => {
    return store.userState;
  });
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const updateForm = (value, inputName) => {
    dispatch(updateSignUpForm({ value, inputName }));
  };
  const handleRedirect = () => {
    dispatch(switchRoute({ route: APP_ROUTES.SIGN_IN }));
  };
  return (
    <>
      <div>
        <p>User name: {user.pseudo || ""}</p>
      </div>
      <form onSubmit={handleSubmit} className="sign-up-form">
        <Input
          label="Email"
          required={true}
          value={signUpForm.email}
          onChange={(value) => updateForm(value, "email")}
        />
        <Input
          label="Mot de passe"
          type={"password"}
          value={signUpForm.password}
          onChange={(value) => updateForm(value, "password")}
        />
        <Input
          label="Confirmation du mot de passe"
          value={signUpForm.confirmPass}
          onChange={(value) => updateForm(value, "confirmPass")}
        />

        <div className="btns">
          <Button
            type={"button"}
            text={"Se connecter"}
            onClick={handleRedirect}
          />
          <Button
            type={"submit"}
            text={loading ? "Chargement..." : "Valider"}
            disabled={loading}
            color={"var(--green-light)"}
          />
        </div>
      </form>
    </>
  );
};
export default SignUpForm;
