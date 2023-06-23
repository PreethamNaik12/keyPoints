import React, {useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Input } from '@geist-ui/core'

const Login = (props) => {

    const [credentials, setCredentials] = useState({email: "", password: ""});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",

            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          });
          const json = await response.json();
          console.log(json.email);
          if( json.success ) {
            //Save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            localStorage.setItem('email', json.email);
            navigate("/");
            props.showAlert("Logged In Successfully", "success");
          } else {
            props.showAlert("Invalid Credentials", "danger")
          }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <form  onSubmit={handleSubmit}>  
    {/* on submit is used for forms not buttons */}
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <Input htmlType="email" scale={4/3} width="100%" id="email" name="email" placeholder="Scale 4/3" value={credentials.email} onChange={onChange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <Input htmlType="password" scale={4/3} width="100%" id="password" name="password" placeholder="Scale 4/3" value={credentials.password} onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
    </form>
  )
}

export default Login