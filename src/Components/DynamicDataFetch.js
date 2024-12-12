import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setUsers(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div style={styles.loading}>Loading...</div>;
    }

    if (error) {
        return <div style={styles.error}>Error: {error}</div>;
    }

    return (
        <div style={styles.container}>
            <h1>User List</h1>
            <ul style={styles.userList}>
                {users.map((user) => (
                    <li key={user.id} style={styles.userItem}>
                        <strong>{user.name}</strong>: {user.email}
                    </li>
                ))}
            </ul>
            <Link to="/" style={styles.backButton}>Back to Home</Link>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        marginTop: '2rem',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        maxWidth: '600px',
        margin: '2rem auto',
    },
    loading: {
        textAlign: 'center',
        fontSize: '1.5rem',
        marginTop: '2rem',
    },
    error: {
        textAlign: 'center',
        color: 'red',
        marginTop: '2rem',
    },
    userList: {
        listStyleType: 'none',
        padding: 0,
    },
    userItem: {
        marginBottom: '0.5rem',
        borderBottom: '1px solid #eee',
        padding: '0.5rem 0',
    },
    backButton: {
        display: 'inline-block',
        marginTop: '1rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#007bff',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '4px',
        fontWeight: 'bold',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
};

export default UserList;
