import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import BeforeAfter from "@/components/BeforeAfter";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import Booking from "@/components/Booking";
import InstagramSection from "@/components/InstagramSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <BeforeAfter />
        <Gallery />
        <Reviews />
        <Pricing />
        <About />
        <Booking />
        <InstagramSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
