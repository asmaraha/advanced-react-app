import React, { useState, useEffect } from 'react';

const MasterDetail = () => {
    const [userList, setUserList] = useState([]);
    const [selectedUserInfo, setSelectedUserInfo] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const users = await response.json();
                setUserList(users);
            } catch (error) {
                console.error('Error loading users:', error);
            }
        };

        fetchUsers();
    }, []);

    const getUserDetails = async (id) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const userData = await response.json();
            setSelectedUserInfo(userData);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    return (
        <div>
            <h2>Master-Detail View</h2>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {userList.map((user) => (
                    <tr key={user.id} onClick={() => getUserDetails(user.id)}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedUserInfo && (
                <div>
                    <h3>Details</h3>
                    <p><strong>Name:</strong> {selectedUserInfo.name}</p>
                    <p><strong>Email:</strong> {selectedUserInfo.email}</p>
                    <p><strong>Phone:</strong> {selectedUserInfo.phone}</p>
                </div>
            )}
        </div>
    );
};

export default MasterDetail;
