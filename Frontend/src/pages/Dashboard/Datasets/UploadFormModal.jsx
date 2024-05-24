import ModalForm from "../ModalForm";
import * as Yup from "yup";
import { ErrorMessage, Field } from "formik";
import { FileUp } from "lucide-react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

export default function UploadFormModal() {
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    type: Yup.string().required("Required"),
    vname: Yup.array()
      .of(Yup.string().required())
      .min(1, "At least one variable must be selected"),
    file: Yup.mixed()
      .required("Required")
      .test("fileType", "Only .nc files are allowed", (value) => {
        // Check if a file is selected and it has a .nc extension
        return value && value.name && value.name.endsWith(".nc");
      }),
  });

  const initialValues = {
    name: "",
    type: "",
    vname: "",
    description: "",
    file: null,
  };

  const onSubmit = (values) => {
    //! Send the form data to the backend
    console.log(values);
  };
  const buttonText = (
    <>
      <FileUp /> Upload
    </>
  );

  return (
    <ModalForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      buttonText={buttonText}
      formStyle="upload-form"
    >
      <>
        <h1 className="column">Upload Dataset</h1>
        <p className="upload-note">
          <span>Note: </span>Uploaded dataset must contain min, max and mean
          column for weather
        </p>
        <div className="column">
          <div className="column-item">
            <label htmlFor="name">Name*</label>
            <Field
              type="text"
              name="name"
              id="name"
              placeholder="Enter dataset name..."
            />
            <ErrorMessage name="name" component="div" className="error" />
          </div>
          <div className="column-item">
            <label htmlFor="file">File*</label>
            <Field type="file" name="file" id="file" accept=".nc" />
            <ErrorMessage name="file" component="div" className="error" />
          </div>
        </div>
        <div className="column">
          <div className="column-item">
            <label htmlFor="type">Type*</label>
            <Field type="text" name="type" id="type" as="select">
              <option value="" default>
                Select dataset type...
              </option>
              <option value="TMP">Temprature</option>
              <option value="PR">Percitipation</option>
              <option value="HCW">Heat and Cold Waves</option>
            </Field>
            <ErrorMessage name="type" component="div" className="error" />
          </div>
          <div className="column-item">
            <label htmlFor="vname">Variable Name*</label>
            {/* //! Add a select dropdown for variable names */}
            <FormControl sx={{}}>
              <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(", ")}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={personName.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <ErrorMessage name="vname" component="div" className="error" />
          </div>
        </div>
        <div className="column">
          <div className="column-item full-width">
            <label htmlFor="description">Description</label>
            <Field as="textarea" name="description" id="description" />
            <ErrorMessage
              name="description"
              component="div"
              className="error"
            />
          </div>
        </div>
      </>
    </ModalForm>
  );
}
