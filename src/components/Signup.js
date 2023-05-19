import React, {useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Signup = (props) => {

  const [credentials, setCredentials] = useState({ fname: "",email: "", crt_password: "", cnf_password: ""});
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, email, crt_password} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createUser", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify({fname, email, crt_password})
      });
      const json = await response.json();
      console.log(json);

      if( json.success ) {
        //Save the auth token and redirect
        localStorage.setItem('token', json.authToken);
        navigate("/")
        props.showAlert("Account Created Successfully", "success");
      } else {
        props.showAlert("Invalid Credentials", "danger");
      }
    }

    const onChange = (e)=>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                <input type="text" className="form-control" id="fname" name="fname" placeholder='Enter your first name' onChange={onChange} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" placeholder='Enter your email' onChange={onChange} required/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Create Password</label>
                <input type="password" className="form-control" id="crt_password" name="crt_password" placeholder='Enter a password' onChange={onChange} required minLength={5}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">confirm Password</label>
                <input type="password" className="form-control" id="cnf_password" name="cnf_password" placeholder='Confirm your password' onChange={onChange} required minLength={5}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Signup