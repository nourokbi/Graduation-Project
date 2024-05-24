/* eslint-disable no-unused-vars */
import { ErrorMessage, Field, Formik, useFormik, Form } from "formik";
import { Puff } from "react-loader-spinner";
import * as Yup from "yup";

const validationSchema = Yup.object({
  dataset: Yup.string().required("Required"),
  index: Yup.string().required("Required"),
  sector: Yup.string().required("Required"),
  timeZone: Yup.object().shape({
    start: Yup.string()
      .required("Required")
      .test(
        "is-before-end",
        "Start date must be before end date",
        function (start) {
          const { end } = this.parent; // Accessing the end date from parent object
          if (!start || !end) return true; // If start or end date is missing, let Yup handle the required validation
          return new Date(start) < new Date(end); // Check if start date is before end date
        }
      )
      .test("time-zone-exist", "Time zone is required", function (start) {
        const { end } = this.parent;
        if (!start && !end) return false; // If both start and end dates are missing, return false
        return true; // Otherwise, return true
      }),
    end: Yup.string()
      .required("Required")
      .test(
        "is-after-start",
        "End date must be after start date",
        function (end) {
          const { start } = this.parent;
          if (!start || !end) return true;
          return new Date(end) > new Date(start); // Check if end date is after start date
        }
      )
      .test(
        "is-before-current",
        "End date must be before current date",
        function (end) {
          const currentDate = new Date();
          if (!end) return true; // If end date is missing, let Yup handle the required validation
          return new Date(end) < currentDate; // Check if end date is before current date
        }
      ),
  }),
});

export default function AnalyzeForm() {
  return (
    <div className="analyze-form">
      <Formik
        initialValues={{
          dataset: "",
          index: "",
          sector: "",
          timeZone: {
            start: "",
            end: "",
          },
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // alert("Submitting");
            setSubmitting(false);
          }, 4000);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="column">
              <div className="column-item">
                <label htmlFor="dataset">Dataset</label>
                <Field
                  name="dataset"
                  placeholder="Select dataset..."
                  as="select"
                >
                  <option value="" default>
                    Select dataset...
                  </option>
                  <option value="dataset1">dataset1</option>
                  <option value="dataset2">dataset2</option>
                  <option value="dataset3">dataset3</option>
                </Field>
                <ErrorMessage name="dataset" component="div" />
              </div>

              <div className="column-item">
                <label htmlFor="index">Index</label>
                <Field name="index" placeholder="Select index..." as="select">
                  <option value="" default>
                    Select index...
                  </option>
                  <option value="FR">FR</option>
                  <option value="CD">CD</option>
                  <option value="CDCI">CDCI</option>
                  <option value="TXx">TXx</option>
                  <option value="TMx">TMx</option>
                </Field>
                <ErrorMessage
                  name="index"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>

            <div className="column">
              <div className="full-width">
                <label htmlFor="sector">Sector</label>
                <Field name="sector" placeholder="Select sector..." as="select">
                  <option value="" default>
                    Select sector...
                  </option>
                  <option value="general">General</option>
                </Field>
                <ErrorMessage name="sector" component="div" className="error-message" />
              </div>
            </div>

            <div className="time-zone column">
              <div className="column-item">
                <label>Time Zone</label>
                <Field
                  name="timeZone.start"
                  placeholder="Select start date..."
                  type="date"
                />
                <ErrorMessage name="timeZone.start" component="div" />
              </div>
              <div className="column-item">
                <label>
                  <br />
                </label>
                <Field
                  name="timeZone.end"
                  placeholder="Select end date..."
                  type="date"
                />
                <ErrorMessage name="timeZone.end" component="div" />
              </div>
            </div>
            <div className="column">
              <div className="column-item full-width">
                <button type="submit" className="green-analyze-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Puff
                      visible={true}
                      height="30"
                      width="30"
                      color="#4fa94d"
                      ariaLabel="puff-loading"
                    />
                  ) : null}
                  Analyze
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
