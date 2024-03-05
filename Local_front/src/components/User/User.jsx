import React, { useState } from "react";
import SignUp from "../SignUp/SignUp";
import SignInForm from "../SignInForm/SignInForm";
import "./user.scss";

const User = () => {
  return (
    <section className="user">
      <div>
        <h2>Espace utilisateur</h2>
      </div>
      <div className="connexion">
        <h3>Connexion</h3>
        <SignInForm />
      </div>
      <div className="inscription">
        <h3>Inscription</h3>
        <SignUp />
      </div>
    </section>
  );
};

export default User;
