// import api from "../../services/api";

// export const userService = async () => {
//   try {
//     const response = await api.get("/users/me", {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//       },
//     });

//     console.log("API response:", response)
//     // Only return the response data (this is serializable)
//     return response.data;
//   } catch (error) {
//     console.error("userService error:", error);
//     throw error;
//   }
// };

import api from "../../services/api";

export const userService = async () => {
  try {
    const response = await api.get("/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    const data = response;
    // console.log("userService response:", data); // Debugging

    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.data?.message || "Failed to fetch user");
    }

    // Return data, but remove headers
    return { data };
  } catch (error) {
    console.error("userService error:", error);
    throw error;
  }
};
