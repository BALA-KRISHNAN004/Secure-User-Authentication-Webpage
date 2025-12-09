import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {
    const authContext = useContext(AuthContext);
    const { login } = authContext;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError('');
        try {
            await login(formData);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.msg || 'Login failed');
        }
    };

    return (
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Welcome Back</h2>
                    <p>Enter your credentials to access your account</p>
                </div>
                
                {error && <div className="error-msg">{error}</div>}

                <form onSubmit={onSubmit}>
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
                        />
                    </div>
                    <button type="submit" className="btn-primary">
                        Sign In
                    </button>
                </form>
                <div className="auth-footer">
                    Don't have an account? <Link to="/register" className="auth-link">Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
