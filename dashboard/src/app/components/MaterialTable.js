import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from "react-bootstrap-table2-filter";

export default function MaterialTable(props) {
  const defaultSorted = [{
    dataField: props.tableKey,
    order: 'desc'
  }];

  return (
    <div>
        <BootstrapTable bootstrap4 hover condensed noDataIndication="No Data" filter={filterFactory()} pagination={paginationFactory({sizePerPage: 10})} keyField={props.tableKey} data={props.data} columns={props.columns} defaultSorted={defaultSorted}/>
    </div>
  )
}