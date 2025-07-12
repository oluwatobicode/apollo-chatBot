import Navbar from "../components/LandingPage/Navbar";
import Hero from "../components/LandingPage/Hero";
import About from "../components/LandingPage/About";
import Features from "../components/LandingPage/Features";
import Footer from "../components/LandingPage/Footer";

function Home() {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Footer />
    </div>
  );
}
export default Home;
