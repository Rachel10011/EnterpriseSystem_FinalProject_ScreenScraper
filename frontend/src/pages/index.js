import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [itemList, setItems] = useState(null);
  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    fetch(`$process.env.DB/items`)
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

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="relative overflow-x-auto">
          <h1 className="text-xl font-bold text-left text-gray-700 uppercase dark:text-gray-400">View All</h1>
          <button>
            Add Item.
          </button>

          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Original Price</th>
                <th scope="col" className="px-6 py-3">New Price</th>
                <th scope="col" className="px-6 py-3">Rating</th>
                <th scope="col" className="px-6 py-3">Review Total</th>
                <th scope="col" className="px-6 py-3">Availability</th>
                <th scope="col" className="px-6 py-3">URL</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            {null != itemList && <tbody>
              {itemList.map((item) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item.itemName}>
                  <td scope="row" className="px-6 py-4">{item.itemName}</td>
                  <td scope="row" className="px-6 py-4">{item.originalPrice}</td>
                  <td scope="row" className="px-6 py-4">{item.newPrice}</td>
                  <td scope="row" className="px-6 py-4">{item.rating}</td>
                  <td scope="row" className="px-6 py-4">{item.reviewTotal}</td>
                  <td scope="row" className="px-6 py-4">{item.availability}</td>
                  <td scope="row" className="px-6 py-4">{item.url}</td>
                  <td scope="row" className="px-6 py-4">{item.email}</td>
                  <td scope="row" className="px-6 py-4">Edit | Delete</td>
                </tr>
              ))}
            </tbody> || <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td scope="row" className="px-6 py-4"></td>
              <td scope="row" className="px-6 py-4"></td>
              <td scope="row" className="px-6 py-4"></td>
              <td scope="row" className="px-6 py-4"></td>
              <td scope="row" className="px-6 py-4"></td>
              <td scope="row" className="px-6 py-4"></td>
              <td scope="row" className="px-6 py-4"></td>
              <td scope="row" className="px-6 py-4"></td>
              <td scope="row" className="px-6 py-4"></td>
              </tr>
              </tbody>}
          </table>
        </div>
      </main>
    </div>
  );
}

{
  /* 
itemName
originalPrice
newPrice
rating
reviewTotal
availability
url
email



*/
}
