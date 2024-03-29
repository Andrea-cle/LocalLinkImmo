import { createSlice } from "@reduxjs/toolkit";

const USER_STATE = {
  user: {
    email: "",
    password: "",
  },
  signInForm: {
    email: "",
    password: "",
  },
  signInLoading: false,
  signInError: null,
  signUpForm: {
    email: "",
    password: "",
  },
  signUpLoading: false,
  signUpError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: USER_STATE,
  reducers: {
    setUser: (state, action) => {
      const { email, password } = action.payload;
      return {
        ...state,
        signUpLoading: false,
        signInLoading: false,
        signInError: null,
        user: {
          ...state.user,
          email,
          password,
        },
      };
    },
    updateSignInForm: (state, action) => {
      const { input, value } = action.payload;
      return {
        ...state,
        signInForm: {
          ...state.signInForm,
          [input]: value,
        },
      };
    },
    startSignInLoading: (state, action) => {
      return {
        ...state,
        signInLoading: true,
      };
    },
    stopSignInLoading: (state, action) => {
      return {
        ...state,
        signInLoading: false,
      };
    },
    setSignInError: (state, action) => {
      return {
        ...state,
        signInError: action.payload.error,
        signInLoading: false,
      };
    },
    updateSignUpForm: (state, action) => {
      const { input, value } = action.payload;
      return {
        ...state,
        signUpForm: {
          ...state.signUpForm,
          [input]: value,
        },
      };
    },
    startSignUpLoading: (state, action) => {
      return { ...state, signUpLoading: true };
    },
    stopSignUpLoading: (state, action) => {
      return { ...state, signUpLoading: false };
    },
    setSignUpError: (state, action) => {
      return {
        ...state,
        signUpError: action.payload.error,
        signUpLoading: false,
      };
    },
  },
});

export const {
  setUser,
  updateSignInForm,
  startSignInLoading,
  stopSignInLoading,
  setSignInError,
  updateSignUpForm,
  startSignUpLoading,
  stopSignUpLoading,
  setSignUpError,
} = userSlice.actions;
export default userSlice.reducer;
