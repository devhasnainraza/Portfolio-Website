import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useState, useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { HiSparkles } from "react-icons/hi2";
import { FaGithub } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Work = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Keep GSAP pinned horizontal scroll on desktop screens only
    if (window.innerWidth <= 768) {
      return;
    }

    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const workContainer = document.querySelector(".work-container");
      if (!box || box.length === 0 || !workContainer) return;
      const rectLeft = workContainer.getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => {
          setTranslateX();
          return `+=${translateX}`;
        },
        scrub: true,
        pin: true,
        id: "work",
        invalidateOnRefresh: true,
      },
    });

    timeline.to(".work-flex", {
      x: () => -translateX,
      ease: "none",
    });

    const onResize = () => {
      setTranslateX();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  const projects = [
    {
      title: "Copilot Support",
      category: "Enterprise AI & Multi-Agent Swarms",
      description:
        "Mission-critical, enterprise-grade AI customer support platform designed for high-concurrency environments. Powered by LangGraph multi-agent cognitive engine, Supabase pgvector RAG, FastAPI microservices, and Next.js 16 App Router with real-time human handoff.",
      tools:
        "LangGraph, Multi-Agent Swarms, Supabase pgvector, FastAPI, Next.js 16, TypeScript",
      toolsList: [
        "LangGraph",
        "Multi-Agent Swarm",
        "FastAPI",
        "Next.js 16",
        "pgvector RAG",
        "Supabase",
      ],
      image: "/images/copilot-support.jpg",
      previewGradient:
        "linear-gradient(135deg, rgba(157, 78, 221, 0.25), rgba(121, 40, 202, 0.05))",
      accentColor: "#c2a4ff",
      link: "https://customer-support-copilot-platform.vercel.app",
      github:
        "https://github.com/devhasnainraza/AI-customer-support-copilot-platform-",
    },
    {
      title: "Atlas AI",
      category: "Autonomous Financial Operations OS",
      description:
        "Autonomous financial operations OS engineered for high-throughput, agentic trading workflows. Powered by LangGraph multi-agent swarms, MCP & A2A protocol orchestration, Groq LPU acceleration, FastAPI, Next.js 15, Kafka event streams, and PostgreSQL pgvector.",
      tools:
        "LangGraph, Multi-Agent Swarms, MCP & A2A, Groq LPU, FastAPI, Next.js 15, Apache Kafka, PostgreSQL pgvector, Redis, Docker, TypeScript",
      toolsList: [
        "LangGraph",
        "Multi-Agent Swarm",
        "MCP & A2A",
        "Groq LPU",
        "FastAPI",
        "Next.js 15",
        "Apache Kafka",
        "pgvector",
        "Redis",
        "Docker",
        "TypeScript",
      ],
      image: "/images/atlas-ai.jpg",
      previewGradient:
        "linear-gradient(135deg, rgba(0, 245, 160, 0.25), rgba(0, 217, 245, 0.05))",
      accentColor: "#00f5a0",
      link: "https://atlas-ai-trading-os.vercel.app",
      github: "https://github.com/devhasnainraza/Atlas-AI-Trading-os",
    },
    {
      title: "Lumina",
      category: "Cognitive Search & RAG Chatbot",
      description:
        "Premium cognitive search and RAG chatbot system featuring async document ingestion (PDFs, DOCX, TXT) and intelligent, citation-grounded conversational capabilities with page-level tracing and JWT tenant isolation.",
      tools:
        "Cognitive RAG, LLM Models, Vector Search, JWT Auth, Next.js, TypeScript, Tailwind CSS",
      toolsList: [
        "Cognitive RAG",
        "Vector Search",
        "LLM Citations",
        "JWT Auth",
        "Next.js",
        "TypeScript",
      ],
      image: "/images/lumina.jpg",
      previewGradient:
        "linear-gradient(135deg, rgba(0, 242, 254, 0.25), rgba(79, 172, 254, 0.05))",
      accentColor: "#00f2fe",
      link: "https://lumina-free.vercel.app/",
      github: "https://github.com/devhasnainraza/Lumina",
    },
    {
      title: "Pure Tasks",
      category: "Cloud-Native AI & Spec-Driven Dev",
      description:
        "Hackathon II: The Evolution of Todo. A 5-phase journey from an in-memory Python console app to full-stack Next.js/FastAPI, AI agent chatbot powered by OpenAI Agents SDK & MCP, and advanced Kubernetes deployment with Kafka & Dapr event streams.",
      tools:
        "OpenAI Agents SDK, MCP, Apache Kafka, Dapr, Kubernetes, Docker, FastAPI, Next.js, SQLModel",
      toolsList: [
        "OpenAI Agents SDK",
        "MCP",
        "Apache Kafka",
        "Dapr",
        "Kubernetes",
        "FastAPI",
        "Next.js",
      ],
      image: "/images/pure-tasks.jpg",
      previewGradient:
        "linear-gradient(135deg, rgba(0, 230, 118, 0.25), rgba(0, 180, 216, 0.05))",
      accentColor: "#00e676",
      link: "https://pure-tasks.vercel.app/",
      github: "https://github.com/devhasnainraza/GIAIC-Hackathon-II",
    },
    {
      title: "Store Vault",
      category: "Cloud Storage & Server Actions",
      description:
        "Cloud file storage built with Next.js 15 App Router and Appwrite. Upload, preview, search, sort, share, and manage files with OTP sign-in, server actions, and storage usage dashboard analytics chart.",
      tools:
        "Next.js 15, React 19, Appwrite, Server Actions, TypeScript, Tailwind CSS, Recharts, shadcn/ui",
      toolsList: [
        "Next.js 15",
        "Appwrite",
        "Server Actions",
        "TypeScript",
        "Tailwind CSS",
        "Recharts",
      ],
      image: "/images/store-vault.jpg",
      previewGradient:
        "linear-gradient(135deg, rgba(255, 94, 98, 0.25), rgba(255, 153, 102, 0.05))",
      accentColor: "#ff5e62",
      link: "https://store-vault.vercel.app",
      github: "https://github.com/devhasnainraza/Store_Vault",
    },
    {
      title: "Cortex-H1",
      category: "Physical AI & Humanoid Robotics",
      description:
        "Comprehensive, university-level engineering handbook designed to bridge digital AI and physical embodiment. Hands-on code covering low-level motor control with ROS 2, high-level reasoning with VLA models, Visual SLAM, and NVIDIA Isaac Sim digital twins.",
      tools:
        "ROS 2, NVIDIA Isaac Sim, Docusaurus, React, Tailwind CSS, Google Gemini, Robotics & VLA",
      toolsList: [
        "ROS 2",
        "Physical AI",
        "Isaac Sim",
        "VLA Models",
        "Docusaurus",
        "React",
        "Gemini AI",
      ],
      image: "/images/cortex-h1.jpg",
      previewGradient:
        "linear-gradient(135deg, rgba(247, 151, 30, 0.25), rgba(255, 94, 98, 0.05))",
      accentColor: "#f7971e",
      link: "https://devhasnainraza.github.io/Cortex-H1/",
      github: "https://github.com/devhasnainraza/Cortex-H1",
    },
  ];

  const handleMobileScroll = () => {
    if (!carouselRef.current) return;
    const scrollLeft = carouselRef.current.scrollLeft;
    const cardWidth = carouselRef.current.offsetWidth * 0.85;
    if (cardWidth <= 0) return;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveCardIndex(Math.min(Math.max(index, 0), projects.length - 1));
  };

  const scrollToCard = (index: number) => {
    if (!carouselRef.current) return;
    const clampedIndex = Math.min(Math.max(index, 0), projects.length - 1);
    const card = carouselRef.current.children[clampedIndex] as HTMLElement;
    if (card) {
      card.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
      setActiveCardIndex(clampedIndex);
    }
  };

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <div className="work-header-row">
          <h2>
            My <span>Work</span>
          </h2>
          <div className="work-mobile-controls">
            <div className="work-mobile-counter">
              <span>{String(activeCardIndex + 1).padStart(2, "0")}</span> /{" "}
              {String(projects.length).padStart(2, "0")}
            </div>
            <div className="work-mobile-nav-btns">
              <button
                type="button"
                onClick={() => scrollToCard(activeCardIndex - 1)}
                disabled={activeCardIndex === 0}
                aria-label="Previous Project"
                className="work-nav-btn"
              >
                <MdChevronLeft />
              </button>
              <button
                type="button"
                onClick={() => scrollToCard(activeCardIndex + 1)}
                disabled={activeCardIndex === projects.length - 1}
                aria-label="Next Project"
                className="work-nav-btn"
              >
                <MdChevronRight />
              </button>
            </div>
          </div>
        </div>

        <div
          className="work-flex"
          ref={carouselRef}
          onScroll={handleMobileScroll}
        >
          {projects.map((project, index) => (
            <div
              className={`work-box ${
                index === activeCardIndex ? "work-box-active" : ""
              }`}
              key={index}
            >
              <div className="work-info">
                <div className="work-title">
                  <div className="work-number-row">
                    <h3>0{index + 1}</h3>
                  </div>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>

                <div className="work-tools-section">
                  <h4>Tools & Technologies</h4>
                  <p className="work-tools-text">{project.tools}</p>
                  <div className="work-tags-container">
                    {project.toolsList.map((tag, tagIndex) => (
                      <span className="work-tag" key={tagIndex}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="work-links-row">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="work-link-btn work-link-github"
                  >
                    <FaGithub />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

              <div className="work-visual-wrapper">
                <div
                  className="work-card-ambient"
                  style={{ background: project.previewGradient }}
                >
                  <HiSparkles
                    className="work-ambient-icon"
                    style={{ color: project.accentColor }}
                  />
                </div>
                <WorkImage
                  image={project.image}
                  alt={project.title}
                  link={project.link}
                />
              </div>

              <div className="work-mobile-actions">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-mobile-btn work-mobile-btn-github"
                >
                  <FaGithub />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="work-mobile-dots">
          {projects.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToCard(i)}
              className={`work-dot ${i === activeCardIndex ? "work-dot-active" : ""}`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>

        <div className="work-mobile-hint">
          Swipe to explore projects <span>➔</span>
        </div>
      </div>
    </div>
  );
};

export default Work;
