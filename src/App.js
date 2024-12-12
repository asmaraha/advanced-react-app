import React, { useState } from 'react';
import FetchUsers from "./Components/FetchUsers";
import PaginatedUsers from './Components/Paginateduser';
import SearchablePosts from './Components/SearchablePost';
import CachedFetch from './Components/CachedFetch';
import MasterDetail from './Components/MasterDetail';
import DebouncedSearch from './Components/DebouncedSearch';
import InfiniteScroll from './Components/InfiniteScroll';
import ErrorHandling from './Components/ErrorHandling';
import DynamicDataFetch from "./Components/DynamicDataFetch";
import FetchPosts from "./Components/FetchPosts";
import './style.css';



function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const tasks = ['task1', 'task2', 'task3', 'task4', 'task5', 'task6', 'task7', 'task8', 'task9', 'task10'];

    const renderPage = () => {
        switch (currentPage) {
            case 'task1':
                return <FetchUsers />;
            case 'task2':
                return <FetchPosts />;
            case 'task3':
                return <ErrorHandling />;
            case 'task4':
                return <DynamicDataFetch />;
            case 'task5':
                return <PaginatedUsers />;
            case 'task6':
                return <SearchablePosts />;
            case 'task7':
                return <CachedFetch />;
            case 'task8':
                return <MasterDetail />;
            case 'task9':
                return <DebouncedSearch />;
            case 'task10':
                return <InfiniteScroll />;
            default:
                return (
                    <div className="container">
                        <h1>Welcome to Fetching Data App</h1>
                        <nav className="task-buttons">
                            {tasks.map((task, index) => (
                                <button
                                    key={task}
                                    onClick={() => setCurrentPage(task)}
                                    className="task-button"
                                >
                                    Task {index + 1}
                                </button>
                            ))}
                        </nav>
                    </div>
                );
        }
    };

    const getCurrentIndex = () => tasks.indexOf(currentPage);
    const previousPage = () => setCurrentPage(tasks[getCurrentIndex() - 1] || 'home');
    const nextPage = () => setCurrentPage(tasks[getCurrentIndex() + 1] || 'home');

    return (
        <div className="app">
            <header className="app-header">Fetching Data App</header>
            <div className="container">{renderPage()}</div>

            {currentPage !== 'home' && (
                <div className="pagination-buttons">
                    <button onClick={previousPage} className="nav-button" disabled={getCurrentIndex() <= 0}>Previous Page
                    </button>
                    <button onClick={() => setCurrentPage('home')} className="nav-button">Home Page</button>
                    <button onClick={nextPage} className="nav-button"
                            disabled={getCurrentIndex() >= tasks.length - 1}>Next Page
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;