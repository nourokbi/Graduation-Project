import { useEffect, useRef, useState } from "react";

const activeStyles = {
  fontWeight: "bold",
  textDecoration: "underline",
  color: "black",
  // border: "2px solid #3FA34D",
};

export default function AboutNavbar() {
  const [activeSection, setActiveSection] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const aboutNavRef = useRef(null);

  const handleScroll = () => {
    const sections = document.querySelectorAll("section");
    let currentSection = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 50; // Adjust for offset if needed
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });
    setActiveSection(currentSection);

    if (aboutNavRef.current) {
      if (window.scrollY > aboutNavRef.current.offsetTop) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div>
      <nav  className={`about-nav ${isSticky ? "sticky" : ""}`} ref={aboutNavRef} >
        <a
          href="#indices"
          style={activeSection === "indices" ? activeStyles : null}
        >
          Indices
        </a>
        <a
          href="#datasets"
          style={activeSection === "datasets" ? activeStyles : null}
        >
          Datasets
        </a>
        {/* <a
          href="#project-team"
          style={activeSection === "project-team" ? activeStyles : null}
        >
          Project Team
        </a> */}
      </nav>
    </div>
    </div>
  );
}
