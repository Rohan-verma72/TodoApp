import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react"
import { useCookies } from "react-cookie";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import './deatails.css';
import { API_URL } from "../api";

export function Details(){

    const[appointments, setAppointments]=useState([{id:null,user_id:null, title:null, description:null, date:Date()}]);
    const[cookies]=useCookies(['userid', 'username']);
    let {searchString} = useOutletContext();

    

const UserAppointments=useMemo(()=>{
    return appointments.filter(appointment=>appointment.user_id===cookies['userid']);


},[appointments, cookies]);

const FilteredAppointments=useMemo(()=>{
if(searchString === ""){
    return UserAppointments;
}
else{
    return UserAppointments.filter(task=> task.title.toLowerCase().includes(searchString.toLowerCase()));
}
},[UserAppointments, searchString]);

const LoadAppointments=useCallback(()=>{
    axios.get(`${API_URL}/appointments`)
    .then(response=>{
        setAppointments(response.data);
    })

},[])

    useEffect(()=>{
        LoadAppointments();
    },[LoadAppointments])

    return(
        <div className="container-fluid deatails-page">
            <div role="filter" className="mt-4 bg-light p-2">
                <div className="d-flex justify-content-baseline align-items-center">
                    <button className="btn bi bi-funnel">Filter</button>
                    <button className="btn bi bi-sort-alpha-down"></button>
                    <select className="form form-select w-25">
                        <option >Select Date</option>
                    </select>

                </div>

            </div>
            <div className="mt-2 table-responsive ">
                <table className="table table-hover responsive-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                        FilteredAppointments.map(appointment=>
                            <tr key={appointment.id}>
                                <td data-label="Title">{appointment.title}</td>
                                <td data-label="Description">{appointment.description}</td>
                                <td data-label="Date">{appointment.date}</td>
                                <td data-label="Actions">
                                    <div className="action-buttons">
                                        <Link to={`edit/${appointment.id}`} className="btn btn-warning bi bi-pen"></Link>
                                    <Link to={`delete/${appointment.id}`} className="btn btn-danger bi bi-trash mx-2"></Link>
                                    </div>
                                </td>
                            </tr>
                        )
                       }
                    </tbody>

                </table>

            </div>

        </div>
    )
}