import{lazy, Suspense}from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Login } from "./todo-login";
import { Home } from "./todo-home";
import { Register } from "./todo-register";
import { Add } from "./todo-add";
import { Details } from "./todo-details";
import { Delete } from "./todo-delete";
import { Edit } from "./todo.edit";
const Dashboard=lazy(()=>import('./todo-dashboard'));
export function Index() {
  return (
    <div className="container-fluid ">
      <BrowserRouter>
        <header className="d-flex justify-content-between align-item-cemter bg-light p-4">
          <div>
            <span className="bi fs-4 mx-2 bi-pencil-square"></span>
            <span className="fs-4 fw-bold">
              {" "}
              <Link to="/" className="text-secondary text-decoration-none">
                {" "}
                Task Manager{" "}
              </Link>
            </span>
          </div>
          <div>
            <span>
              <button className="btn mx-2 fw-bold">Features</button>
              <button className="btn mx-2 fw-bold">Pricing</button>
              <button className="btn mx-2 fw-bold">About</button>
              <button className="btn btn-primary">Get Started</button>
            </span>
          </div>
        </header>
        <section>
          <Suspense fallback={<div>Loading Component Please Wait..</div>}>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login w-25 />} />
            <Route path="register" element={<Register w-25 />} />
            <Route path="dashboard" element={<Dashboard />}>
              <Route path="" element={<Details />} />
              <Route path="details" element={<Details />} />
              <Route path="add" element={<Add />} />
              <Route path="delete/:id" element={<Delete />} />
              <Route path="edit/:id" element={<Edit />} />
            </Route>
          </Routes>
          </Suspense>
        </section>
      </BrowserRouter>
    </div>
  );
}
