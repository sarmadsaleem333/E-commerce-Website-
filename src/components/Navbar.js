import React from 'react'
import { Link, useLocation } from "react-router-dom";

export default function Navbar(props) {
    let location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        global.isUser = false;
        global.isVendpr = false;
    }
    return (
        <>

            <nav className="navbar navbar-expand-lg  navbar-dark bg-primary" id='navbar'>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">{props.name}
                        <i className="fa-solid fa-cart-shopping"></i></a>
                    {/* here is the icon */}

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {localStorage.getItem("token") ?
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === "/fashion" ? "active" : ""}`} to="/fashion">Fashion</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === "/grocery" ? "active" : ""}`} to="/grocery">Grocery</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === "/electronicitem" ? "active" : ""}`} to="/electronicitem">Electronic Items</Link>
                                </li>

                                {global.isVendor ?
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname === "/myitem" ? "active" : ""}`} to="/myitem">My Items</Link>
                                    </li>
                                    :
                                    <li className="nav-item">

                                    </li>

                                }

                            </ul> :
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">

                                </li>
                                <li className="nav-item">

                                </li>
                                <li className="nav-item">

                                </li>
                            </ul>


                        }
                        <div className="d-flex navbar-nav  mb-2 mb-lg-0 ">
                            {localStorage.getItem("token") ?
                                <>

                                    <li className="nav-item mx-2">
                                        <Link type="button" onClick={handleLogout} className={`btn btn-light ${location.pathname === "/login" ? "active" : ""}`} to="/login"  > Log Out</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                                    </li>
                                    { global.isUser?
                                        <li className="nav-item">
                                            <Link className={`nav-link ${location.pathname === "/mywallet" ? "active" : ""}`} to="/mywallet">My Wallet</Link>
                                        </li>:
                                        ""
                                    }
                                </>


                                :
                                <>
                                    <li className="nav-item mx-2">
                                        <Link type="button" className={`btn btn-light ${location.pathname === "/signup" ? "active" : ""}`} to="/signup">Sign Up</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link type="button" className={`btn btn-light ${location.pathname === "/login" ? "active" : ""}`} to="/login">Login</Link>
                                    </li>
                                </>
                            }

                        </div>
                    </div>
                </div>
            </nav>
        </>

    )
}
