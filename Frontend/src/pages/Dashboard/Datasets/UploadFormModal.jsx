import { useFormik } from "formik";
import { FormModal } from "../../../components/Modals/FormModal";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import * as Yup from "yup";
import { FileUp } from "lucide-react";

export default function UploadFormModal() {
  const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure();

  const validationSchema = Yup.object({
    datasetName: Yup.string().required("Required"),
    datasetType: Yup.string().required("Required"),
    variableName: Yup.array()
      .of(Yup.string().required("Required"))
      .min(1, "Select at least one variable"),
    description: Yup.string(),
    file: Yup.mixed()
      .required("Required")
      .test("fileFormat", "Unsupported Format", (value) => {
        return value && value.name.endsWith(".nc");
      }),
  });

  const formik = useFormik({
    initialValues: {
      datasetName: "",
      datasetType: "",
      variableName: [],
      description: "",
      file: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const buttonText = <>
    <FileUp size={20} /> Upload
  </>

  return (
    <FormModal
      //! Edit Form fields => Dataset name, type, varName, description
      //! Delete Form fields => Delete
      onOpen={onOpen}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      header={"Upload Dataset"}
      buttonText={buttonText}
      buttonStyle={"upload-form-btn upload-btn"}
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
        {/* File input */}
        <div className="col-span-full mt-4">
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium leading-6 text-gray-900 font-semibold"
          >
            Upload nc File*
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-3">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-300"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M6 2C4.895 2 4 2.895 4 4V20C4 21.105 4.895 22 6 22H18C19.105 22 20 21.105 20 20V8L14 2H6zM14 4L18 8H14V4zM8 12H16V14H8V12zM8 16H16V18H8V16z" />
              </svg>

              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload .nc file*</span>
                  <input
                    id="file-upload"
                    name="file"
                    type="file"
                    accept=".nc"
                    className="sr-only"
                    value={formik.values.file}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.file && (
                    <div className="text-red-500"> {formik.errors.file}</div>
                  )}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4 gap-4 mb-2">
          <Button type="button" className="btn btn-secondary" onClick={onClose}>
            Close
          </Button>
          <Button type="submit" className="btn btn-primary green-analyze-btn">
            Upload
          </Button>
        </div>
      </form>
    </FormModal>
  );
}
