import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const SignUp = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate(); 

    console.log("this is your token: ", token);

	const HandleClick = () =>
	{
        actions.signUp(email, password)
        navigate("/login")
	}

	return (
		<div className="text-center mt-5">
            <div>
                <h1>Sign Up</h1>
                <input type="text" placeholder="email" onChange={(e) => {setEmail(e.target.value)}}/>
                <input type="password" placeholder="password"  onChange={(p) => {setPassword(p.target.value)}}/>
                <button className="btn btn-success" onClick={()=> {HandleClick()}}>Sign UP</button>
            </div> 
		</div>
	);
};
