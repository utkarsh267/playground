import React from "react";
import { Table } from "../components/Table";
import { useSelector } from 'react-redux'
import { RecordSelector } from "../components/RecordSelector";
const getColumn = (key, label) => {
    return {
        name: label,
        label,
        selector: key,
        key
    }
}

export const Home = () => {

    const tableData = useSelector((state) => state.tableData.records);

    const columns = [
        getColumn("firstName", "First Name"),
        getColumn("lastName", "Last Name"),
        getColumn("gender", "Gender"),
        getColumn("email", "Email"),
        getColumn("phoneNumber", "Phone Number"),
        getColumn("dateOfBirth", "Date of Birth"),
        getColumn("city", "City"),
        getColumn("skills", "Professional Skills"),
    ];

    return (
        <>
            <Table
                title="Data List"
                columns={columns}
                data={tableData}
            />
            <RecordSelector records={tableData}/>
        </>
    )
}