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

export default function EditFormModal() {
  const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure();

  const validationSchema = Yup.object({});

  const formik = useFormik({
    initialValues: {
      datasetName: "",
      datasetType: "",
      variableName: [],
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const buttonText = (
    <>
      <FileCog size={20} />
    </>
  );

  return (
    <FormModal
      //! Edit Form fields => Dataset name, type, varName, description
      //! Delete Form fields => Delete
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
              name="datasetName"
              errorMessage={formik.errors.datasetName}
              value={formik.values.datasetName}
              onChange={formik.handleChange}
              labelPlacement="outside"
            />
            {formik.errors.datasetName && formik.touched.datasetName && (
              <div className="text-red-500">{formik.errors.datasetName}</div>
            )}
          </div>
          <div className="col-span-1">
            <Select
              labelPlacement={"outside"}
              label="Dataset Type*"
              errorMessage={formik.errors.datasetType}
              placeholder="Select dataset type..."
              className="w-full"
              name="datasetType"
              value={formik.values.datasetType}
              onChange={formik.handleChange}
            >
              <SelectItem value={"TMP"}>Temprature</SelectItem>
              <SelectItem value={"PR"}>Percitipation</SelectItem>
              <SelectItem value={"HCW"}>Heat & Cold Waves</SelectItem>
            </Select>
            {formik.errors.datasetType && formik.touched.datasetType && (
              <div className="text-red-500">{formik.errors.datasetType}</div>
            )}
          </div>
          <div className="col-span-full">
            <Select
              labelPlacement={"outside"}
              label="Variable Name*"
              selectionMode="multiple"
              errorMessage={formik.errors.variableName}
              placeholder="Select variable name..."
              className="w-full"
              name="variableName"
              value={formik.values.variableName}
              onChange={formik.handleChange}
            >
              <SelectItem value={"max"}>Max Temprature</SelectItem>
              <SelectItem value={"min"}>Min Temprature</SelectItem>
              <SelectItem value={"minmax"}>Min & Max Temprature</SelectItem>
              <SelectItem value={"pr"}>Percitipation</SelectItem>
              <SelectItem value={"waves"}>Waves</SelectItem>
            </Select>
            {formik.errors.variableName && formik.touched.variableName && (
              <div className="text-red-500">{formik.errors.variableName}</div>
            )}
          </div>
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
          <Button type="submit"  className="btn btn-primary green-analyze-btn">
            Edit
          </Button>
        </div>
      </form>
    </FormModal>
  );
}
