import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Private = () => {
    const { store, actions } = useContext(Context);
	useEffect(() => {
		if(store.token && store.token != "" && store.token != undefined) actions.getMessage()
	}, [store.token]) 

	return (
		<div className="text-center mt-5">
            {(store.token && store.token != "" && store.token != undefined) ?
            <div>
			    <h1>Hello {store.message}</h1>
                <p>Welcome to your private page</p>
		    </div>:
            <div>
                <h1 className="text-danger">Unauthorized!!</h1>
            </div>
            }
        </div>
	);
};
