import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom";
import './delete.css';
import { API_URL } from "../api";

export function Delete(){

       let navigate=useNavigate();
       let params=useParams();
       

    const[appointment, setAppointment]=useState({userid:null, title:null, disdescription:null, date:null});

    useEffect(()=>{
        axios.get(`${API_URL}/appointments/${params.id}`)
        .then(response=>{
            setAppointment(response.data);
        })
        },[])

        function handleDeleteClick(){
            var confirm = window.confirm('Are you Sure?\nWant To Delete');
            if(confirm === true){
                axios.delete(`${API_URL}/appointments/${params.id}`)
                .then(()=>{
                    console.log('Deleted')});
                    navigate("/dashboard");
                }
            }

    
    return(
        <div className="container-fluid delete-page"> 
        <div className="fw-bold fs-5">Delete Appointments</div>
        <dl>
            <dt>Title</dt>
            <dd>{appointment.title}</dd>
            <dt>Description</dt>
            <dd>{appointment.description}</dd>
            <dt>Dtae</dt>
            <dd>{appointment.date}</dd>
        </dl>
        <button onClick={handleDeleteClick} className="btn btn-warning">Delete</button>
        <Link className="btn btn-danger mx-2" to="/dashboard">Cancel</Link>

        </div>
    )
}