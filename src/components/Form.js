import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, InputLabel, Select, MenuItem, FormControl, FormControlLabel, FormHelperText, TextField, FormLabel, RadioGroup, Radio, FormGroup, Checkbox} from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./Form.css";

export const Form = (props) => {
  const [formData, setFormData] = useState(props.formData || {});
  const { showErrors } = props;
  const [datePickerError, setDatePickerError] = useState();

  const cities = ["Bangalore", "Delhi", "Lucknow", "Mumbai", "Nagpur"];

  const skills = [
    "Communication",
    "Crtical Thinking",
    "Problem Solving",
    "Initiative",
  ];

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    city: "",
    skills: "",
  });

  const today = dayjs();
  const minDate = dayjs().subtract(120, "year");

  const validateForm = (data) => {
    let isValid = true;
    const updatedErrors = {};
    Object.keys(errors).forEach((key) => {
      const value = data?.[key];
      if (value) {
        // value is present in form
        if (key === "phoneNumber" && !value.match(/^\d{10}$/)) {
          updatedErrors[key] = "Please enter valid phone number.";
          isValid = false;
        } else if (
          key === "email" &&
          !value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        ) {
          updatedErrors[key] = "Please enter valid email.";
          isValid = false;
        } else if (key === "skills" && !value.length) {
          updatedErrors[key] = "This field is required.";
          isValid = false;
        } else if(key === "dateOfBirth") {
            switch (datePickerError) {
                case 'maxDate':
                case 'minDate': {
                    updatedErrors[key] = 'Please select a date within 120years past and todays date.';
                    break;
                }
          
                case 'invalidDate': {
                    updatedErrors[key] = 'Your date is not valid';
                    break;
                }
          
                default: {
                    updatedErrors[key] = '';
                    break;
                }
              }
        } 
         else {
          updatedErrors[key] = "";
        }
      } else {
        updatedErrors[key] = "This field is required.";
        isValid = false;
      }
    });

    setErrors(updatedErrors);
    return isValid;
  };

  useEffect(() => {
    const isValid = validateForm(props.formData);
    props.onChange(formData, isValid);
  }, [props.formData]);

  const onFormChange = (key, value) => {
    const data = { ...formData };
    data[key] = value;
    setFormData(data);
    const isValid = validateForm(data);
    props.onChange(data, isValid);
  };

  const onSkillChange = (value, isChecked) => {
    let selectedSkills = formData.skills || [];
    if (!isChecked) {
      selectedSkills = selectedSkills.filter((skill) => skill !== value);
    } else {
      selectedSkills.push(value);
    }

    const data = { ...formData };
    data.skills = selectedSkills;
    setFormData(data);
    const isValid = validateForm(data);
    props.onChange(data, isValid);
  };

  return (
    <Card variant="outlined">
      <CardHeader title={props.title} />
      <CardContent className="display-flex-center">
        <div className="form">
          <FormControl fullWidth className="form-control">
            <TextField
              required
              error={showErrors ? errors.firstName : ""}
              value={formData.firstName}
              id="firstName"
              label="First Name"
              variant="outlined"
              placeholder="Enter First Name"
              onChange={(e) => onFormChange("firstName", e.target.value)}
              helperText={showErrors ? errors.firstName : ""}
            />
          </FormControl>
          <FormControl fullWidth className="form-control">
            <TextField
              required
              error={showErrors ? errors.firstName : ""}
              value={formData.firstName}
              id="firstName"
              label="First Name"
              variant="outlined"
              placeholder="Enter First Name"
              onChange={(e) => onFormChange("firstName", e.target.value)}
              helperText={showErrors ? errors.firstName : ""}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              required
              error={showErrors ? errors.lastName : ""}
              value={formData.lastName}
              id="lastName"
              label="Last Name"
              variant="outlined"
              placeholder="Enter Last Name"
              onChange={(e) => onFormChange("lastName", e.target.value)}
              helperText={showErrors ? errors.lastName : ""}
            />
          </FormControl>
          <FormControl error={showErrors ? errors.gender : ""} required>
            <FormLabel id="gender">Gender</FormLabel>
            <RadioGroup
              value={formData.gender}
              name="gender-buttons-group"
              onChange={(e) => onFormChange("gender", e.target.value)}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
            <FormHelperText>{showErrors ? errors.gender : ""}</FormHelperText>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              required
              error={showErrors ? errors.email : ""}
              value={formData.email}
              id="email"
              label="Email"
              variant="outlined"
              placeholder="Enter Email"
              onChange={(e) => onFormChange("email", e.target.value)}
              helperText={showErrors ? errors.email : ""}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              required
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                maxLength: 10,
              }}
              error={showErrors ? errors.phoneNumber : ""}
              value={formData.phoneNumber}
              id="phoneNumber"
              label="Phone Number"
              //   type="number"
              variant="outlined"
              placeholder="Enter Phone Number"
              onChange={(e) => onFormChange("phoneNumber", e.target.value)}
              helperText={showErrors ? errors.phoneNumber : ""}
            />
          </FormControl>
          <FormControl fullWidth required
          error={showErrors ? errors.dateOfBirth : ""}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
              required
                format="MM/DD/YYYY"
                value={formData.dateOfBirth}
                label="Date Of Birth*"
                onChange={(value) => onFormChange("dateOfBirth", value)}
                minDate={minDate}
                maxDate={today}
                onError={(newError) => setDatePickerError(newError)}
                slotProps={{
                  textField: {
                    helperText: showErrors ? errors.dateOfBirth : "",
                  },
                }}
                className={ showErrors && errors.dateOfBirth ?  "date-picker-error" : ""}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl fullWidth error={showErrors ? errors.city : ""} required>
            <InputLabel id="city-select-label">City</InputLabel>
            <Select
              labelId="city-select-label"
              id="city-simple-select"
              value={formData.city}
              label="City"
              onChange={(e) => onFormChange("city", e.target.value)}
            >
              {cities.map((city) => {
                return <MenuItem value={city}>{city}</MenuItem>;
              })}
            </Select>
            <FormHelperText>{showErrors ? errors.city : ""}</FormHelperText>
          </FormControl>
          <FormControl
            fullWidth
            required
            error={showErrors ? errors.skills : ""}
          >
            <FormLabel component="legend">Professional Skills</FormLabel>
            <FormGroup>
              {skills.map((skill) => (
                <FormControlLabel
                  checked={(formData.skills || []).indexOf(skill) !== -1}
                  control={
                    <Checkbox
                      name={skill}
                      onChange={(e) => onSkillChange(skill, e.target.checked)}
                    />
                  }
                  label={skill}
                />
              ))}
            </FormGroup>
            <FormHelperText>{showErrors ? errors.skills : ""}</FormHelperText>
          </FormControl>
        </div>
      </CardContent>
    </Card>
  );
};
