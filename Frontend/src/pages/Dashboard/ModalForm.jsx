/* eslint-disable react/prop-types */
import { Puff } from "react-loader-spinner";
import { Modal } from "../../components/Modal";
import { Form, Formik } from "formik";
import { useState } from "react";

export default function ModalForm({
  buttonText,
  children,
  onSubmit,
  initialValues,
  validationSchema,
  formStyle,
  buttonClass,
}) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <Modal
        buttonText={buttonText}
        buttonClass={buttonClass}
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            onSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className={formStyle}>
              {children}
              <div className="column">
                <div className="full-width">
                  <button
                    type="submit"
                    className="green-analyze-btn btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Puff
                        visible={true}
                        height="30"
                        width="30"
                        color="#4fa94d"
                        ariaLabel="puff-loading"
                      />
                    ) : null}
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
}
