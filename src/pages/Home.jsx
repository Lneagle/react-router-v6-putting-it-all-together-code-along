import { Link } from "react-router-dom"
import NavBar from "../components/NavBar"

function Home() {
  return (
    <>
      <NavBar />
      <main>
        <h1>📚 Welcome to the Bookstore Directory 📖</h1>
        <p>
          Discover your favorite bookstores and explore their collections. Click below to start browsing!
        </p>
        <nav>
          <Link to="/bookstores">View Bookstores</Link> |{" "}
          <Link to="/about">Learn More About This App</Link>
        </nav>
      </main>
    </>
  )
}

export default Home