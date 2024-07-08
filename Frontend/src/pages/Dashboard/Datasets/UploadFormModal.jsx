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
import { useAuth } from "../../../contexts/authContext";

const URL_BASE = "http://127.0.0.1:5000/upload_dataset";

export default function UploadFormModal() {
  const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure();
  // used in sending access to the api endpoint
  const { userData } = useAuth();

  const validationSchema = Yup.object({
    name: Yup.string().required("Enter Dataset Name"),
    type: Yup.string().required("Enter Dataset Type"),
    variableName: Yup.string().required("Enter Variable name"),
    view: Yup.string().required("Enter view"),
    description: Yup.string(),
    file: Yup.mixed()
      .required("Required")
      .test("fileFormat", "Unsupported Format", (value) => {
        return value && value.name.endsWith(".nc");
      }),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      variableName: "",
      description: "",
      view: "",
      file: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("file", values.file);
      formData.append("name", values.name);
      formData.append("type", values.type);
      formData.append("var_name", values.variableName);
      formData.append("view", values.view);
      formData.append("description", values.description);
      formData.append("access", userData.access);

      try {
        const response = await fetch(URL_BASE, {
          headers: {
            // "Content-Type": "multipart/form-data",
            // Authorization: `Bearer ${userData.access}`,
          },
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload Dataset");
        }

        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error("There was a problem uploading dataset:", error);
      }
    },
  });

  const buttonText = (
    <>
      <FileUp size={20} /> Upload
    </>
  );

  const handleFileChange = (e) => {
    formik.setFieldValue("file", e.target.files[0]);
  };

  return (
    <FormModal
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
              label="Dataset Name *"
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
              onChange={(e) => formik.setFieldValue("type", e.target.value)}
            >
              <SelectItem value={"max_temp"}>Max Temprature</SelectItem>
              <SelectItem value={"min_temp"}>Min Temprature</SelectItem>
              <SelectItem value={"min_max_temp"}>
                Min & Max Temprature
              </SelectItem>
              {/* <SelectItem value={"min_mean_temp"}>
                Min & Mean Temprature
              </SelectItem>
              <SelectItem value={"max_mean_temp"}>
                Max & Mean Temprature
              </SelectItem> */}
              <SelectItem value={"mean_temp"}>Mean Temprature</SelectItem>
              <SelectItem value={"pr"}>Percitipation</SelectItem>
            </Select>
            {formik.errors.type && formik.touched.type && (
              <div className="text-red-500">{formik.errors.type}</div>
            )}
          </div>
          <div className="col-span-1">
            <Input
              label="Variable Name *"
              placeholder="Enter dataset name..."
              name="variableName"
              errorMessage={formik.errors.variableName}
              value={formik.values.variableName}
              onChange={(e) =>
                formik.setFieldValue("variableName", e.target.value)
              }
              labelPlacement="outside"
            />
            {formik.errors.variableName && formik.touched.variableName && (
              <div className="text-red-500">{formik.errors.variableName}</div>
            )}
          </div>
          <div className="col-span-1">
            <Select
              labelPlacement={"outside"}
              label="Dataset view *"
              errorMessage={formik.errors.view}
              placeholder="Select dataset view..."
              className="w-full"
              name="view"
              value={formik.values.view}
              onChange={(e) => formik.setFieldValue("view", e.target.value)}
            >
              <SelectItem value={"onlyme"}>Only Me</SelectItem>
              <SelectItem value={"global"}>Global</SelectItem>
            </Select>
            {formik.errors.view && formik.touched.view && (
              <div className="text-red-500">{formik.errors.view}</div>
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
                    onChange={handleFileChange}
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
