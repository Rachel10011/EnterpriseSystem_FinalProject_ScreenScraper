import LoginState from "./login-state";

export default function Navbar() {
  return (
    <div>
      <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a href="/" class="flex items-center">
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Amazon Scraper
            </span>
          </a>
          <div class="flex items-center">
            {/* put login stuff here */}
            <LoginState />
          </div>
        </div>
      </nav>
      <nav class="bg-gray-50 dark:bg-gray-700">
        <div class="max-w-screen-xl px-4 py-3 mx-auto">
          <div class="flex items-center">
            <ul class="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
              <li>
                <a
                  href="/"
                  class="text-gray-900 dark:text-white hover:underline"
                >
                  View All
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-900 dark:text-white hover:underline"
                >
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
