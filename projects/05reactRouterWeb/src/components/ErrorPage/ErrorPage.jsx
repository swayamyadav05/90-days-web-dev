import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Oops!</h1>
        <p className="text-xl mb-4">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="text-gray-400">
          <i>{error?.statusText || error?.message}</i>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
