/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useFormik } from "formik";
import { FormModal } from "../../../components/Modals/FormModal";
import * as Yup from "yup";
import { FileCog } from "lucide-react";
import { useAuth } from "../../../contexts/authContext";
import { useEffect } from "react";

export default function EditFormModal({ id, onUpdate }) {
  const { userData } = useAuth();
  const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure();
  const DATASET_URL = `http://127.0.0.1:5000/retrieve_dataset/${userData.access}/${id}`;
  const UPDATE_URL = `http://127.0.0.1:5000/update_dataset/${userData.access}/${id}`;
  const validationSchema = Yup.object({});

  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      varName: "",
      view: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const fetchData = {
        name: values.name,
        type: values.type,
        var_name: values.varName,
        view: values.view,
        description: values.description,
      };

      try {
        const response = await fetch(UPDATE_URL, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fetchData),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log("Update result", result);
        onUpdate();
        onClose(); // Close the modal after successful update
      } catch (error) {
        console.error("There was a problem updating the dataset:", error);
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${DATASET_URL}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        formik.setValues({
          name: result.name,
          type: result.type,
          view: result.view,
          varName: result.var_name,
          description: result.description,
        });
      } catch (error) {
        console.error("There was a problem retrieving datasets:", error);
      }
    };

    fetchData();
  }, []);

  const buttonText = (
    <>
      <FileCog size={20} />
    </>
  );

  return (
    <FormModal
      onOpen={onOpen}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      header={"Upload Dataset"}
      buttonText={buttonText}
      buttonStyle={"edit-btn"}
    >
      <form onSubmit={formik.handleSubmit} className="upload-form">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="col-span-1">
            <Input
              label="Dataset Name*"
              placeholder="Enter dataset name..."
              name="name"
              errorMessage={formik.errors.name}
              value={formik.values.name}
              onChange={formik.handleChange}
              labelPlacement="outside"
            />
            {formik.errors.name && formik.touched.name && (
              <div className="text-red-500">{formik.errors.name}</div>
            )}
          </div>
          <div className="col-span-1">
            <Select
              labelPlacement={"outside"}
              label="Dataset Type *"
              errorMessage={formik.errors.type}
              placeholder="Select dataset type..."
              className="w-full"
              name="type"
              value={formik.values.type}
              onChange={(value) => formik.setFieldValue("type", value)}
            >
              <SelectItem value={"max_temp"}>Max Temprature</SelectItem>
              <SelectItem value={"min_temp"}>Min Temprature</SelectItem>
              <SelectItem value={"min_max_temp"}>
                Min & Max Temprature
              </SelectItem>
              <SelectItem value={"mean_temp"}>Mean Temprature</SelectItem>
              <SelectItem value={"pr"}>Percitipation</SelectItem>
            </Select>
            {formik.errors.type && formik.touched.type && (
              <div className="text-red-500">{formik.errors.type}</div>
            )}
          </div>
          <div className="col-span-1">
            <Input
              label="Variable Name*"
              placeholder="Enter variable name..."
              name="varName"
              errorMessage={formik.errors.varName}
              value={formik.values.varName}
              onChange={formik.handleChange}
              labelPlacement="outside"
            />
            {formik.errors.varName && formik.touched.varName && (
              <div className="text-red-500">{formik.errors.varName}</div>
            )}
          </div>
          <Select
            labelPlacement={"outside"}
            label="View "
            errorMessage={formik.errors.view}
            placeholder="Select view..."
            className="w-full"
            name="view"
            value={formik.values.view}
            onChange={(value) => formik.setFieldValue("view", value)}
          >
            <SelectItem value={"1"}>Global</SelectItem>
            <SelectItem value={"0"}>Only Me</SelectItem>
          </Select>
          {formik.errors.view && formik.touched.view && (
            <div className="text-red-500">{formik.errors.view}</div>
          )}
        </div>
        <div className="mt-4">
          <Textarea
            label="Description (optional)"
            placeholder="Enter dataset description..."
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            labelPlacement="outside"
          />
        </div>
        <div className="flex justify-end mt-4 gap-4 mb-2">
          <Button type="button" className="btn btn-secondary" onClick={onClose}>
            Close
          </Button>
          <Button type="submit" className="btn btn-primary green-analyze-btn">
            Edit
          </Button>
        </div>
      </form>
    </FormModal>
  );
}
