import React, { useEffect, useState } from "react";
import { Button, Stack, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Form } from "../components/Form"
import { useDispatch } from 'react-redux'
import { addRecord, deleteRecord, updateRecord } from '../store/features/tableData';

export const RecordSelector = (props) => {

    useEffect(() => {
        const data = (props.records || []).map((record) => {
            return {
                ...record,
                label: `${record.firstName} ${record.lastName}`
            }
        });
        setRecords(data);
    }, [props.records]);

    const dispatch = useDispatch()

    const [selectedRecord, setSelectedRecord] = useState();
    const [records, setRecords] = useState();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState();
    const [isFormValid, setIsFormValid] = useState(); // added
    const [showErrors, setShowErrors] = useState(false); // added

    const onFormChange = (value, isValid) => { // updated
        setFormData(value)
        setIsFormValid(isValid)
    }

    const onDelete = () => {
        dispatch(deleteRecord(selectedRecord.id));
        reset();
    }

    const reset = () => {
        setShowForm(false);
        setFormData(undefined);
        setSelectedRecord(undefined);
    }

    const onSave = () => {
        if(isFormValid) { // same logic to be added for showing confirmation modal
            dispatch(addRecord(formData));
            reset();
        }
        setShowErrors(true);
    }

    const onAdd = () => {
        setShowForm(true);
        setFormData(undefined);
        setSelectedRecord(undefined);
    }

    const onUpdate = () => {
        setShowErrors(true);
        setFormData(selectedRecord);
        setShowForm(true);
    }
    return (
        <>
            <div className="display-flex-center">
                <Stack spacing={2} direction="column">
                    <FormControl fullWidth>
                        <InputLabel id="record-select-label">Select Record</InputLabel>
                        <Select
                            labelId="record-select-label"
                            id="record-simple-select"
                            value={selectedRecord?.label}
                            label="City"
                            onChange={(e) => setSelectedRecord(e.target.value)}
                        >
                            {(records || []).map((record) => {
                                return (
                                    <MenuItem value={record}>{record.label}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <Stack spacing={2} direction="row">
                        <Button variant="contained" onClick={onAdd}>Add</Button>
                        <Button variant="contained" color="success" disabled={!selectedRecord} onClick={onUpdate}>
                            Update
                        </Button>
                        <Button variant="outlined" color="error" disabled={!selectedRecord} onClick={onDelete}>
                            Delete
                        </Button>
                        <Button variant="outlined" onClick={reset}>Reset</Button>
                        <Button variant="contained" onClick={onSave}>Save</Button>
                    </Stack>
                </Stack>
            </div>
            {/* new props added */}
            {showForm ? <Form onChange={onFormChange} formData={selectedRecord} showErrors={showErrors} /> : <></>} 
        </>
    )
}