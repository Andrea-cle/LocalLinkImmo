import React, { useState } from "react";
import SignUp from "../SignUp/SignUp";
import SignInForm from "../SignInForm/SignInForm";
import Button from "../Button/Button";

const User = () => {
  return (
    <section className="user">
      <div>
        <h2>Espace utilisateur</h2>
      </div>
      <div className="connexion">
        <h3>connexion</h3>
        <SignInForm />
        <Button />
      </div>
      <div className="inscription">
        <h3>Inscritpion</h3>
        <SignUp />
      </div>
    </section>
  );
};

export default User;
