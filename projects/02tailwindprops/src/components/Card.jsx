const Card = ({ username }) => {
  console.log("props", username);
  return (
    <div>
      <a
        href="#"
        class="block rounded-md border border-amber-200 p-4 shadow-sm sm:p-6 mb-2"
      >
        <div class="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
          <div class="sm:order-last sm:shrink-0">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
              class="size-16 rounded-full object-cover sm:size-[72px]"
            />
          </div>

          <div class="mt-4 sm:mt-0">
            <h3 class="text-lg font-medium text-pretty text-gray-200">
              How I built my first website with Nuxt, Tailwind CSS and Vercel
            </h3>

            <p class="mt-1 text-sm text-gray-100">{username}</p>

            <p class="mt-4 line-clamp-2 text-sm text-pretty text-gray-300">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. At velit
              illum provident a, ipsa maiores deleniti consectetur nobis et
              eaque.
            </p>
          </div>
        </div>

        <dl class="mt-6 flex gap-4 lg:gap-6">
          <div class="flex items-center gap-2">
            <dt class="text-gray-200">
              <span class="sr-only"> Published on </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                />
              </svg>
            </dt>

            <dd class="text-xs text-gray-300">31/06/2025</dd>
          </div>

          <div class="flex items-center gap-2">
            <dt class="text-gray-300">
              <span class="sr-only"> Reading time </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
              </svg>
            </dt>

            <dd class="text-xs text-gray-300">12 minutes</dd>
          </div>
        </dl>
      </a>
    </div>
  );
};

export default Card;
