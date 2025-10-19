import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import useAppDispatch from "../../hooks/useAppDispatch";
import { notify } from "../../utils/notify";
import { loginUser } from "../../features/auth/authSlice"

const LoginPage: React.FC = () => {
  // const dispatch: AppDispatch = useDispatch();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const [password, setPassword] = React.useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().min(3, "Password too short").required("Required"),
    }),
    onSubmit: async (values) => {
      // await dispatch(loginUser(values));
      // navigate("/dashboard");
      // try {
      //   const response = await dispatch(loginUser(values));
      //   console.log(response)
      //   console.log("Login response payload:", response.payload);

      //   if (response?.payload?.token) {
      //     // Adjust based on your API response
      //     navigate("/ucs/dashboard");
      //   } else {
      //     notify(response?.payload, "error");
      //     console.error("Login failed:", response?.payload || "Unknown error");
      //   }
      // } catch (error) {
      //   // notify(error.message, "error");
      //   console.log(error)
      // }

      try {
        const response = await dispatch(loginUser(values));

        console.log("Login response:", response);

        if (response?.payload?.token || response?.payload?.access_token) {
          navigate("/ucs/dashboard");
        } else {
          notify(response?.payload?.message || "Login failed", "error");
          // console.error("Login failed:", response?.payload);
        }
      } catch (error: any) {
        notify( "Login failed with error wrong credentials", "error");
        // console.error("Login error:", error);
      }

    },
  });

  // Convert password into stars
  // const maskPassword = (value: string) => "★".repeat(value.length);

  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-160px)] bg-gray-100">
      <div className="avatar mb-5">
        <div className="w-24 rounded">
          {/* <img alt="UCS" src={logo} className="h-8 w-auto" />{" "} */}
        </div>
      </div>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="text-xl text-neutral font-bold mb-6">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            type="text"
            {...formik.getFieldProps("username")}
          />
          {formik.touched.username && formik.errors.username ? (
            <p className="text-red-500 text-xs italic">
              {formik.errors.username}
            </p>
          ) : null}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            type="password"
            {...formik.getFieldProps("password")}
          />
          {/* <input
            type="text" // Keep it as text to control rendering
            value={maskPassword(formik.values.password)} // Display stars
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            title="Masked Password"
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value);
              formik.setFieldValue("password", e.target.value);
            }}
          /> */}
          {formik.touched.password && formik.errors.password ? (
            <p className="text-red-500 text-xs italic">
              {formik.errors.password}
            </p>
          ) : null}
        </div>
        <button
          type="submit"
          className="bg-error-content hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
