import React, { useState, useEffect } from 'react';

const UserFetcher = () => {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const users = await response.json();
                setUserList(users);
                setLoading(false);
            } catch (error) {
                console.error('Error loading users:', error);
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) return <div>Loading users...</div>;

    return (
        <div>
            <h2>Display User Data</h2>
            <ul>
                {userList.map((user) => (
                    <li key={user.id}>
                        {user.name} ({user.email})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserFetcher;
