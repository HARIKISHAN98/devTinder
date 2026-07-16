import { useState } from 'react';
import axios from 'axios';

const Login = () => {

  const [email, setEmail] = useState("hari@gmail.com");
  const [password, setPassword] = useState("Kusha@123");

  const handleLogin = () => {
    try {
      const data = axios.post('http://localhost:3000/login', { email, password }, { withCredentials: true });
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-200 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <div className="mb-4 ">
              <legend className="fieldset-legend my-1">Email</legend>
              <input type="email" className="input" placeholder="Type your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-4">
              <legend className="fieldset-legend my-1">password</legend>
              <input type="password" className="input" placeholder="Type your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>    
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
