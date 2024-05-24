import * as Yup from "yup";
import ModalForm from "../ModalForm";
import { ErrorMessage, Field } from "formik";
import { FilePen } from "lucide-react";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

export default function EditFormModal() {


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
  };

  const onSubmit = (values) => {
    //! Send the form data to the backend
    console.log(values);
  };
  const buttonText = (
    <>
      <FilePen />
    </>
  );
  return (
    <ModalForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      buttonText={buttonText}
      buttonClass="edit-btn"
      formStyle="upload-form"
    >
      <>
        <h1 className="column">Edit Dataset</h1>
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
            <label htmlFor="type">Type*</label>
            <Field
              type="text"
              name="type"
              id="type"
              placeholder="Enter dataset type..."
            />
            <ErrorMessage name="type" component="div" className="error" />
          </div>
        </div>
        <div className="column">
          <div className="column-item">
            <label htmlFor="vname">Variable Name*</label>
            {/* //! Add a select dropdown for variable names */}
            
            <ErrorMessage name="vname" component="div" className="error" />
          </div>
        </div>
        <div className="column">
          <div className="column-item">
            <label htmlFor="description">Description</label>
            <Field
              as="textarea"
              name="description"
              id="description"
              placeholder="Enter dataset description..."
            />
          </div>
        </div>
      </>
    </ModalForm>
  );
}
