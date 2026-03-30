import { useEffect, useState, useCallback } from "react";
import { useCookies } from "react-cookie";
import { Link, Outlet, useNavigate } from "react-router-dom";
import './dashboard.css';

export default function Dashboard() {
  const [cookies, removeCookie] = useCookies(["username", "userid"]);
  const [searchString, setSearchString]=useState('');

  let navigate = useNavigate();

  useEffect(() => {
    if (cookies["userid"] === undefined) {
      navigate("/login");
    }
  }, [cookies, navigate]);

  const handleSignout=useCallback(()=> {
    removeCookie("userid");
    removeCookie("username");
    navigate("/");
  },[removeCookie, navigate])

  return (
    <div className="container-fluid mt-5 dashboard-container">
      <div className="row d-flex dashboard-row">
        <div className="col-2 sidebar">
          <div className="fw-bold fs-6">{cookies["username"]} - Dashboard</div>
          <nav className="mt-3">
            <div className="bi bi-pencil-square me-2"><Link className="text-decoration-none text-dark" to="">My Task</Link></div>
            <div className="bi my-4 bi-calendar-date ">Calendar</div>
            <div bi bi-folder>
              Categories
            </div>
          </nav>
        </div>
        <div className="col-10 main-content">
          <div role="header" className="d-flex justify-content-between header-actions">
            <div className="w-50">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Appointments, Categories"
                  onChange={(e)=>{setSearchString(e.target.value);}}
                />
                <button className="btn btn-secondary bi bi-search"></button>
              </div>
            </div>
            <div className="mt-3">
                <Link className="btn btn-primary bi bi-plus mx-2" to="add">Add New</Link>
              <button
                onClick={handleSignout}
                className="btn btn-warning bi bi-person"
              >
                Signout
              </button>
            </div>
          </div>
          <div>
            <Outlet context={{searchString}} />
          </div>
        </div>
      </div>
    </div>
  );
}
