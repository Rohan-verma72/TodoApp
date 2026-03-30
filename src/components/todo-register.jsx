import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import './register.css';
import * as yup from "yup";

export function Register(props) {
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      user_id: "",
      user_name: "",
      password: "",
      email: "",
    },
    
    onSubmit: (user) => {
      axios.post(`http://localhost:3000/users`, user).then(() => {
        console.log('Registered');
         alert("Registered Successfully..");
         console.log(user);
      navigate("/login");
      })
      .catch(()=>{
         alert("Registration Failed");
      })
    }
  })
  return (
    <div className="container-fluid register-page">
      <form   className={`p-4 ${props.width}`} onSubmit={formik.handleSubmit}>
        <div>
          <TextField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.user_id}
            type="text"
            name="user_id"
            label="User_Id"
            variant="standard"
            className="mb-3 form-control"
          />
            { formik.touched.user_id && formik.errors.user_id}
        </div>
        <div>
          <TextField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.user_name}
            type="text"
            name="user_name"
            label="User_Name"
            variant="standard"
            className="mb-3 form-control"
          />
            { formik.touched.user_name && formik.errors.user_name}

        </div>
        <div>
          <TextField
            onChange={formik.handleChange}
             onBlur={formik.handleBlur}
            value={formik.values.password}
            type="password"
            name="password"
            label="Password"
            variant="standard"
            className="mb-3 form-control"
          />
            { formik.touched.password && formik.errors.password}

        </div>
        <div>
          <TextField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type="email"
            name="email"
            label="Email"
            variant="standard"
            className="mb-3 form-control"
          />
            { formik.touched.email && formik.errors.email}

        </div>
        <Button type="submit" variant="contained">
          Register
        </Button>

        <div className="mt-3">
          <Link to="/login">Existing User - Sigin</Link>
        </div>
      </form>
    </div>
  );
}
