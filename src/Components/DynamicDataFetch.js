import React, { useState, useEffect } from 'react';

function FetchUserPosts() {
    const [userId, setUserId] = useState('');
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((data) => setPostList(data.slice(0, 5)))
            .catch((err) => console.error('Error loading default posts:', err));
    }, []);

    const loadUserPosts = async (id) => {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
            const posts = await res.json();
            setPostList(posts);
        } catch (err) {
            console.error('Failed to load user posts:', err);
        }
    };

    return (
        <div>
            <h2>Posts by User</h2>
            <h3>Dynamic Data Fetching</h3>
            <input
                type="number"
                placeholder="Enter User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <button onClick={() => loadUserPosts(userId)}>Fetch</button>
            <ul>
                {postList.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default FetchUserPosts;
