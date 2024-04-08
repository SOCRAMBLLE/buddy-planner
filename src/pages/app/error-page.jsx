import { Link, useRouteError } from "react-router-dom";

export function NotFound() {
  return (
    <main className="error-page--container">
      <h1>Sorry, the page you were looking for was not found.</h1>
      <Link to={"/"}>
        <button>Return to home</button>
      </Link>
    </main>
  );
}

export function ErrorPage() {
  const error = useRouteError();
  console.log(error);
  return (
    <main className="error-page--container">
      <h1>Sorry, there was an error!</h1>
      <div className="error-page--block">
        <p>
          <strong>ERROR: </strong>
          {error.message}
        </p>
        <pre>
          {error.status} - {error.statusText}
        </pre>
      </div>
      <Link to={"/"}>
        <button>Return to home</button>
      </Link>
    </main>
  );
}
