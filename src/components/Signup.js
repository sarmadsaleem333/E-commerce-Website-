import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function Signup() {
  let navigate=useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", phone: "" });
    const [credentials2, setCredentials2] = useState({ vname: "", vemail: "", vpassword: "", vphone: "" });
    const handleSubmit1 = async(e) => {
        e.preventDefault();
        const response = await fetch(" http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name:credentials.name,phone:credentials.phone,email: credentials.email, password: credentials.password })
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
            alert(json.error)
        }
    }
    const handleSubmit2 = async(e) => {
        e.preventDefault();
        const response = await fetch(" http://localhost:5000/api/vendor_auth/createvendor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ brandname:credentials2.vname,phone:credentials2.vphone,email: credentials2.vemail, password: credentials2.vpassword })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem("token", json.authtoken);
            global.isUser=false;
            global.isVendor=true;
            navigate("/fashion");
        }
        else {
            alert(json.error)
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const onChange2 = (e) => {
        setCredentials2({ ...credentials2, [e.target.name]: e.target.value });
    }
    return (
        <>
            {/* For user  */}
            <div className='d-flex flex-column justify-content-center my-3'>
                <div className='align-self-center'> <h3>Sign Up as User</h3> </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Name</span>
                    <input type="text" aria-label="First name" class="form-control" name='name' value={credentials.name} onChange={onChange} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Phone</span>
                    <input type="text" aria-label="First name" class="form-control" name='phone' value={credentials.phone} onChange={onChange} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
                </div>
                <div className='align-self-center '>
                    <button type="submit" class="btn btn-primary " onClick={handleSubmit1}>Create Account</button>
                </div>
            </div>

            {/* for vendor */}
            <div className='d-flex flex-column justify-content-center my-3'>
                <div className='align-self-center'> <h3>Sign Up as Vendor</h3> </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Brand Name</span>
                    <input type="text" aria-label="First name" class="form-control" name='vname' value={credentials2.vname} onChange={onChange2} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='vemail' value={credentials2.vemail} onChange={onChange2} />
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Phone</span>
                    <input type="text" aria-label="First name" class="form-control" name='vphone' value={credentials2.vphone} onChange={onChange2} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" name='vpassword' value={credentials2.vpassword} onChange={onChange2} />
                </div>
                <div className='align-self-center '>
                    <button type="submit" class="btn btn-primary " onClick={handleSubmit2}>Create Account</button>
                </div>
            </div>
        </>
    )
}
