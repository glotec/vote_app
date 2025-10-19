import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { notify } from "../../utils/notify";
import { IdGenerate } from "../../utils/idGenerate";
// import type { RootState } from "../../app/store";
// import { useSelector } from "react-redux";
// import FormikFileInput from "../../components/form/FormikFileInput";

const RegisterPage: React.FC = () => {
  // const dispatch: AppDispatch = useDispatch();
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const { roles } = useSelector((state: RootState) => state.userRoleSlice);


  const validationSchema = Yup.object({
    nom: Yup.string().min(3).max(50).required("nom is required"),
    prenom: Yup.string().required("prenom is required"),
    nationalite: Yup.string().required("nationalite is required"),
    lieu_naissance: Yup.string().required("lieu_naissance is required"),
    date_naissance: Yup.string().required("date_naissance is required"),
    etat_civil: Yup.string().required("etat_civil is required"),
    // province: Yup.string().required("province is required"),
    // territoire: Yup.string().required("territoire is required"),
    // collectivite: Yup.string().required("collectivite is required"),
    sexe: Yup.string().required("sexe is required"), // ✅ match form
    nom_pere: Yup.string().required("Nom du pere obligatoire"),
    nom_mere: Yup.string().required("Nom de la mere obligatoire"),
    prov_parent: Yup.string().required("Province parents requires"),
    torparent: Yup.string().required("Territoire parents"),
    nom_sec: Yup.string().required("Nom ecole secondaire reauired"),
    adr_eco: Yup.string().required("Adresse ecole required"),
    sec_hum: Yup.string().required("section required"),
    nom_cent: Yup.string().required("nom centre required"),
    ann_dip: Yup.string().required("annee diplome required"),
    pourc_dip: Yup.string().required("pourcentage required"),
    num_dip: Yup.string().required("numero diplome required"),
    act_pro: Yup.string().required("activite required"),
    prem_choix: Yup.string().required("premier choix required"),
    deux_choix: Yup.string().required("deuxieme choix required"),
    ann_acad: Yup.string().required("annee academique required"),
    etab: Yup.string().required("etablissement required"),
    ann_et_fac: Yup.string().required("annee etablissement required"),
    resu: Yup.string().required("result required"),
  });

  return (
    // <div className="flex justify-center items-center h-[calc(100vh-120px)] bg-gray-100">
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <Formik
        initialValues={{
          nom: "",
          prenom: "",
          sexe: "",
          email: "",
          contact: "",
          lieu_naissance: "",
          date_naissance: "",
          etat_civil: "",
          nationalite: "",
          nom_pere: "",
          nom_mere: "",
          prov_parent: "",
          torparent: "",
          nom_sec: "",
          adr_eco: "",
          sec_hum: "",
          nom_cent: "",
          ann_dip: "",
          pourc_dip: "",
          num_dip: "",
          act_pro: "",
          prem_choix: "",
          deux_choix: "",
          ann_acad: "",
          etab: "",
          ann_et_fac: "",
          resu: "",

          // province: "",
          // territoire: "",
          // collectivite: "",
          // bulletin_4eme_annee: null, // ✅ file inputs start as null
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const matricule = IdGenerate("Pers");

            // const parsedValues = {
            //   ...values,
            //   matricule: id,
            // };
            const payload = {
                matricule: matricule,
                nom: values.nom,
                prenom: values.prenom,
                genre: values.sexe,
              };

            // await dispatch(signupUser(parsedValues)).unwrap();
            console.log("Form submission values:", values); // 👈 TEST
            alert(
              "Submitting form with values: " + JSON.stringify(values, null, 2)
            );

            notify("Personne enregistré avec succès !", "success");
            // navigate("/ucs/message");
            setTimeout(() => {
              navigate("/ucs/message");
            }, 1000);

            resetForm();
            //   onClose();
          } catch (error) {
            console.error("Failed to create client:", error);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="shadow-md rounded px-4 sm:px-6 md:px-8 pt-6 pb-8 mb-4 bg-white w-full max-w-7xl mx-auto">
            {/* <Form className="shadow-md rounded px-8 pt-6 pb-8 mb-4"> */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"></div> */}
            <h2 className="text-xl font-bold mb-6 text-neutral">
              BULLETIN D’INSCRIPTION A L’ENSEIGNEMENT SUPERIEUR ET UNIVERSITAIRE
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Nom
                  </label>
                  {/* ✅ Using Formik's Field for input */}
                  <Field
                    type="text"
                    name="nom"
                    className="w-full border p-2 rounded-md text-neutral"
                    placeholder="Votre Nom"
                  />
                  {/* ✅ Display validation error message */}
                  <ErrorMessage
                    name="nom"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Post nom | Prénom
                  </label>
                  {/* ✅ Using Formik's Field for input */}
                  <Field
                    type="text"
                    name="prenom"
                    className="w-full border p-2 rounded-md text-neutral"
                    placeholder="Votre Prénom"
                  />
                  {/* ✅ Display validation error message */}
                  <ErrorMessage
                    name="prenom"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  {/* ✅ Using Formik's Field for input */}
                  <Field
                    type="email"
                    name="email"
                    className="w-full border p-2 rounded-md text-neutral"
                    placeholder="Votre email"
                  />
                  {/* ✅ Display validation error message */}
                  <ErrorMessage
                    name="email"
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
                    className="w-full border p-2 rounded-md text-neutral"
                    placeholder="Votre contact"
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
                    Nationalité
                  </label>
                  {/* ✅ Using Formik's Field for input */}
                  <Field
                    type="text"
                    name="nationalite"
                    className="w-full border p-2 rounded-md text-neutral"
                    placeholder="Votre nationalité"
                  />
                  {/* ✅ Display validation error message */}
                  <ErrorMessage
                    name="nationalite"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Lieu de naissance
                  </label>
                  {/* ✅ Using Formik's Field for input */}
                  <Field
                    type="text"
                    name="lieu_naissance"
                    className="w-full border p-2 rounded-md text-neutral"
                    placeholder="Votre lieu de naissance"
                  />
                  {/* ✅ Display validation error message */}
                  <ErrorMessage
                    name="lieu_naissance"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Nom du père
                  </label>
                  {/* ✅ Using Formik's Field for input */}
                  <Field
                    type="text"
                    name="nom_pere"
                    className="w-full border p-2 rounded-md text-neutral"
                    placeholder="Nom de votre père"
                  />
                  {/* ✅ Display validation error message */}
                  <ErrorMessage
                    name="nom_pere"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Nom de la mère
                  </label>
                  {/* ✅ Using Formik's Field for input */}
                  <Field
                    type="text"
                    name="nom_mere"
                    className="w-full border p-2 rounded-md text-neutral"
                    placeholder="Nom de votre mère"
                  />
                  {/* ✅ Display validation error message */}
                  <ErrorMessage
                    name="nom_mere"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Province d'origine parent
                  </label>
                  {/* ✅ Using Formik's Field for input */}
                  <Field
                    type="text"
                    name="prov_parent"
                    className="w-full border p-2 rounded-md text-neutral"
                    placeholder="Origine parents"
                  />
                  {/* ✅ Display validation error message */}
                  <ErrorMessage
                    name="prov_parent"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Territoire
                  </label>
                  {/* ✅ Using Formik's Field for input */}
                  <Field
                    type="text"
                    name="torparent"
                    className="w-full border p-2 rounded-md text-neutral"
                    placeholder="Origine parents"
                  />
                  {/* ✅ Display validation error message */}
                  <ErrorMessage
                    name="torparent"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Nom de l’école secondaire fréquenté
                  </label>
                  {/* ✅ Using Formik's Field for input */}
                  <Field
                    type="text"
                    name="nom_sec"
                    className="w-full border p-2 rounded-md text-neutral"
                    placeholder="Nom école secondaire"
                  />
                  {/* ✅ Display validation error message */}
                  <ErrorMessage
                    name="nom_sec"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Adresse de l’école
                  </label>
                  {/* ✅ Using Formik's Field for input */}
                  <Field
                    type="text"
                    name="adr_eco"
                    className="w-full border p-2 rounded-md text-neutral"
                    placeholder="Adresse physique école"
                  />
                  {/* ✅ Display validation error message */}
                  <ErrorMessage
                    name="adr_eco"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Section suivi aux humanités
                  </label>
                  {/* ✅ Using Formik's Field for input */}
                  <Field
                    type="text"
                    name="sec_hum"
                    className="w-full border p-2 rounded-md text-neutral"
                    placeholder="Section aux humanités"
                  />
                  {/* ✅ Display validation error message */}
                  <ErrorMessage
                    name="sec_hum"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Nom du centre d'exétat
                  </label>
                  {/* ✅ Using Formik's Field for input */}
                  <Field
                    type="text"
                    name="nom_cent"
                    className="w-full border p-2 rounded-md text-neutral"
                    placeholder="Nom du centre exétat"
                  />
                  {/* ✅ Display validation error message */}
                  <ErrorMessage
                    name="nom_cent"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Année d'obtention du diplôme
                  </label>
                  {/* ✅ Using Formik's Field for input */}
                  <Field
                    type="text"
                    name="ann_dip"
                    className="w-full border p-2 rounded-md text-neutral"
                    placeholder="Année d'obtention du diplôme"
                  />
                  {/* ✅ Display validation error message */}
                  <ErrorMessage
                    name="ann_dip"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Pourcentage obtenu
                  </label>
                  {/* ✅ Using Formik's Field for input */}
                  <Field
                    type="text"
                    name="pourc_dip"
                    className="w-full border p-2 rounded-md text-neutral"
                    placeholder="Pourcentage obtenu"
                  />
                  {/* ✅ Display validation error message */}
                  <ErrorMessage
                    name="pourc_dip"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Numéro diplôme
                  </label>
                  {/* ✅ Using Formik's Field for input */}
                  <Field
                    type="text"
                    name="num_dip"
                    className="w-full border p-2 rounded-md text-neutral"
                    placeholder="Numéro diplôme"
                  />
                  {/* ✅ Display validation error message */}
                  <ErrorMessage
                    name="num_dip"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Activités professionnelles
                  </label>
                  {/* ✅ Using Formik's Field for input */}
                  <Field
                    type="text"
                    name="act_pro"
                    className="w-full border p-2 rounded-md text-neutral"
                    placeholder="Activités professionnelles"
                  />
                  {/* ✅ Display validation error message */}
                  <ErrorMessage
                    name="act_pro"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Premier choix du domaine (filière)
                  </label>
                  {/* ✅ Using Formik's Field for input */}
                  <Field
                    type="text"
                    name="prem_choix"
                    className="w-full border p-2 rounded-md text-neutral"
                    placeholder="Numéro diplôme"
                  />
                  {/* ✅ Display validation error message */}
                  <ErrorMessage
                    name="prem_choix"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Deuxième choix du domaine (filière)
                  </label>
                  {/* ✅ Using Formik's Field for input */}
                  <Field
                    type="text"
                    name="deux_choix"
                    className="w-full border p-2 rounded-md text-neutral"
                    placeholder="Numéro diplôme"
                  />
                  {/* ✅ Display validation error message */}
                  <ErrorMessage
                    name="deux_choix"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Date de naissance
                  </label>
                  {/* ✅ Using Formik's Field for input */}
                  <Field
                    type="date"
                    name="date_naissance"
                    className="w-full border p-2 rounded-md text-neutral"
                    placeholder="Votre date de naissance"
                  />
                  {/* ✅ Display validation error message */}
                  <ErrorMessage
                    name="date_naissance"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4 text-gray-700">
                  <label className="block text-sm font-medium text-gray-700">
                    Sexe
                  </label>
                  <Field
                    as="select"
                    name="sexe"
                    className="w-full border p-2 rounded-md"
                  >
                    <option value="">Sélectionner votre genre</option>
                    <option value="Masculin">Masculin</option>
                    <option value="Féminin">Féminin</option>
                  </Field>
                  {/* ✅ Display validation error message */}
                  <ErrorMessage
                    name="sexe"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4 text-gray-700">
                  <label className="block text-sm font-medium text-gray-700">
                    Etat civil
                  </label>
                  <Field
                    as="select"
                    name="etat_civil"
                    className="w-full border p-2 rounded-md"
                  >
                    <option value="">Sélectionner votre état civil</option>
                    <option value="Célibataire">Célibataire</option>
                    <option value="Marié(e)">Marié(e)</option>
                  </Field>
                  {/* ✅ Display validation error message */}
                  <ErrorMessage
                    name="etat_civil"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                {/* <h2 className="text-sm font-bold mb-6 text-red-400">
                  Les finalistes de l’Année en cours <br /> ne rempliront pas
                  les points cette section
                </h2> */}
                <h2 className="text-sm font-bold mb-2 text-neutral">
                  Etudes poste universitaires
                </h2>
                <div className="mb-4">
                  {/* <label className="block text-sm font-medium text-gray-700">
                    Année d’obtention du diplôme d’Etat
                  </label> */}
                  {/* ✅ Using Formik's Field for input */}
                  <Field
                    type="text"
                    name="ann_acad"
                    className="w-full border p-2 rounded-md text-neutral"
                    placeholder="Année académique"
                  />
                  {/* ✅ Display validation error message */}
                  <ErrorMessage
                    name="ann_acad"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  {/* <label className="block text-sm font-medium text-gray-700">
                    Pourcentage du diplôme d’Etat
                  </label> */}
                  {/* ✅ Using Formik's Field for input */}
                  <Field
                    type="text"
                    name="etab"
                    className="w-full border p-2 rounded-md text-neutral"
                    placeholder="Etablissement"
                  />
                  {/* ✅ Display validation error message */}
                  <ErrorMessage
                    name="etab"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  {/* <label className="block text-sm font-medium text-gray-700">
                    Numéro du diplôme d’Etat
                  </label> */}
                  {/* ✅ Using Formik's Field for input */}
                  <Field
                    type="text"
                    name="ann_et_fac"
                    className="w-full border p-2 rounded-md text-neutral"
                    placeholder="Année d’études et Faculté/ Section"
                  />
                  {/* ✅ Display validation error message */}
                  <ErrorMessage
                    name="ann_et_fac"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4 text-gray-700">
                  {/* <label className="block text-sm font-medium text-gray-700">
                    Sexe
                  </label> */}
                  <Field
                    type="text"
                    name="resu"
                    className="w-full border p-2 rounded-md"
                    placeholder="Résultat"
                  />
                  {/* ✅ Display validation error message */}
                  <ErrorMessage
                    name="resu"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              {/* <div>
                <FormikFileInput
                  name="bulletin_4eme_annee"
                  label="Copie du bulletin de 4ème année"
                />
              </div> */}
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

export default RegisterPage;
