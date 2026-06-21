import React from 'react';

const LoadingSpinner = ({ text = '加载中...' }) => (
    <div className="loading-container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        minHeight: '400px',
    }}>
        <div className="loading-spinner" style={{
            width: '40px',
            height: '40px',
            border: '4px solid #e0e0e0',
            borderTop: '4px solid #007BFF',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            marginBottom: '16px',
        }}></div>
        <style>{`
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `}</style>
        <p style={{ color: '#666', fontSize: '14px' }}>{text}</p>
    </div>
);

export default LoadingSpinner;
