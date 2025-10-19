import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { AppDispatch } from "../../../app/store";
import { IdGenerate } from "../../../utils/idGenerate";
import { notify } from "../../../utils/notify";
import { CreateExam, getExams } from "../../../features/exam/exam-listSlice";
interface CreateExamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateExamModal: React.FC<CreateExamModalProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  // ✅ Define validation schema using Yup
  const validationSchema = Yup.object({
    type: Yup.string()
      .min(3, "type must be at least 3 characters")
      .max(50, "type must be at most 50 characters")
      .required("type is required"),
    price: Yup.number().required("price is required"),
    // clinic_id: Yup.number().required("clinic_id is required"),
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Nouveau examen</h2>

        {/* ✅ Using Formik for Form Management */}
        <Formik
          initialValues={{ type: "", price: 0 }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              const id = IdGenerate("Exam");
              //   alert(typeof(values.clinic_id))
              //   const clin = parseInt(values.clinic_id)

              const parsedValues = {
                ...values,
                // clinic_id: clin,
                exam_id: id,
              };
              // alert("Submitting form with values: " + JSON.stringify(parsedValues, null, 2));
              await dispatch(CreateExam(parsedValues)).unwrap();
              notify("Client reçu avec succès !", "success");
              await dispatch(getExams());

              resetForm();
              onClose();
            } catch (error) {
              console.error("Failed to create client:", error);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  type
                </label>
                {/* ✅ Using Formik's Field for input */}
                <Field
                  type="text"
                  name="type"
                  className="w-full border p-2 rounded-md"
                  placeholder="type"
                />
                {/* ✅ Display validation error message */}
                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  price
                </label>
                {/* ✅ Using Formik's Field for input */}
                <Field
                  type="number"
                  name="price"
                  className="w-full border p-2 rounded-md"
                  placeholder="price"
                />
                {/* ✅ Display validation error message */}
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded-md"
                  onClick={onClose}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateExamModal;
