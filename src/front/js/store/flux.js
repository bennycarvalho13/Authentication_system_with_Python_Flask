const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token : null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			syncTokenSessionStore: () =>{
				const oldToken = sessionStorage.getItem("token");
				if (oldToken && oldToken !== "" && oldToken !== undefined )
				{
					setStore({ token: oldToken });
					console.log("synching session storage token");
				}
			},
			logout: () =>{
				sessionStorage.removeItem("token");
				setStore({ token: null });
				console.log("removing session storage token");
			},
			signUp: async (email, password) =>{
				const opts = {
					method : "POST",
					headers : {
						"Content-Type": "application/json"
					},
					body : JSON.stringify({
		
						"email": email,
						"password": password
					})
		
				}
				try {
				const resp = await fetch('https://automatic-sniffle-j4rw4jj779pfqv9j-3001.app.github.dev/api/sign_up', opts)
				if(resp.status !== 200)
				{
					alert("there has been an error");
					return false;
				}

				const data = await resp.json();
				console.log("this came from the backend", data);
				return true;
				} 
				catch (error) {
					console.error("there has benn an error Signing Up" + error);
				}
			},
			login: async (email, password) =>{
				const opts = {
					method : "POST",
					headers : {
						"Content-Type": "application/json"
					},
					body : JSON.stringify({
		
						"email": email,
						"password": password
					})
		
				}
				try {
				const resp = await fetch('https://automatic-sniffle-j4rw4jj779pfqv9j-3001.app.github.dev/api/token', opts)
				if(resp.status !== 200)
				{
					alert("there has been an error");
					return false;
				}

				const data = await resp.json();
				console.log("this came from the backend", data);
				sessionStorage.setItem("token", data.access_token);
				setStore({token: data.access_token})
				return true;
				} 
				catch (error) {
					console.error("there has benn an error login in" + error);
				}
			},

			getMessage: async () => {
				try{
					const store = getStore();  
					const opts = {
						headers : {
							"Authorization": "Bearer " + store.token
						}
					}
					// fetching data from the backend
					const resp = await fetch("https://automatic-sniffle-j4rw4jj779pfqv9j-3001.app.github.dev/api/hello", opts)
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
