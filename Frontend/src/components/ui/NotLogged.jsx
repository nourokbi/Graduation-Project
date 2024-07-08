import { useNavigate } from "react-router-dom"; // Assuming you are using React Router for navigation

const NotLogged = () => {
  const navigate = useNavigate();

  return (
    <div className="container unauthorized">
      <h2>You are not logged in</h2>
      <p>
        Sorry you are not a Logged In, <br /> Please Login or Register to access
        this page.
      </p>
      <div className="btn-group">
        <button onClick={() => navigate("/")}>Go to Home</button>
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/register")}>Register</button>
      </div>
    </div>
  );
};

export default NotLogged;
