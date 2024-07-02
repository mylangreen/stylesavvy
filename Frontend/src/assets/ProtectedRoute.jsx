import {useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { REFRESH_TOKEN,ACCESS_TOKEN } from "./constants";
import api from "./api"



function ProtectedRoute({children}) {
   const [allow, setAllow] = useState(null);

   useEffect(()=>{
    auth().catch(()=> setAllow(false));
   },[])

    const refreshToken = async() => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const response = await api.post("/account/token/refresh",{
                refresh:refreshToken
            });
            if(response.status == 200){
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                setAllow(true);
            }
        } catch (error) {
            console.error('Error refreshing the token:', error);
            setAllow(false);
        }
    };

    const auth = async()=>{
    const token = localStorage.getItem(ACCESS_TOKEN);
    if(!token){
        setAllow(false);
        return
    }
    const decode = jwtDecode(token)
    const tokenExpiration = decode.exp
    const now = Date.now() / 1000
    if(now>tokenExpiration){
        await refreshToken()
    }
    else{
        setAllow(true);
    }
    };


    if (allow === null){
        return <div>Loading...</div>
    }

    return allow ? children : <Navigate to="/login"/>
};
export default ProtectedRoute;