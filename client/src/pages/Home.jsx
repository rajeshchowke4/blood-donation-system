import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home">
            <section className="hero">
                <div>
                    <h1>
                        Donate Blood.
                        <br />
                        Save Lives.
                    </h1>

                    <p>
                        Connect blood donors with people
                        who need blood quickly and safely.
                    </p>

                    <div className="hero-buttons">
                        <Link
                            to="/donor"
                            className="button"
                        >
                            Become a Donor
                        </Link>

                        <Link
                            to="/find-donors"
                            className="button secondary"
                        >
                            Find Blood
                        </Link>
                    </div>
                </div>

                <div className="blood-icon">
                    🩸
                </div>
            </section>

            <section className="features">
                <div className="feature-card">
                    <h2>🩸 Find Donors</h2>
                    <p>
                        Search available donors by
                        blood group and city.
                    </p>
                </div>

                <div className="feature-card">
                    <h2>❤️ Donate Blood</h2>
                    <p>
                        Register as a donor and help
                        someone in need.
                    </p>
                </div>

                <div className="feature-card">
                    <h2>🚨 Request Blood</h2>
                    <p>
                        Submit a blood request for
                        patients who need help.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;