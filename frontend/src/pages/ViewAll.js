import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocalStorage } from "../components/localStorage";
import { redirect } from "react-router-dom";

const ViewAll = () => {
  console.log("userEmail");
  const [userEmail, setUserEmail] = useLocalStorage("email", "");
  console.log(userEmail);
  if (!userEmail) {
    redirect("/authentication/login");
  }

  const [itemList, setItems] = useState(null);
  useEffect(() => {
    getItems();
  });

  console.log(itemList);

  const getItems = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_DB}/items/get-all-items?email=${userEmail}`
      )
      .then((res) => {
        const result = res.data.results.map((obj) => ({
          itemName: obj.itemName,
          originalPrice: obj.originalPrice,
          newPrice: obj.newPrice,
          rating: obj.rating,
          reviewTotal: obj.reviewTotal,
          availability: obj.availability,
          url: obj.url,
          email: obj.email,
        }));
        setItems(result);
      });

    console.log(itemList);
    fetch(
      `${process.env.REACT_APP_BACKEND_DB}/items/get-all-items?email=${userEmail}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result);
        },
        (error) => {
          setItems(null);
        }
      );
  };
  if (!itemList) {
    return <div>no Items</div>;
  }
  return (
    <div>
      <main className="flex-col min-h-screen items-center justify-between">
        <h1 className="text-xl font-bold text-left text-gray-700 uppercase dark:text-gray-400">
          View All
        </h1>
        <br />
        <button
          type="button"
          onClick={() => (window.location.href = "/add-item")}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Item.
        </button>
        <br />
        <br />
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-8 py-4">
                  Name
                </th>
                <th scope="col" className="px-8 py-4">
                  Original Price
                </th>
                <th scope="col" className="px-8 py-4">
                  New Price
                </th>
                <th scope="col" className="px-8 py-4">
                  Rating
                </th>
                <th scope="col" className="px-8 py-4">
                  Review Total
                </th>
                <th scope="col" className="px-8 py-4">
                  Availability
                </th>
                <th scope="col" className="px-8 py-4">
                  URL
                </th>
                <th scope="col" className="px-8 py-4">
                  Email
                </th>
                <th scope="col" className="px-8 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            {
              null != itemList && (
                <tbody>
                  {itemList.map((item) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      key={item.itemName}
                    >
                      <td scope="row" className="px-8 py-4">
                        {item.itemName}
                      </td>
                      <td scope="row" className="px-8 py-4">
                        {item.originalPrice}
                      </td>
                      <td scope="row" className="px-8 py-4">
                        {item.newPrice}
                      </td>
                      <td scope="row" className="px-8 py-4">
                        {item.rating}
                      </td>
                      <td scope="row" className="px-8 py-4">
                        {item.reviewTotal}
                      </td>
                      <td scope="row" className="px-8 py-4">
                        {item.availability}
                      </td>
                      <td scope="row" className="px-8 py-4">
                        {item.url}
                      </td>
                      <td scope="row" className="px-8 py-4">
                        {item.email}
                      </td>
                      <td scope="row" className="px-8 py-4">
                        <button
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => UpdateItem(userEmail, item)}
                        >
                          Check
                        </button>
                        {" | "}
                        <button
                          className="font-medium text-red-600 dark:text-red-500 hover:underline"
                          onClick={() => DeleteItem(userEmail, item)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )
              // || (
              //   // empty version if there is nothing...
              //   <tbody>
              //     <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              //       <td scope="row" className="px-6 py-4"></td>
              //       <td scope="row" className="px-6 py-4"></td>
              //       <td scope="row" className="px-6 py-4"></td>
              //       <td scope="row" className="px-6 py-4"></td>
              //       <td scope="row" className="px-6 py-4"></td>
              //       <td scope="row" className="px-6 py-4"></td>
              //       <td scope="row" className="px-6 py-4"></td>
              //       <td scope="row" className="px-6 py-4"></td>
              //       <td scope="row" className="px-6 py-4"></td>
              //     </tr>
              //   </tbody>
              // )
            }
          </table>
        </div>
      </main>
    </div>
  );
};

function DeleteItem(userEmail, item) {
  console.log(`${process.env.REACT_APP_BACKEND_DB}/items/delete-item`);
  axios
    .delete(`${process.env.REACT_APP_BACKEND_DB}/items/delete-item`, {
      data: {
        email: userEmail,
        url: item.url,
      },
    })
    .then(function (response) {
      console.log(response);
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function UpdateItem(userEmail, item) {
  console.log(`${process.env.REACT_APP_BACKEND_DB}/items/UpdatePrice`);
  axios
    .patch(`${process.env.REACT_APP_BACKEND_DB}/items/UpdatePrice`, {
      email: userEmail,
      url: item.url,
    })
    .then(function (response) {
      console.log(response);
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
}

export default ViewAll;
