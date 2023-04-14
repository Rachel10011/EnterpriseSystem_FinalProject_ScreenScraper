import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div>
      <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link
            class="flex items-center"
            onClick={() => (window.location.href = "/")}
          >
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Amazon Scraper
            </span>
          </Link>

          <div class="flex items-center">
            {/* put login stuff here */}
            Login
          </div>
        </div>
      </nav>
      <nav class="bg-gray-50 dark:bg-gray-700">
        <div class="max-w-screen-xl px-4 py-3 mx-auto">
          <div class="flex items-center">
            <ul class="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
              <li>
                <Link
                  class="text-gray-900 dark:text-white hover:underline"
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
