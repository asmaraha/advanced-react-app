import React, { useState } from 'react';

const ErrorHandling = () => {
    const [hasError, setHasError] = useState(null);
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const loadResource = () => {
        setIsLoading(true);
        setHasError(null);

        fetch('https://jsonplaceholder.typicode.com/invalid-endpoint')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Unable to fetch the requested data.');
                }
                return response.json();
            })
            .then((fetchedData) => {
                setResult(fetchedData);
                setIsLoading(false);
            })
            .catch((err) => {
                setHasError(err.message);
                setIsLoading(false);
            });
    };

    return (
        <div>
            <h2>Handle API Errors Gracefully</h2>
            {isLoading && <div className="loading-indicator"></div>}
            {hasError && (
                <div>
                    <p className="error-notification">{hasError}</p>
                    <button className="retry-action" onClick={loadResource}>
                        Try Again
                    </button>
                </div>
            )}
            {!isLoading && !hasError && result && <p>Data retrieved successfully!</p>}
            {!isLoading && !hasError && !result && (
                <button className="retry-action" onClick={loadResource}>
                    Load Data
                </button>
            )}
        </div>
    );
};

export default ErrorHandling;
