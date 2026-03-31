import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate, useParams, Link } from "react-router-dom";
import './edit.css';
import { API_URL } from "../api";

export function Edit(){


    let navigate=useNavigate();
    let params=useParams();

    const[cookie, setCookie, removeCookie]=useCookies(["userid", "username"]);
    const[appointment, setAppointment]=useState({user_id:null, title:null, description:null, });

    function loadData(){
        axios.get(`${API_URL}/appointments/${params.id}`)
        .then(response=>{
            setAppointment(response.data);
        })
    }
    useEffect(()=>{
      loadData();
    },[])

    const formik=useFormik({
        initialValues:{
            title:appointment.title,
            description:appointment.description,
            date:appointment.date,
            user_id:cookie["userid"]
        },
        onSubmit:(appointment)=>{
            axios.put(`${API_URL}/appointments/${params.id}`,appointment)
            .then(()=>{
                console.log("Saved...")
            });
            alert('Appointment update');
            navigate("/dashboard");
        },
        enableReinitialize:true
    })

    return(
        <div className="container-fluid edit-page"> 
        <div className="card p-4 shadow-sm">
        <div className="fw-bold fs-5 mb-3">Edit Appointment</div>
        <form onSubmit={formik.handleSubmit}>
            <dl>
                <dt>Title</dt>
                <dd><input type="text" name="title" value={formik.values.title} onChange={formik.handleChange} /></dd>
                <dt>Description</dt>
                <dd><textarea rows={4}  type="text" name="description" value={formik.values.description} onChange={formik.handleChange}  /></dd>
                <dt>Date</dt>
                <dd><input onChange={formik.handleChange} type="date" name="date" value={formik.values.date}/></dd>
            </dl>
            <button type="submit" className="btn btn-success">Save</button>
            <Link to={"/dashboard"} className="btn btn-danger mx-2">Cancel</Link>

        </form>
        </div>
        </div>
    )
}