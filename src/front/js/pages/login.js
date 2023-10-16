import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate(); 

    console.log("this is your token: ", token);

	const HandleClick = () =>
	{
        actions.login(email, password)
	}

    if (store.token && store.token !== "" && store.token !== undefined) navigate("/private")

	return (
		<div className="text-center mt-5">
            {(store.token && store.token !== "" && store.token !== undefined) ? 
            <div>
                <h1>logged in</h1>
                <p>{"You are logged in this token: " + token}</p>
            </div>:
            <div>
                <h1>Log In</h1>
                <input type="text" placeholder="email" onChange={(e) => {setEmail(e.target.value)}}/>
                <input type="password" placeholder="password"  onChange={(p) => {setPassword(p.target.value)}}/>
                <button className="btn btn-primary" onClick={()=> {HandleClick()}}>Login</button>
            </div> 
            }
		</div>
	);
};
