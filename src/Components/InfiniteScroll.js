import React, { useState, useEffect, useCallback } from 'react';

const ScrollPosts = () => {
    const [postArray, setPostArray] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    const loadNextPosts = useCallback(async () => {
        setLoadingMore(true);
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=10`);
        const newPosts = await response.json();
        setPostArray((prev) => [...prev, ...newPosts]);
        setLoadingMore(false);
    }, [currentPage]);

    useEffect(() => {
        loadNextPosts();
    }, [currentPage, loadNextPosts]);

    useEffect(() => {
        const scrollHandler = () => {
            if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight) {
                setCurrentPage((prev) => prev + 1);
            }
        };
        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, []);

    return (
        <div>
            <h2>Infinite Scrolling</h2>
            <ul>
                {postArray.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
            {loadingMore && <div>Loading more...</div>}
        </div>
    );
};

export default ScrollPosts;
