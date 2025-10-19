import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { AppDispatch } from "../../../app/store";
import { IdGenerate } from "../../../utils/idGenerate";
import {
  CreateReception,
  getReceptions,
} from "../../../features/reception/receptionSlice";
import { notify } from "../../../utils/notify";
import type { Client } from "../../../features/client/types";

interface CreateReceptionProps {
  isOpen: boolean;
  onClose: () => void;
  clients: Client | null;
}

const CreateReceptions: React.FC<CreateReceptionProps> = ({
  isOpen,
  onClose,
  clients,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  // ✅ Define validation schema using Yup
  const validationSchema = Yup.object({
    motif: Yup.string().required("Motif is required"),
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Recevoir {clients?.fullname}</h2>

        {/* ✅ Using Formik for Form Management */}
        <Formik
          initialValues={{
            motif: "",
            client_id: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
              alert("Submitting form with values: " + JSON.stringify(values, null, 2));
            try {
              const rec = IdGenerate("Rec");
              const cli = clients?.client_id || values.client_id;
              const payload = {
                reception_id: rec,
                motif: values.motif,
                client_id: cli, // Use the generated ID here
              };

              // alert("Submitting form with values: " + JSON.stringify(payload, null, 2));
              await dispatch(CreateReception(payload)).unwrap();
              // ✅ Show success notification
              notify("Client enregistré avec succès !", "success");

              // ✅ Fetch updated category list
              await dispatch(getReceptions());

              resetForm(); // Reset form after submission
              onClose(); // Close modal
            } catch (error) {
              console.error("Failed to create client:", error);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Motif
                </label>
                {/* ✅ Using Formik's Field for input */}
                <Field
                  type="text"
                  name="motif"
                  className="w-full border p-2 rounded-md"
                  placeholder="motif de la reception"
                />
                {/* ✅ Display validation error message */}
                <ErrorMessage
                  name="motif"
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

export default CreateReceptions;
