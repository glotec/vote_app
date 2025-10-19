import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { AppDispatch } from "../../app/store";
import { IdGenerate } from "../../utils/idGenerate";
import { CreateAnnee, getAnnees } from "../../features/year/yearSlice";
import { notify } from "../../utils/notify";
interface CreateYearProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateYear: React.FC<CreateYearProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();


  // ✅ Define validation schema using Yup
  const validationSchema = Yup.object({
    annee: Yup.string()
      .min(3, "annee must be at least 3 characters")
      .max(50, "annee must be at most 50 characters")
      .required("annee is required"),
    debut: Yup.string().required("debut is required"),
    fin: Yup.string().required("fin is required"),
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white text-neutral p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Nouvelle année</h2>

        {/* ✅ Using Formik for Form Management */}
        <Formik
          initialValues={
            { annee: "", debut: "", fin: "", fin_inscription: "" } 
          }
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              const id = IdGenerate("An");
              
              const parsedValues = {
                ...values,
                code: id,
              };
              // alert("Submitting form with values: " + JSON.stringify(parsedValues, null, 2));
              await dispatch(CreateAnnee(parsedValues)).unwrap();
              notify("Année reçu avec succès !", "success");
              await dispatch(getAnnees());

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
                  Année académique
                </label>
                {/* ✅ Using Formik's Field for input */}
                <Field
                  type="text"
                  name="annee"
                  className="w-full border p-2 rounded-md"
                  placeholder="Année académique"
                />
                {/* ✅ Display validation error message */}
                <ErrorMessage
                  name="annee"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Debut
                </label>
                {/* ✅ Using Formik's Field for input */}
                <Field
                  type="date"
                  name="debut"
                  className="input w-full border p-2 rounded-md"
                  placeholder="debut"
                />
                {/* ✅ Display validation error message */}
                <ErrorMessage
                  name="debut"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Fin
                </label>
                {/* ✅ Using Formik's Field for input */}
                <Field
                  type="date"
                  name="fin"
                  className="input w-full border p-2 rounded-md"
                  placeholder="Adresse"
                />
                {/* ✅ Display validation error message */}
                <ErrorMessage
                  name="fin"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Fin d'inscription
                </label>
                {/* ✅ Using Formik's Field for input */}
                <Field
                  type="date"
                  name="fin_inscription"
                  className="input w-full border p-2 rounded-md"
                  placeholder="Adresse"
                />
                {/* ✅ Display validation error message */}
                <ErrorMessage
                  name="fin_inscription"
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

export default CreateYear;