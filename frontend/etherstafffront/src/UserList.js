import React, { useState, useEffect } from 'react';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:5000/');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setUsers(data.results); // assuming data structure is { "results": [...] }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <strong>{user.username}</strong> - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
