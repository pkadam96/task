import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://country-app-jmyt.onrender.com/user/login', formData);
            alert('Login successful!');
            navigate('/home')
            setFormData({ email: '', password: '' })
        }
        catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='container'>
            <div className='login'>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="email" name="email" placeholder='Enter Email'
                            value={formData.email} onChange={handleChange} required />
                    </div>
                    <div>
                        <input type="password" name="password" placeholder='Enter Password' value={formData.password} onChange={handleChange} required />
                    </div>
                    <button type="submit">Login</button>
                    <p>Dont have an account? <Link to='/register'>Sign up</Link> </p>
                </form>
            </div>
        </div>
    );
};

export { Login };
