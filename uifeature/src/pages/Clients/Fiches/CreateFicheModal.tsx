import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { AppDispatch } from "../../../app/store";
import { CreateClient, getClients } from "../../../features/client/clientSlice";
import { IdGenerate } from "../../../utils/idGenerate";
import { notify } from "../../../utils/notify";
interface CreateFicheModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateFicheModal: React.FC<CreateFicheModalProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();


  // ✅ Define validation schema using Yup
  const validationSchema = Yup.object({
    fullname: Yup.string()
      .min(3, "fullname must be at least 3 characters")
      .max(50, "fullname must be at most 50 characters")
      .required("fullname is required"),
    contact: Yup.string().required("contact is required"),
    address: Yup.string().required("address is required"),
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Nouvelle fiche d'identité</h2>

        {/* ✅ Using Formik for Form Management */}
        <Formik
          initialValues={
            { fullname: "", contact: "", address: "" } 
          }
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              const id = IdGenerate("Cli");
              
              const parsedValues = {
                ...values,
                client_id: id,
              };
              // alert("Submitting form with values: " + JSON.stringify(parsedValues, null, 2));
              await dispatch(CreateClient(parsedValues)).unwrap();
              notify("Client reçu avec succès !", "success");
              await dispatch(getClients());

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
                  Nom complet
                </label>
                {/* ✅ Using Formik's Field for input */}
                <Field
                  type="text"
                  name="fullname"
                  className="w-full border p-2 rounded-md"
                  placeholder="Nom complet"
                />
                {/* ✅ Display validation error message */}
                <ErrorMessage
                  name="fullname"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Contact
                </label>
                {/* ✅ Using Formik's Field for input */}
                <Field
                  type="text"
                  name="contact"
                  className="w-full border p-2 rounded-md"
                  placeholder="Contact"
                />
                {/* ✅ Display validation error message */}
                <ErrorMessage
                  name="contact"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Adresse
                </label>
                {/* ✅ Using Formik's Field for input */}
                <Field
                  type="text"
                  name="address"
                  className="w-full border p-2 rounded-md"
                  placeholder="Adresse"
                />
                {/* ✅ Display validation error message */}
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              {/* <div className="mb-4">
                <Field
                  as="select"
                  name="client_id"
                  className="w-full border p-2 rounded-md"
                >
                  <option value="">Select a client</option>
                  {clients &&
                    clients.map((c) => (
                      <option key={c.client_id} value={Number(c.client_id)}>
                        {c.fullname}
                      </option>
                    ))}
                </Field>
                ✅ Display validation error message
                <ErrorMessage
                  name="client_id"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div> */}
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

export default CreateFicheModal;