import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      background: 'white',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      padding: '16px 0'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#3b82f6',
          textDecoration: 'none'
        }}>
          📝 Notes Manager
        </Link>
        
        {user && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <span style={{ color: '#6b7280' }}>
              Welcome, {user.name}!
            </span>
            <button 
              onClick={handleLogout}
              className="btn btn-secondary"
              style={{ padding: '8px 16px', fontSize: '14px' }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
