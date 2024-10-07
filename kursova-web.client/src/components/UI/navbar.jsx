import { useNavigate } from "react-router-dom";

function Navbar() {

    const router = useNavigate()
    const roles = localStorage.getItem('roles');

    return (
        <>
            <div className="navbar navbar-expand-lg bg-primary-subtle">
                <div className="container-fluid">
                    <a className="navbar-brand">Navbar</a>
                    <button className="navbar-toggler" type="button"  data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {roles === "Admin"
                                ? <li className="nav-item">
                                      <button className="nav-link" onClick={() => router(`survey/createList`)}>Create Survey</button>
                                </li>
                                : <p></p>
                            }
                            <li className="nav-item">
                                <button className="nav-link" onClick={() => router(`survey`)}>Active Survey</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar