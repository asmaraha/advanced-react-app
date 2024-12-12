import React, { useState, useEffect } from 'react';

const UserCache = () => {
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);

    const retrieveUsers = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const users = await response.json();
            setUserData(users);
            localStorage.setItem('cachedUserList', JSON.stringify(users));
        } catch (err) {
            setFetchError('Unable to fetch user data.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const cachedData = localStorage.getItem('cachedUserList');
        if (cachedData) {
            setUserData(JSON.parse(cachedData));
        } else {
            retrieveUsers();
        }
    }, []);

    if (isLoading) return <div>Fetching data...</div>;
    if (fetchError) return <div>{fetchError}</div>;

    return (
        <div>
            <h2>Available Users</h2>
            <ul>
                {userData.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserCache;
