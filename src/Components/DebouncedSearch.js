import React, { useState, useEffect } from 'react';

const SearchPosts = () => {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const delay = setTimeout(() => {
            if (query) {
                setIsSearching(true);
                fetch(`https://jsonplaceholder.typicode.com/posts?title_like=${query}`)
                    .then((res) => res.json())
                    .then((result) => {
                        setData(result);
                        setIsSearching(false);
                    });
            } else {
                setData([]);
            }
        }, 300);

        return () => clearTimeout(delay);
    }, [query]);

    return (
        <div>
            <h2>Debounced Search with REST API</h2>
            <input
                type="text"
                placeholder="Search posts..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {isSearching && <div>Searching...</div>}
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchPosts;
