import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { AppDispatch, RootState } from "../../../app/store";
import { IdGenerate } from "../../../utils/idGenerate";
import { notify } from "../../../utils/notify";
import {
  CreateService,
  getServices,
} from "../../../features/service/serviceSlice";
import { getClinics } from "../../../features/clinic/clinicSlice";
interface CreateServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateServiceModal: React.FC<CreateServiceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { clinic } = useSelector((state: RootState) => state.clinicSlice);

  // ✅ Define validation schema using Yup
  const validationSchema = Yup.object({
    designation: Yup.string()
      .min(3, "designation must be at least 3 characters")
      .max(50, "designation must be at most 50 characters")
      .required("designation is required"),
    description: Yup.string().required("description is required"),
    // clinic_id: Yup.number().required("clinic_id is required"),
  });

  useEffect(() => {
    dispatch(getClinics());
  }, [dispatch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Nouveau service</h2>

        {/* ✅ Using Formik for Form Management */}
        <Formik
          initialValues={{ designation: "", description: "", clinic_id: 1 }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              const id = IdGenerate("Serv");
            //   alert(typeof(values.clinic_id))
            //   const clin = parseInt(values.clinic_id)

              const parsedValues = {
                ...values,
                // clinic_id: clin,
                serv_id: id,
              };
              // alert("Submitting form with values: " + JSON.stringify(parsedValues, null, 2));
              await dispatch(CreateService(parsedValues)).unwrap();
              notify("Client reçu avec succès !", "success");
              await dispatch(getServices());

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
                  Designation
                </label>
                {/* ✅ Using Formik's Field for input */}
                <Field
                  type="text"
                  name="designation"
                  className="w-full border p-2 rounded-md"
                  placeholder="Designation"
                />
                {/* ✅ Display validation error message */}
                <ErrorMessage
                  name="designation"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                {/* ✅ Using Formik's Field for input */}
                <Field
                  type="text"
                  name="description"
                  className="w-full border p-2 rounded-md"
                  placeholder="description"
                />
                {/* ✅ Display validation error message */}
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              {/* <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Adresse
                </label>
                {/* ✅ Using Formik's Field for input */}
              {/* <Field
                  type="text"
                  name="clinic_id"
                  className="w-full border p-2 rounded-md"
                  placeholder="Adresse"
                /> */}
              {/* ✅ Display validation error message *
                <ErrorMessage
                  name="clinic_id"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div> */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Clinique
                </label>
                <Field
                  as="select"
                  name="clinic_id"
                  className="w-full border p-2 rounded-md text-gray-700"
                >
                  <option value="">Select a clinique</option>
                  {clinic &&
                    clinic.map((c) => (
                      <option key={c.clinic_id} value={Number(c.clinic_id)}>
                        {c.name}
                      </option>
                    ))}
                </Field>
                {/* ✅ Display validation error message */}
                <ErrorMessage
                  name="clinic_id"
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

export default CreateServiceModal;
