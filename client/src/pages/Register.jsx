import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Register = () => {
    const authContext = useContext(AuthContext);
    const { register } = authContext;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const { username, email, password, confirmPassword } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            await register({ username, email, password });
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.msg || 'Registration failed');
        }
    };

    return (
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Create Account</h2>
                    <p>Get started with your free account today</p>
                </div>

                {error && <div className="error-msg">{error}</div>}

                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={onChange}
                            className="form-input"
                            placeholder="johndoe"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            className="form-input"
                            placeholder="name@example.com"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            className="form-input"
                            placeholder="••••••••"
                            required
                            minLength="6"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={onChange}
                            className="form-input"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary">
                        Sign Up
                    </button>
                </form>
                <div className="auth-footer">
                    Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
