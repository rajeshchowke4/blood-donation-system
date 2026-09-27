import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div style={styles.container}>
      <h1>Blood Donation System</h1>

      <p>Welcome to your dashboard.</p>

      <div style={styles.cards}>
        <Link to="/donor" style={styles.card}>
          <h2>Become a Donor</h2>
          <p>Register yourself as a blood donor.</p>
        </Link>

        <Link to="/find-donors" style={styles.card}>
          <h2>Find Donors</h2>
          <p>Search for available blood donors.</p>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
  },

  cards: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "30px",
    flexWrap: "wrap",
  },

  card: {
    width: "250px",
    padding: "25px",
    borderRadius: "10px",
    backgroundColor: "#f5f5f5",
    textDecoration: "none",
    color: "#222",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  },
};

export default Dashboard;