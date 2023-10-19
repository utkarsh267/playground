import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

const SelectDropDown = ({formData}) => {
  const [showError, setShowError] = useState(false);

  const [data, setData] = useState({ name: "", phone: "", age: "" });
  const [error, setError] = useState({
    name: "this field is required.",
    phone: "this field is required a valid phone no",
    age: "this field is required a valid age",
  });

useEffect( ()=>{

    setData(formData);
    const newError = {...error}
    Object.keys(error).forEach((key)=>{
        if(key === "phone" && formData[key] !== "") {
            if (!formData.phone.match(/^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/)) {
                newError[key] = "Phone No is not valid";
            } else {
                newError[key] = ""
            }
        } else if (formData[key] === "") {
            newError[key] = "This field is required";
        } else {
            newError[key] = ""
        }
    })

   

    // if(formData.name !== "" ) {
    //     newError.name = ""        
    // }  
    // if (formData.phone !== "" ) {

       
        
    // }  
    // if (formData.age !== "") {
    //     newError.age = ""
    // }

    

    setError(newError);
    
    
    //setError({name : "", phone : "", age : ""});
    

}, [formData])


  //console.log(data.phone.match(/^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/));
  //console.log(error);

  //   useEffect(  ()=>{

  //   }, [data]);

  const onChange = (value, key) => {
    const onUpdateData = { ...data };
    onUpdateData[key] = value;
    setData(onUpdateData);

    const onUpdateError = { ...error };
    // onUpdateData[key] !== ""
    //   ? (onUpdateError[key] = false)
    //   : (onUpdateError[key] = true);

    if (key === "phone"){

        if(value === "") {
            onUpdateError[key] = key + " not Entered";
        } else if (!value.match(/^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/)) {
            onUpdateError[key] = "phone number not valid.";
        } else {
            onUpdateError[key] = ""
        }
      //console.log("sucess phone");
    //   onUpdateError[key] = "Please enter a valid Phone no";
    } else if (onUpdateData[key] !== "") {
      onUpdateError[key] = "";
    } else {
      onUpdateError[key] = key + " not Entered";
    }

    setError(onUpdateError);
  };

  const isFormValid = () => {
     const errorKeys = Object.keys(error);

    // const isValid = errorKeys.map((key) => {
    //   return error[key] !== "" ? "This form is invalid" : "This form is valid";

    // });

    let isValid = true;

    errorKeys.forEach(key => {

        if (error[key] !== "") {
            isValid = false;
            return false;
        } 
        
    });

    // let checkValid = "This form is invalid";

    // if (error.name === "" && error.phone === "" && error.age === "") {
    //   isValid = "This form is valid";
    // } else {
    //   isValid = "This form is invalid";
    // }

    return isValid;
  };

  const onSubmit = () => {
    const dataKeys = Object.keys(data);

    const result = dataKeys.map((key) => {
      return data[key] !== "" ? key + " : " + data[key] : key + " not Entered";
    });

    //console.log(result);
    //console.log(isFormValid());

    if (isFormValid()) {
        console.log("This form is valid"); 
    } else {
        console.log("This form is invalid"); 
    }

    // if (data.name !== "") {
    //   console.log("Name : " + data.name);
    // } else {
    //   console.log("No Name Entered");
    // }

    // if (data.age !== "") {
    //   console.log("Age : " + data.age);
    // } else {
    //   console.log("Age not selected");
    // }
    setShowError(true);
  };

  const onReset = () => {
    setData({ name: "", phone: "", age: "" });
    //setError({ name: true, phone: true, age: true });
    setShowError(false);
    setError({
      name: "this is field is required",
      phone: "this is field is required",
      age: "this is field is required",
    });
  };

  //   const getHelperText = () => {
  //     if (showError) {
  //       if (!isValid) {
  //         return "please select an age";
  //       }
  //     }
  //   };

  return (
    <div>
      <p>SelectDropDown</p>
      <TextField
        error={showError ? error.name : ""}
        value={data.name}
        id="outlined-helperText"
        label="Name"
        //helperText={ showError && error.name ? "Error : Please Enter a Name" : "" }
        helperText={showError ? error.name : ""}
        onChange={(e) => onChange(e.target.value, "name")}
      />

      <TextField
        label="Number"
        value={data.phone}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 10 }}
        onChange={(e) => onChange(e.target.value, "phone")}
        //helperText="Please enter your phone no"
        helperText={showError ? error.phone : ""}
        error={showError ? error.phone : ""}
      />

      <FormControl
        error={showError ? error.age : ""}
        sx={{ m: 1, minWidth: 120 }}
      >
        <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={data.age}
          label="Age"
          onChange={(e) => onChange(e.target.value, "age")}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Ten"}>Ten</MenuItem>
          <MenuItem value={"Twenty"}>Twenty</MenuItem>
          <MenuItem value={"Thirty"}>Thirty</MenuItem>
        </Select>
        <FormHelperText>
          {/* {showError && error.age ? "please select an age" : ""} */}
          {showError ? error.age : ""}
        </FormHelperText>
      </FormControl>

      <div>
        <Button variant="outlined" onClick={onSubmit}>
          Submit
        </Button>
        <Button color="secondary" variant="outlined" onClick={onReset}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default SelectDropDown;
