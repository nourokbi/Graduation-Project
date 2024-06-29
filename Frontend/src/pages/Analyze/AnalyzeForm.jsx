/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { ErrorMessage, Field, Formik, useFormik, Form } from "formik";
import { Puff } from "react-loader-spinner";
import * as Yup from "yup";

const governrates = [
  "Alexandria",
  "Aswan",
  "Asyut",
  "Beheira",
  "Beni Suef",
  "Cairo",
  "Dakahlia",
  "Damietta",
  "Faiyum",
  "Gharbia",
  "Giza",
  "Ismailia",
  "Kafr El Sheikh",
  "Luxor",
  "Matruh",
  "Minya",
  "Monufia",
  "New Valley",
  "North Sinai",
  "Port Said",
  "Qalyubia",
  "Qena",
  "Red Sea",
  "Sharqia",
  "Sohag",
  "South Sinai",
  "Suez",
];

const sectors = [
  "General",
  "Agriculture",
  "Health",
  "Energy",
  "Water",
  "Bio-diversity",
];

const validationSchema = Yup.object({
  dataset: Yup.string().required("Required"),
  governrate: Yup.string().required("Required"),
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
      ),
  }),
});

export default function AnalyzeForm({
  setAnalyzeData,
  fetchData,
  isLoading,
  setIsLoading,
}) {
  return (
    <div className="analyze-form">
      <Formik
        initialValues={{
          dataset: "",
          governrate: "",
          index: "",
          sector: "",
          timeZone: {
            start: "",
            end: "",
          },
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setIsLoading(true); // Set loading state to true (Show loading spinner
          setAnalyzeData((prevData) => {
            const newData = { ...prevData, ...values };
            fetchData(newData); // Call the fetch function with updated data
            return newData;
          });
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="column">
              <div className="column-item">
                <label htmlFor="dataset">Dataset</label>
                <Field
                  name="dataset"
                  placeholder="Select dataset..."
                  as="select"
                >
                  {" "}
                  {
                    //! This data should be fetched from the backend
                  }
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
                <label htmlFor="governrate">Governrate</label>
                <Field
                  name="governrate"
                  placeholder="Select governrate..."
                  as="select"
                >
                  <option value="" default>
                    Select governrate...
                  </option>
                  {governrates.map((governrate) => (
                    <option key={governrate} value={governrate}>
                      {governrate}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="governrate" component="div" />
              </div>
            </div>

            <div className="column">
              <div className="column-item">
                <label htmlFor="sector">Sector</label>
                <Field name="sector" placeholder="Select sector..." as="select">
                  <option value="" default>
                    Select sector...
                  </option>
                  {sectors.map((sector) => (
                    <option key={sector} value={sector}>
                      {sector}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="sector" component="div" />
              </div>
              <div className="column-item">
                <div className="label-row">
                  <label htmlFor="index">Index</label>
                  <span>
                    {
                      //! Link this anchor to the indices page, Add a tooltip here,}
                    }
                    <a href="/">!</a>
                  </span>
                </div>
                {
                  //! This data should be fetched from the backend
                }
                <Field name="index" placeholder="Select index..." as="select">
                  <option value="" default>
                    Select index...
                  </option>
                  <option value="FD">Frost Days</option>
                  <option value="SU">Summer Days</option>
                  <option value="ID">ID</option>
                  <option value="TR">TNx</option>
                  <option value="TXx">TXx</option>
                  <option value="TNx">TNx</option>
                  <option value="TXn">TXn</option>
                  <option value="TNn">TNn</option>
                  <option value="GSL">GSL</option>
                  <option value="HDD">HDD</option>
                  <option value="CDD">CDD</option>
                  <option value="TX90p">TX90p</option>
                  <option value="TN90p">TN90p</option>
                  <option value="TX10p">TX10p</option>
                  <option value="TN10p">TN10p</option>
                </Field>
                <ErrorMessage name="index" component="div" />
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
                <button
                  type="submit"
                  className="green-analyze-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
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
