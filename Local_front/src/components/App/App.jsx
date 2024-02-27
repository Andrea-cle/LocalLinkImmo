import { APP_ROUTES } from "../../constants/route.const";
import  { useState } from "react";
import "./App.scss";
import Header from "../Header/Header";
import Home from "../Home/Home";



const App = () => {

    return(
        <>
        <Header/>
<main>
    <Home></Home>
          <navbar></navbar>    
        </main>
        </>
    )
}
export default App;
