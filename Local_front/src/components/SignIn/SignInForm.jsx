import "./signinForm.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { switchRoute } from "../../redux/reducers/route.reducer";
import { APP_ROUTES } from "../../constants/route.const";
const SignInForm = (props) => {
  const dispatch = useDispatch();
  // const { signUpForm, loading } = useSelector((store) => {
  //   return store.userState;
  // });
  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(signUpThunk(signUpForm));
    // dispatch(signUpThunk());
  };
  const updateForm = (value, inputName) => {
    // dispatch(updateSignUpForm({ value, inputName }));
  };
  const handleRedirect = () => {
    dispatch(switchRoute({ route: APP_ROUTES.SIGN_UP }));
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="sign-up-form"
      >
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