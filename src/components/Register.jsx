import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://country-app-jmyt.onrender.com/user/register', formData);
            alert('Registration successful!');
            setFormData({ name: '', email: '', password: '' })
        }
        catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='container'>
            <div className='login'>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="text" name="name" placeholder='Enter Name'
                            value={formData.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <input type="email" name="email" placeholder='Enter Email'
                            value={formData.email} onChange={handleChange} required />
                    </div>
                    <div>
                        <input type="password" name="password" placeholder='Enter Password' value={formData.password} onChange={handleChange} required />
                    </div>
                    <button type="submit">Register</button>
                    <p>Already have an account? <Link to='/'>Login</Link> </p>
                </form>
            </div>
        </div>
    );
};

export { Register };
