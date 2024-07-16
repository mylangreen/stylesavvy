import "../Styles/Home.css";
import NavBar from "../Components/NavBar";
import Hero from "../Components/Hero";
import Popular from "../Components/Popular";
import Footer from "../Components/Footer";

function Home() {
  return (
    <div>
      <div className="home-page">
        <NavBar />
        <Hero />
        <Popular />
        <Popular title={"New Arrivals"} type={"products"} index={10} />
      </div>
      <Footer />
    </div>
  );
}
export default Home;
