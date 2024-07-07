import notFound from "../assets/not-found.jpg";

export default function NotFound() {
  const onClick = () => {
    window.location.href = "/";
  };

  return (
    <div className="container">
      <div className="not-found">
        <div className="content">
          <h1>Not Found</h1>
          <p>Sorry, the page you are looking for does not exist.</p>
          <button onClick={onClick}>Back to home</button>
        </div>
        <img src={notFound} alt="Not found Illisturation" />
      </div>
    </div>
  );
}
