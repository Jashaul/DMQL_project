import React, {useState, useEffect} from 'react';

function App() {
    const [authors, setAuthors] = useState(false);
    const URL_endpoint = 'http://localhost:3001/'

    useEffect(() => {
        getAuthors();
    }, []);

    function getAuthors() {
        fetch(`${URL_endpoint}authors`)
        .then(response => {
            return response.text();
        })
        .then(data => {
            setAuthors(data);
        });
    }

    return (
        <div>
            {authors ? authors : 'There is no merchant data available'}
        </div>
    );
}

export default App;
