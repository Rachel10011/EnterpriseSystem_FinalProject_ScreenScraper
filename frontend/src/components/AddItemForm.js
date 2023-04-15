import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useLocalStorage } from "./localStorage";

export const AddItemForm = () => {
  const [userEmail, setUserEmail] = useLocalStorage("email", "");

  const schema = yup.object().shape({
    url: yup.string().required("URL is Required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(userEmail);
  console.log(`${process.env.REACT_APP_BACKEND_DB}/items/AddItem`);
  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_DB}/items/AddItem`, {
        url: data.url,
        email: userEmail,
      })
      .then(function (response) {
        console.log(response);
        window.location.href = "/view-all";
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Input URL:
          </label>
          <p>{errors.url?.message}</p>
          <input
            type="url"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="www.amazon.com/product"
            {...register("url")}
          ></input>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create Item
        </button>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => (window.location.href = "/view-all")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
