import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [credentials2, setCredentials2] = useState({ vemail: "", vpassword: "" });
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const onChange2 = (e) => {
        setCredentials2({ ...credentials2, [e.target.name]: e.target.value });
    }

    const handleSubmit1 = async (e) => {
        e.preventDefault();
        const response = await fetch(" http://localhost:5000/api/auth/loginuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem("token", json.authtoken);
            global.isUser=true;
            global.isVendor=false;
            navigate("/fashion");
        }
        else {
            alert("You entered Invalid Credentials")
        }
    }
    const handleSubmit2 = async (e) => {
        e.preventDefault();
        const response = await fetch(" http://localhost:5000/api/vendor_auth/loginvendor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials2.vemail, password: credentials2.vpassword })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem("token", json.authtoken);
            global.isVendor=true;
            global.isUser=false;
            navigate("/fashion");


        }
        else {
            alert("You entered Invalid Credentials")
        }
    }
    return (
        <>
            {/* For user  */}
            <div className='d-flex flex-column justify-content-center my-3'>
                <div className='align-self-center'> <h3>Login as User</h3> </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" name='email' id="exampleInputEmail1" value={credentials.email} baaria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" name='password' value={credentials.password} class="form-control" id="exampleInputPassword1" onChange={onChange} />
                </div>
                <div className='align-self-center '>
                    <button type="submit" class="btn btn-primary " onClick={handleSubmit1}> Login </button>
                </div>
            </div>

            {/* For vendor  */}
            <div className='d-flex flex-column justify-content-center my-3'>
                <div className='align-self-center'> <h3>Login as Vendor</h3> </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" name='vemail' id="exampleInputEmail1" value={credentials2.vemail} baaria-describedby="emailHelp" onChange={onChange2} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" name='vpassword' value={credentials2.vpassword} class="form-control" id="exampleInputPassword1" onChange={onChange2} />
                </div>
                <div className='align-self-center '>
                    <button type="submit" class="btn btn-primary " onClick={handleSubmit2}> Login </button>
                </div>
            </div>


        </>
    )
}
