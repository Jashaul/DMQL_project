import React, {useState, useEffect} from 'react';
import Table from './components/MaterialTable';
import { textFilter } from "react-bootstrap-table2-filter";

function App() {
    const [authors, setAuthors] = useState(false);
    const URL_endpoint = 'http://localhost:3001/';
    const authorTable = [
        {
            text: "Author ID",
            dataField: "author_id",
            sort: true,
            filter: textFilter(),
        },
        {
            text: "Author",
            dataField: "author",
            sort: true,
            filter: textFilter(),
        },
        {
            text: "Total Claps",
            dataField: "clap_sum",
            sort: true,
            filter: textFilter(),
            formatter: (val) => { return val? val : 0},
        },
        {
            text: "Total Response",
            dataField: "response_sum",
            sort: true,
            filter: textFilter(),
            formatter: (val) => { return val? val : 0},
        },
        {
            text: "Total Read Time",
            dataField: "read_time_sum",
            sort: true,
            filter: textFilter(),
            formatter: (val) => { return val? val : 0},
        },
    ];

    useEffect(() => {
        getAuthors();
    }, []);

    function getAuthors() {
        fetch(`${URL_endpoint}authors`)
        .then(response => {
            return response.text();
        })
        .then(data => {
            setAuthors(JSON.parse(data));
        });
    }

    const createAuthor = () => {
        let authorName = prompt('Enter Author name');
        fetch(`${URL_endpoint}add-authors`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({authorName}),
        })
        .then(response => {
            return response.text();
        })
        .then(data => {
            alert(data);
            getAuthors();
        });
    }

    const deleteAuthor = () => {
        let id = prompt('Enter Author id');
        fetch(`${URL_endpoint}authors/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            return response.text();
        })
        .then(data => {
            alert(data);
            getAuthors();
        });
    }

    return (
        <div style={{ padding: "20px" }}>
            {authors ? 
            <div>
                <h1 className="h2">Authors</h1>
                <Table tableKey={"author_id"} data={authors} columns={authorTable}></Table>
                <br />
                <button onClick={createAuthor}>Add Author</button>
                <button onClick={deleteAuthor}>Delete Author</button>
            </div> : 'There is no data available'}
        </div>
    );
}

export default App;
