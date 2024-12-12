import React, { useState, useEffect } from 'react';

const SearchablePostList = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const posts = await response.json();
                setAllPosts(posts);
            } catch (error) {
                console.error('Failed to load posts:', error);
            }
        };
        fetchPosts();
    }, []);

    const filtered = allPosts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h2>Searchable API Data</h2>
            <input
                type="text"
                placeholder="Enter keywords"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ul>
                {filtered.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchablePostList;
