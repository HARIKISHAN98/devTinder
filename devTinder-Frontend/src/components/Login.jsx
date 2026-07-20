import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';

const Login = () => {

  const [email, setEmail] = useState("hari@gmail.com");
  const [password, setPassword] = useState("Kusha@123");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/login`, { email, password }, { withCredentials: true });
      // console.log('Login successful:', res.data);
      dispatch(addUser(res.data));
      navigate('/');
    } catch (error) {
      setError(error.response?.data || 'Login failed');
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
          {error && <p className="text-error">{error}</p>}
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
