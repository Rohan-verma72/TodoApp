import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import './login.css';
import { API_URL } from "../api";

export function Login(props) {
  const [users, setUsers] = useState([
    { user_name: null, user_id: null, password: null, email: null, date:null},
  ]);
  let navigate = useNavigate();

  const [cookie, setCookie, removeCookie] = useCookies(["userid", "username"]);

  function LoadUser() {
    axios(`${API_URL}/users`).then(response => {
      setUsers(response.data);
    })
    
  }
  useEffect(() => {
    LoadUser();
  }, []);

  const formik = useFormik({
    initialValues: {
      user_name: "",
      password: "",
      user_id: "",
      email: "",
    },
    onSubmit: (user) => {
      var userDetails = users.find(item => item.user_id == user.user_id);
      if (userDetails) {
        if (userDetails.password === user.password) {
          setCookie("userid", userDetails.user_id);
          setCookie("username", userDetails.user_name);
          navigate("/dashboard");
        } else {
          alert("Inavlid Password");
        }
      } else {
        alert("Inavlid User Id");
      }
    }
  })

  return (
    <div className="container-fluid login-page">

      <form className={` p-4 ${props.width}`} onSubmit={formik.handleSubmit}>
        <h4 className="bi bi-person fs-5 ">User Login</h4>
        <div>
          <TextField
            type="text"
            name="user_id"
            variant="standard"
            label="User_Id"
            className="mb-2 form-control"
            onChange={formik.handleChange}
          />
        </div>

        <div>
          <TextField
            type="password"
            name="password"
            variant="standard"
            label="Password"
            className="mb-3 form-control"
            onChange={formik.handleChange}
          />
        </div>
        <Button type="submit" variant="contained">
          Login
        </Button>
      
      </form>
    </div>
  );
}
