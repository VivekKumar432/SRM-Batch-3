import { Link } from 'react-router-dom';
import '../assets/CSS/homePage.css';

function HomePage() {
  return (
    <div className="container">
      <h1>Welcome to my Application</h1>
      <div className="button-container">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
