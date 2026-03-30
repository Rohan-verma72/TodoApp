import { Login } from "./todo-login";
import { Register } from "./todo-register";
import './home.css';
export function Home() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div className="fs-1 text-center mt-5 ">
            <span className="fw-bold text-primary ">Master Your Day,</span>
            <br />
            <span className="fs-3">One Task at a Time</span>
            <div className="mt-4">
              <img src="img-1.jpg" width="100%" height="300" alt="todo" />
            </div>
          </div>
        </div>
        <div className="col">
           <div className="mt-5 ms-5">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <button
                  className="nav-link active"
                  data-bs-toggle="tab"
                  data-bs-target="#login"
                  type="button"
                >
                  User Login
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#register"
                  type="button"
                >
                  Register
                </button>
              </li>
            </ul>

            <div className="tab-content">
              <div className="tab-pane fade show active" id="login">
                <Login width="w-50" />
              </div>
              <div className="tab-pane fade" id="register">
                <Register width="w-50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
