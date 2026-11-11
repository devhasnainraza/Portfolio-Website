import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="journey">
      <div className="career-container">
        <h2>
          Journey <span>&</span>
          <br /> Milestones
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <span className="career-badge">97th Percentile • 5x Hackathons</span>
                <h4>Agentic AI Architect</h4>
                <h5>Governor Sindh Initiative (GIAIC)</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Selected for the elite Certified Cloud Applied Generative AI,
              Web3 & Solopreneur initiative. Cleared Q1 Advanced TypeScript
              with distinction. Built the Nike Brand E-Commerce Platform (Figma
              to Next.js & Sanity CMS) achieving an exceptional 97th percentile.
              Mastered Modern AI Python, OpenAI Agents SDK, LangGraph, Context
              Engineering, Prompt Engineering, MCP, Kafka, Docker, Kubernetes,
              and Serverless Containers—passing 5 Advanced Hackathons. Currently
              advancing AgentFactory autonomous architectures.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <span className="career-badge">AI Hackathon Winner</span>
                <h4>Generative AI & Chatbot Specialist</h4>
                <h5>Saylani Mass IT Training (SMIT)</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Underwent advanced training in autonomous conversational AI
              systems, intelligent multi-channel agent workflows (integrating
              WhatsApp, Voice/Call, SMS, and Web), and scalable backend services
              powered by Node.js, Express.js, and Database Architecture.
              Demonstrated end-to-end AI deployment and emerged as the SMIT
              Final AI Hackathon Winner.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <span className="career-badge">Engineering Roots</span>
                <h4>Web Development Foundations</h4>
                <h5>Auj Computer Institute</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Initiated programming journey with a strong foundation in core
              web architecture, modern semantic HTML5, CSS3, ES6+ JavaScript,
              Bootstrap, responsive UI design, Git version control, and
              collaborative open-source development workflows on GitHub.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <span className="career-badge">Academic Pursuit</span>
                <h4>Intermediate & Dars-e-Nizami</h4>
                <h5>Aisha Bawani Govt College & Jamia-tul-Madina</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Currently pursuing Intermediate (HSC) studies at Aisha Bawani Boys
              Govt College, Karachi, following Matriculation (SSC) from BSEK.
              Concurrently enrolled in the intensive 8-year Dars-e-Nizami
              Islamic scholarship curriculum at Jamia-tul-Madina (Matric & F.A
              equivalents completed, currently in B.A stage leading to BS and
              Master’s degree).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
