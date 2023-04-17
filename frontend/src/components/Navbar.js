import { Link } from "react-router-dom";
import { SessionToggle } from "./SessionToggle";

export const Navbar = () => {
  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link
            className="flex items-center"
            onClick={() => (window.location.href = "/")}
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Amazon Scraper
            </span>
          </Link>

          <div className="flex items-right">
            <SessionToggle />
          </div>
        </div>
      </nav>
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
              <li>
                <Link
                  className="text-gray-900 dark:text-white hover:underline"
                  onClick={() => (window.location.href = "/view-all")}
                >
                  View All
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
