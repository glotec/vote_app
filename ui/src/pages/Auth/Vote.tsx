import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
import useAppDispatch from "../../hooks/useAppDispatch";
import { notify } from "../../utils/notify";
// import logo from "../../assets/logo.jpeg";
import { CreateVote, getVotes } from "../../features/vote/voteSlice";
import { IdGenerate } from "../../utils/idGenerate";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { getPics } from "../../features/pic/picSlice";

const VoteForm: React.FC = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const { pics, loading, error } = useSelector(
    (state: RootState) => state.picSlice
  );

  // const dispatch: AppDispatch = useDispatch();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // setTimeout(() => {
      dispatch(getPics()); // Fetch categories when the component mounts
    // }, 2000)
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      vid: "", // you generate this on submit, so no need to validate
      candident: "",
    },
    validationSchema: Yup.object({
      candident: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const id = IdGenerate("Cli");

        const parsedValues = {
          ...values,
          vid: id,
        };
        // alert(
        //   "Submitting form with values: " +
        //     JSON.stringify(parsedValues, null, 2)
        // );
        await dispatch(CreateVote(parsedValues)).unwrap();
        notify("Vote réussi !", "success");
        await dispatch(getVotes());

        // resetForm();
        setSubmitted(true);
        setTimeout(() => {
          //   resetForm();
          window.location.reload();
          setSubmitted(false);
        }, 2000);
        // navigate("/");
      } catch (error) {
        console.error("Failed to create client:", error);
      }
    },
  });

  if (loading === "loading") return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  // Convert password into stars
  // const maskPassword = (value: string) => "★".repeat(value.length);

  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-160px)] bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {pics.map((pic, index) => (
          <div
            key={index}
            className="card bg-neutral text-neutral-content w-50"
          >
            <div className="card-body items-center text-center">
              <img
                src={`http://localhost:20255/uploads/${pic.pic}`} // or use full URL from API
                alt="Uploaded"
                style={{
                  width: "300px",
                  height: "auto",
                  border: "1px solid #ccc",
                }}
              />
              <h2 className="card-title">{pic.pcan.name}</h2>
              <div className="card-actions justify-end">
                <button className="btn btn-secondary">N°{pic.pcan.cid}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="avatar mb-5">
        <div className="w-24 rounded">
          <img alt="GSJoana" src={logo} className="h-8 w-auto" />{" "}
        </div>
      </div> */}
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="text-xl text-neutral font-bold mb-6">
          Formulaire de vote
        </h2>

        {submitted && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4 text-sm">
            ✅ Merci pour votre vote !
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Numéro
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            {...formik.getFieldProps("candident")}
          >
            <option value="" label="Selectionne le numéro" />
            <option value="1" label="1" />
            <option value="2" label="2" />
            <option value="3" label="3" />
            <option value="4" label="4" />
            <option value="5" label="5" />
          </select>
          {formik.touched.candident && formik.errors.candident ? (
            <p className="text-red-500 text-xs italic">
              {formik.errors.candident}
            </p>
          ) : null}

          {!submitted && (
            <button
              type="submit"
              className="bg-error-content hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Voter
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default VoteForm;
