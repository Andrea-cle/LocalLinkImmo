import { setUser, startSignUpLoading, stopSignUpLoading } from "../redux/reducers/user.reducer";
import { postRequest } from "./api";
export const signUpThunk = () => async (dispatch, getState) => {
  
  const { signUpForm, loading } = getState().userState;
  if (loading) return;
  dispatch(startSignUpLoading());
  const response = await postRequest("users/sign-up", signUpForm);
  console.log(response.result.message);
  dispatch(
    setUser({ email: response.result.message.email, pseudo: response.result.message.pseudo })
  );
  dispatch(stopSignUpLoading());
};