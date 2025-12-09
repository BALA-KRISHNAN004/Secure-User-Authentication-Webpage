import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div style={{ padding: '2rem' }}>
            <div className="auth-card" style={{ maxWidth: '600px' }}>
                <div className="auth-header">
                    <h2>Dashboard</h2>
                    <p>Welcome to your secure area</p>
                </div>
                
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <p style={{ fontSize: '1.2rem' }}>Hello, <strong>{user && user.username}</strong>!</p>
                    <p style={{ color: 'var(--text-muted)' }}>You have successfully authenticated.</p>
                </div>

                <button onClick={logout} className="btn-primary" style={{ background: '#ef4444' }}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
