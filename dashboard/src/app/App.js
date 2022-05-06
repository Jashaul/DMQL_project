import React, {useState, useEffect} from 'react';
import Table from './components/MaterialTable';
import { textFilter } from "react-bootstrap-table2-filter";

function App() {
    const [tableData, setTableData] = useState(false);
    const [switchFlag, setSwitch] = useState("author");
    const URL_endpoint = 'http://localhost:3001/';

    useEffect(() => {
        getData();
    }, []);

    function getData(name) {
        const dataUrl = `${URL_endpoint}${name? name: switchFlag}s`
        fetch(dataUrl)
        .then(response => {
            return response.text();
        })
        .then(data => {
            setTableData(JSON.parse(data));
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
            getData();
        });
    }

    const createSite = () => {
        let domainName = prompt('Enter Site name');
        fetch(`${URL_endpoint}add-sites`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({domainName}),
        })
        .then(response => {
            return response.text();
        })
        .then(data => {
            alert(data);
            getData();
        });
    }

    const updateAuthor = (row) => {
        let authorName = prompt('Enter Author name', row.author);
        fetch(`${URL_endpoint}update-authors`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
            },
            body: JSON.stringify({authorName, author_id: row.author_id}),
        })
        .then(response => {
            return response.text();
        })
        .then(data => {
            alert(data);
            getData();
        });
    }

    const updateSite = (row) => {
        let domainName = prompt('Enter Site name', row.author);
        fetch(`${URL_endpoint}update-sites`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
            },
            body: JSON.stringify({domainName, domain_id: row.domain_id}),
        })
        .then(response => {
            return response.text();
        })
        .then(data => {
            alert(data);
            getData();
        });
    }

    const deleteRecord = (id) => {
        // let id = prompt('Enter Author id');
        fetch(`${URL_endpoint}${switchFlag}s/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            return response.text();
        })
        .then(data => {
            alert(data);
            getData();
        });
    }

    const switchList = (val) => {
        setTableData(false)
        const flag = val.target.id;
        setSwitch(flag);
        getData(flag);
    }

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
        {
            text: "",
            dataField: "",
            formatter: (cell, row) => {
                return <div>
                    <button onClick={() => updateAuthor(row)}>Update Author</button>
                    <button onClick={() => deleteRecord(row.author_id)}>Delete Author</button>
                </div>
            },
        },
    ];

    const siteTable = [
        {
            text: "Site ID",
            dataField: "domain_id",
            sort: true,
            filter: textFilter(),
        },
        {
            text: "Site",
            dataField: "domain_name",
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
        {
            text: "",
            dataField: "",
            formatter: (cell, row) => {
                return <div>
                    <button onClick={() => updateSite(row)}>Update Site</button>
                    <button onClick={() => deleteRecord(row.domain_id)}>Delete Site</button>
                </div>
            },
        },
    ];

    const textOverflowStyle = {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    }

    const articleTable = [
        {
            text: "Article ID",
            dataField: "article_id",
            sort: true,
            filter: textFilter(),
        },
        {
            text: "Title",
            dataField: "title",
            sort: true,
            filter: textFilter(),
            style: textOverflowStyle,
        },
        {
            text: "Sub Title",
            dataField: "subtitle",
            sort: true,
            filter: textFilter(),
            style: textOverflowStyle,
        },
        {
            text: "URL",
            dataField: "url",
            style: textOverflowStyle,
        },
        {
            text: "Data Published",
            dataField: "date_posted",
            style: textOverflowStyle,
        },
        {
            text: "Author",
            dataField: "author",
            sort: true,
            filter: textFilter(),
        },
        {
            text: "Site",
            dataField: "domain_name",
            sort: true,
            filter: textFilter(),
            style: textOverflowStyle,
        },
        {
            text: "Claps",
            dataField: "claps",
            sort: true,
            filter: textFilter(),
            formatter: (val) => { return val? val : 0},
        },
        {
            text: "Responses",
            dataField: "responses",
            sort: true,
            filter: textFilter(),
            formatter: (val) => { return val? val : 0},
        },
        {
            text: "Reading Time",
            dataField: "reading_time",
            sort: true,
            filter: textFilter(),
            formatter: (val) => { return val? val : 0},
        },
        {
            text: "Tags",
            dataField: "tags",
            sort: true,
            filter: textFilter(),
            formatter: (val) => { return val? val : 0},
        },
        {
            text: "Topic Rate",
            dataField: "prev_mon_topic_rate",
            sort: true,
            filter: textFilter(),
            formatter: (val) => { return val? parseFloat(val).toFixed(4) : 0},
        },
        {
            text: "",
            dataField: "",
            formatter: (cell, row) => {
                return <div>
                    <button onClick={() => updateAuthor(row)}>Update</button>
                    <button onClick={() => deleteRecord(row.domain_id)}>Delete</button>
                </div>
            },
        },
    ];

    return (
        <div style={{ padding: "20px" }}>
            <div id='author' onClick={switchList}>Author List</div>
            <div id='site' onClick={switchList}>Site List</div>
            <div id='article' onClick={switchList}>Article List</div>
            {switchFlag === 'author'? tableData ? 
            <div>
                <button onClick={createAuthor}>Add Author</button>
                <Table tableKey={"author_id"} data={tableData} columns={authorTable}></Table>                
            </div> : 'There is no data available':''}
            {switchFlag === 'site'? tableData ? 
            <div>
                <button onClick={createSite}>Add Site</button>
                <Table tableKey={"domain_id"} data={tableData} columns={siteTable}></Table>                
            </div> : 'There is no data available':''}
            {switchFlag === 'article'? tableData ? 
            <div>
                <button onClick={createAuthor}>Add Article</button>
                <Table tableKey={"article_id"} data={tableData} columns={articleTable}></Table>                
            </div> : 'There is no data available':''}
        </div>
    );
}

export default App;
