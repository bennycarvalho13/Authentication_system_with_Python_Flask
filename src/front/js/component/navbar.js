import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ml-auto">
					{ !store.token ?
					<div>
					<Link to="/signup">
						<button className="btn mx-2 btn-success">Sign Up</button>
					</Link> 
					<Link to="/login">
						<button className="btn btn-primary">Log in</button>
					</Link> 
					</div>
					:
					<div>
					<Link to="/private">
						<button className="btn mx-2 btn-dark">Private Page</button>
					</Link> 
					<Link to="/">
						<button onClick={() => actions.logout()} className="btn btn-primary">Log out</button>
					</Link>
					</div>
					}
				</div>
			</div>
		</nav>
	);
};
