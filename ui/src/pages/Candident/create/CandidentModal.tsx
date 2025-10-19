import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { AppDispatch } from "../../../app/store";
import { IdGenerate } from "../../../utils/idGenerate";
import { notify } from "../../../utils/notify";
import {
  CreateCandident,
  getCandidents,
} from "../../../features/candident/candidentSlice";
import { CreatePic } from "../../../features/pic/picSlice";

interface CandidentProps {
  isOpen: boolean;
  onClose: () => void;
}

const CandidentModal: React.FC<CandidentProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  // ✅ Define validation schema using Yup
  const validationSchema = Yup.object({
    cid: Yup.string().required("cid is required"),
    name: Yup.string().required("name is required"),
    cycle: Yup.string().required("cycle is required"),
    // pic: Yup.mixed()
    //   .test("fileSize", "File too large", (value) => {
    //     return !value || (value && value.size <= 2 * 1024 * 1024); // 2MB
    //   })
    //   .test("fileType", "Unsupported Format", (value) => {
    //     return (
    //       !value ||
    //       (value &&
    //         ["image/jpeg", "image/png", "image/jpg"].includes(value.type))
    //     );
    //   }),
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Ajouter un candidat</h2>

        {/* ✅ Using Formik for Form Management */}
        <Formik
          initialValues={{
            cid: "",
            name: "",
            cycle: "Primaire",
            file: null,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            // alert(
            //   "Submitting form with values: " + JSON.stringify(values, null, 2)
            // );
            try {
              if (!values.file) {
                notify("Veuillez sélectionner une photo.", "error");
                return;
              }
              const p = IdGenerate("Pid");
              //   const cli = clients?.client_id || values.client_id;
              const payload = {
                cid: values.cid,
                name: values.name,
                cycle: values.cycle, // Use the generated ID here
              };

              const payloadP = {
                pid: p,
                file: values.file,
                cand: values.cid, // Use the generated ID here
              };

              //   alert("Submitting form with values: " + JSON.stringify(payload, null, 2));
              await dispatch(CreateCandident(payload)).unwrap();
              await dispatch(CreatePic(payloadP)).unwrap();
              // ✅ Show success notification
              notify("Client enregistré avec succès !", "success");

              // ✅ Fetch updated category list
              await dispatch(getCandidents());

              resetForm(); // Reset form after submission
              onClose(); // Close modal
            } catch (error) {
              console.error("Failed to create client:", error);
            }
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Numer
                </label>
                {/* ✅ Using Formik's Field for input */}
                <Field
                  type="text"
                  name="cid"
                  className="w-full border p-2 rounded-md"
                  placeholder="num"
                />
                {/* ✅ Display validation error message */}
                <ErrorMessage
                  name="cid"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Nom complet
                </label>
                {/* ✅ Using Formik's Field for input */}
                <Field
                  type="text"
                  name="name"
                  className="w-full border p-2 rounded-md"
                  placeholder="numnom complet"
                />
                {/* ✅ Display validation error message */}
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Photo du candidat
                </label>
                <input
                  type="file"
                  name="file"
                  accept="image/*"
                  className="w-full border p-2 rounded-md"
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0];
                    setFieldValue("file", file);
                  }}
                />
                <ErrorMessage
                  name="file"
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

export default CandidentModal;
