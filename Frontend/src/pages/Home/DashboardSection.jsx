import dashboardImg from '../../assets/4022440.jpg';

export default function DashboardSection() {
  const handleClick = () => {
    window.location.href = "/register";
  };

  return (
    <section className="dashboard-section-container">
      <div className="container">
        <div className="dashboard-section">
          <div className="dashboard-content">
            <h2>Helpful Dashboard for add and edit data</h2>
            <p>
              We provide a dashboard with the ability to add and edit datasets and other controls over Website
            </p>
            <div className="register">
              <p>Find more and access these functionalities and control you need to register for Analyst Role</p>
              <button onClick={handleClick} className="dashboard-btn green-dashboard-btn">Register</button>
            </div>
          </div>
          <div className="dashboard-image">
            <img src={dashboardImg} alt="dashboard" />
          </div>
        </div>
      </div>
    </section>
  )
}
