import React, { useState, useEffect } from 'react';

const PaginatedUserList = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const usersPerPage = 2;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const userData = await response.json();
                setUsers(userData);
            } catch (error) {
                console.error('Failed to load users:', error);
            }
        };
        fetchUsers();
    }, []);

    const start = currentPage * usersPerPage;
    const paginated = users.slice(start, start + usersPerPage);

    return (
        <div>
            <h2>Paginated API Fetch</h2>
            <ul>
                {paginated.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
            <button onClick={() => setCurrentPage((prev) => prev - 1)} disabled={currentPage === 0}>
                Previous
            </button>
            <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={start + usersPerPage >= users.length}
            >
                Next
            </button>
        </div>
    );
};

export default PaginatedUserList;
