/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  Button,
  Slider,
  Checkbox,
  Input,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import OutputModal from "../../../components/Modals/OutputModal";
import { Bolt } from "lucide-react";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function EditIndexModal({ id, onEdit, sector }) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const INDEX_URL = `http://127.0.0.1:5000/get_index/${sector}/${id}`;
  const EDIT_URL = `http://127.0.0.1:5000/edit_index/${sector}/${id}`;

  const validationSchema = Yup.object({
    threshold: Yup.number(),
    has_base_period: Yup.boolean(),
    has_threshold: Yup.boolean(),
    index_description: Yup.string(),
    high_index_indication: Yup.string(),
    low_index_indication: Yup.string(),
    moderate_range: Yup.array(),
  });

  const formik = useFormik({
    initialValues: {
      has_base_period: false,
      has_threshold: false,
      index_description: "",
      high_index_indication: "",
      low_index_indication: "",
      moderate_range: [],
      threshold: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Submit form data here
      try {
        const response = fetch(EDIT_URL, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error(
            "Failed to update index with code: ",
            response.status
          );
        }
      } catch (error) {
        console.error("There was a problem updating the index:", error);
      }
      onEdit();
      onClose();
    },
  });

  const fetchIndexData = async () => {
    // Fetch data here
    try {
      const response = await fetch(INDEX_URL, { method: "GET" });

      if (!response.ok) {
        throw new Error("Error Fetching Data with code: ", response.status);
      }
      const index = await response.json();
      formik.setValues({
        has_base_period: index.has_base_period,
        has_threshold: index.has_threshold,
        index_description: index.index_description,
        high_index_indication: index.high_index_indication,
        low_index_indication: index.low_index_indication,
        moderate_range: index.moderate_range,
        threshold: index.threshold,
      });
    } catch (error) {
      console.error("There was a problem fetching data:", error);
    }
  };

  useEffect(() => {
    fetchIndexData();
  }, []);

  const buttonText = (
    <>
      <Bolt size={20} /> Edit
    </>
  );
  return (
    <div>
      <OutputModal
        buttonText={buttonText}
        buttonStyle="edit-index-modal"
        header={`Edit Index ${id}`}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      >
        <div className="edit-index-form">
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="form-group col-span-full">
                <label htmlFor="high_index_indication">
                  High Index Indication
                </label>
                <Input
                  type="text"
                  id="high_index_indication"
                  name="high_index_indication"
                  value={formik.values.high_index_indication}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.high_index_indication &&
                  formik.touched.high_index_indication && (
                    <div className="error">
                      {formik.errors.high_index_indication}
                    </div>
                  )}
              </div>

              <div className="form-group col-span-full">
                <label htmlFor="low_index_indication">
                  Low Index Indication
                </label>
                <Input
                  type="text"
                  id="low_index_indication"
                  name="low_index_indication"
                  value={formik.values.low_index_indication}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.low_index_indication &&
                  formik.touched.low_index_indication && (
                    <div className="error">
                      {formik.errors.low_index_indication}
                    </div>
                  )}
              </div>
              <div className="col-span-full grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="form-group col-span-1">
                  <Checkbox
                    id="has_base_period"
                    name="has_base_period"
                    isSelected={formik.values.has_base_period}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    Has Base Period
                  </Checkbox>
                  {formik.errors.has_base_period &&
                    formik.touched.has_base_period && (
                      <div className="error">
                        {formik.errors.has_base_period}
                      </div>
                    )}
                </div>

                <div className="form-group col-span-1">
                  <Checkbox
                    id="has_threshold"
                    name="has_threshold"
                    isSelected={formik.values.has_threshold}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    Has Threshold
                  </Checkbox>
                  {formik.errors.has_threshold &&
                    formik.touched.has_threshold && (
                      <div className="error">{formik.errors.has_threshold}</div>
                    )}
                </div>
              </div>
              <div className="form-group col-span-full">
                <label htmlFor="threshold">Threshold</label>
                <Input
                  type="number"
                  id="threshold"
                  name="threshold"
                  value={formik.values.threshold}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.threshold && formik.touched.threshold && (
                  <div className="error">{formik.errors.threshold}</div>
                )}
              </div>
              <div className="form-group col-span-full">
                {/* <label htmlFor="moderate_range">Moderate Range</label> */}
                <Slider
                  label="Moderate Range"
                  // labelPlacement="outside"
                  step={1}
                  min={-100}
                  maxValue={200}
                  defaultValue={formik.values.moderate_range}
                  onChange={(value) =>
                    formik.setFieldValue("moderate_range", value)
                  }
                  className="max-w-md"
                />
                {formik.errors.moderate_range &&
                  formik.touched.moderate_range && (
                    <div className="error">{formik.errors.moderate_range}</div>
                  )}
              </div>

              <div className="form-group col-span-full">
                <label htmlFor="index_description">Index Description</label>
                <Textarea
                  id="index_description"
                  name="index_description"
                  value={formik.values.index_description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.index_description &&
                  formik.touched.index_description && (
                    <div className="error">
                      {formik.errors.index_description}
                    </div>
                  )}
              </div>
            </div>
            <div className="btn-group">
              <Button className="cancel" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="save">
                Save
              </Button>
            </div>
          </form>
        </div>
      </OutputModal>
    </div>
  );
}
