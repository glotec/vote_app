import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { CreateClinic, getClinics } from "../../../features/clinic/clinicSlice";
import { notify } from "../../../utils/notify";
interface CreateFicheModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateClinics: React.FC<CreateFicheModalProps> = ({
  isOpen,
}) => {
  // const dispatch: AppDispatch = useDispatch();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getClinics());
  }, [dispatch]);

  if (!isOpen) return null;
  
  // ✅ Define validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "name must be at least 3 characters")
      .max(50, "name must be at most 50 characters")
      .required("name is required"),
    address: Yup.string().required("address is required"),
    phone: Yup.string().required("phone is required"),
    email: Yup.string().email("Invalid email format").required("email is required"),
    // is_active: Yup.number(),
  });

  return (
    <div className="flex justify-center items-center h-[calc(100vh-120px)] bg-gray-100">
      <Formik
        initialValues={{
          name: "",
          address: "",
          phone: "",
          email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const payload = {
              name: values.name,
              address: values.address,
              phone: values.phone,
              email: values.email,
            };

            await dispatch(CreateClinic(payload)).unwrap();

            notify("Client enregistré avec succès !", "success");
            navigate("/cl/settings");

            resetForm();
            //   onClose();
          } catch (error) {
            console.error("Failed to create client:", error);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl font-bold mb-6">Créer une Clinique</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              {/* ✅ Using Formik's Field for input */}
              <Field
                type="text"
                name="name"
                className="w-full border p-2 rounded-md"
                placeholder="Nom complet"
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
                Phone
              </label>
              {/* ✅ Using Formik's Field for input */}
              <Field
                type="text"
                name="phone"
                className="w-full border p-2 rounded-md"
                placeholder="Numéro de téléphone"
              />
              {/* ✅ Display validation error message */}
              <ErrorMessage
                name="phone"
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
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="w-full border p-2 rounded-md"
                placeholder="Adresse"
              />
              {/* <Field
                as="select"
                name="role_id"
                className="w-full border p-2 rounded-md"
              >
                <option value="">Sélectionner un rôle</option>
                {roles &&
                  roles.map((c) => (
                    <option key={c.role_id} value={Number(c.role_id)}>
                      {c.role_name}
                    </option>
                  ))}
              </Field> */}
              {/* ✅ Display validation error message */}
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enregistrement..." : "Enregistrer"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateClinics;
