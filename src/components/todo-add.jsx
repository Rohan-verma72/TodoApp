import axios from "axios";
import { useFormik } from "formik";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import './add.css';

export function Add() {
  const [cookies ] = useCookies([
    "username",
    "userid",
  ]);
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      date: new Date(),
      user_id: cookies["userid"],
    },
    onSubmit: (appointment) => {
      axios.post(`http://localhost:3000/appointments`, appointment).then(() => {
        console.log("Appointment Added");
      });
      alert("Appointment Addedd SuccesFully");
      navigate("/dashboard");
    },
  });

  return (
    <div className="container-fluid add-page">
      <div className="card p-4 shadow-sm">
      <div className="fw-bold fs-5 mb-3">Add Appointment</div>

      <form onSubmit={formik.handleSubmit}>
        <dl>
          <dt>Title</dt>
          <dd>
            <input onChange={formik.handleChange} type="text" name="title" />
          </dd>
          <dt>Description</dt>
          <dd>
            <textarea
              rows={4}
              onChange={formik.handleChange}
              name="description"
            />
          </dd>
          <dt>Date</dt>
          <dd>
            <input onChange={formik.handleChange} type="date" name="date" />
          </dd>
        </dl>
        <button type="submit" className="btn btn-primary ">
          Add
        </button>
        <Link to="/dashboard" className="btn btn-danger mx-2">
          Cancel
        </Link>
      </form>
    </div>
    </div>
  );
}
