import React, {useState, useEffect} from 'react';
import Table from './components/MaterialTable';
import { textFilter } from "react-bootstrap-table2-filter";
import ModelPopup from './components/ModelPopup';

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

    const createArticle = (row) => {
        fetch(`${URL_endpoint}add-articles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
            },
            body: JSON.stringify(row),
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

    const updateArticle = (row) => {
        fetch(`${URL_endpoint}update-articles`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
            },
            body: JSON.stringify(row),
        })
        .then(response => {
            return response.text();
        })
        .then(data => {
            alert(data);
            getData();
        });
    }

    const handleArticle = (vals, option, e) => {
        var outputData = {};
        for (var i=0; i <= vals.length; i++) {
            if (vals[i] && vals[i].tagName === 'INPUT') {
                if (vals[i].value != '' && vals[i].placeholder != vals[i].value) {
                    outputData[vals[i].id] = vals[i].value;
                } else {
                    outputData[vals[i].id] = vals[i].placeholder;
                }
            }
        }
        if (option === 'Edit') {
            updateArticle(outputData).then();
        } else if (option === 'Add Article') {
            createArticle(outputData);
        }
        e.preventDefault();
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
                    <button onClick={() => updateAuthor(row)} class="btn btn-secondary btn-sm">Update Author</button>
                    <button onClick={() => deleteRecord(row.author_id)} class="btn btn-danger btn-sm">Delete Author</button>
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
                    <button onClick={() => updateSite(row)} class="btn btn-secondary btn-sm">Update Site</button>
                    <button onClick={() => deleteRecord(row.domain_id)} class="btn btn-danger btn-sm">Delete Site</button>
                </div>
            },
        },
    ];

    const textOverflowStyle = {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    }

    const articleForm = [
        {
            text: "Article ID",
            dataField: "article_id",
            type: "text",
            mutable: false,
        },
        {
            text: "Title",
            dataField: "title",
            type: "text",
            mutable: true,
        },
        {
            text: "Sub Title",
            dataField: "subtitle",
            type: "text",
            mutable: true,
        },
        {
            text: "URL",
            dataField: "url",
            type: "text",
            mutable: true,
        },
        {
            text: "Author",
            dataField: "author",
            type: "text",
            mutable: true,
        },
        {
            text: "Site",
            dataField: "domain_name",
            type: "text",
            mutable: true,
        },
    ];

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
            formatter: (val) => { 
                return <div data-toggle="tooltip" title={val}>{val}</div>
            },
        },
        {
            text: "Sub Title",
            dataField: "subtitle",
            sort: true,
            filter: textFilter(),
            style: textOverflowStyle,
            formatter: (val) => { 
                return <div data-toggle="tooltip" title={val}>{val}</div>
            },
        },
        {
            text: "URL",
            dataField: "url",
            style: textOverflowStyle,
            formatter: (val) => { 
                return <div data-toggle="tooltip" title={val}>{val}</div>
            },
        },
        {
            text: "Date Published",
            dataField: "date_posted",
            style: textOverflowStyle,
        },
        {
            text: "Author",
            dataField: "author",
            sort: true,
            filter: textFilter(),
            formatter: (val) => { 
                return <div data-toggle="tooltip" title={val}>{val}</div>
            },
        },
        {
            text: "Site",
            dataField: "domain_name",
            sort: true,
            filter: textFilter(),
            style: textOverflowStyle,
            formatter: (val) => { 
                return <div data-toggle="tooltip" title={val}>{val}</div>
            },
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
            formatter: (cell, row, index) => {
                return <div>
                    {/* <button onClick={() => updateAuthor(row)} class="btn btn-secondary btn-sm">Update</button> */}
                    <ModelPopup id={`updateArticle${index}`} label="Edit" formLayout={articleForm} data={row? row: null} onSubmit={handleArticle} />
                    <button onClick={() => deleteRecord(row.domain_id)} class="btn btn-danger btn-sm">Delete</button>
                </div>
            },
        },
    ];
    
    return (
        <div>
            <nav class="navbar navbar-dark bg-dark">
                <div id='author' class="navbar-brand"  onClick={switchList}>Author List</div>
                <div id='site' class="navbar-brand" onClick={switchList}>Site List</div>
                <div id='article' class="navbar-brand" onClick={switchList}>Article List</div>
            </nav>
            <div style={{ padding: "20px" }}>
                {switchFlag === 'author'? tableData ? 
                <div>
                    <h1>Author List</h1>
                    <button onClick={createAuthor} class="btn btn-secondary btn-sm">Add Author</button>
                    <Table tableKey={"author_id"} data={tableData} columns={authorTable}></Table>                
                </div> : 'There is no data available':''}
                {switchFlag === 'site'? tableData ? 
                <div>
                    <h1>Site List</h1>
                    <button onClick={createSite} class="btn btn-secondary btn-sm">Add Site</button>
                    <Table tableKey={"domain_id"} data={tableData} columns={siteTable}></Table>                
                </div> : 'There is no data available':''}
                {switchFlag === 'article'? tableData ? 
                <div>
                    <h1>Article List</h1>
                    {/* <button onClick={createAuthor}>Add Article</button> */}
                    <ModelPopup id="addArticle" label="Add Article" formLayout={articleForm} onSubmit={handleArticle}/>
                    <Table tableKey={"article_id"} data={tableData} columns={articleTable}></Table>                
                </div> : 'There is no data available':''}
            </div>
        </div>
    );
}

export default App;
