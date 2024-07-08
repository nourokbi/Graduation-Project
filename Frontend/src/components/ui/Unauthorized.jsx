import { useNavigate } from "react-router-dom"; // Assuming you are using React Router for navigation

const Unauthorized = () => {
  const navigate = useNavigate();
  const handleNavigateHome = () => {
    return navigate("/");
  };

  return (
    <div className="container unauthorized">
      <h2>Unauthorized Access</h2>
      <p>
        Sorry you are not authorized to access dashboard, <br /> Please wait for admin
        approval
      </p>
      <button onClick={handleNavigateHome}>Go to Home</button>
    </div>
  );
};

export default Unauthorized;
