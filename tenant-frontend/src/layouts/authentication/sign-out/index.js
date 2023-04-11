import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../auth";

function SignOut() {
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const signOut = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:8000/api/logout/",
          { refresh_token: localStorage.getItem("refresh_token") },
          {
            headers: {
              "Content-Type": "application/json",
              withCredentials: true,
            },
            credentials: "include",
          }
        );
        console.log(data);
        localStorage.clear();
        axios.defaults.headers.common.Authorization = null;
        navigate("/dashboard");
      } catch (error) {
        console.log(error);
        console.log("logout not working");
      }
    };
    auth.logout();
    signOut();
  }, []);
  return <div> </div>;
}

export default SignOut;
