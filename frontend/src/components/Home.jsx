import { Link } from "react-router-dom";
const Home = () => {
  return (
    <section id="home" className="background_pink">
      <div>
        <Link to="/register">Register</Link>
      </div>
    </section>
  );
};

export default Home;
