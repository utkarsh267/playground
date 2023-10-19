import React from "react";
import DataTable from "react-data-table-component";

export const Table = (props) => {
    return (
        <DataTable
            title={props.title}
            columns={props.columns}
            data={props.data}
            striped={true}
            highlightOnHover
            dense={true}
        />
    )
}