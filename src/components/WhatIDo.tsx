import { useState, useEffect } from "react";
import "./styles/WhatIDo.css";

const WhatIDo = () => {
  const [activeCard, setActiveCard] = useState<number | null>(0);
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth <= 900 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleCard = (index: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (isMobile) {
      setActiveCard((prev) => (prev === index ? null : index));
    }
  };

  const getCardClass = (index: number) => {
    if (!isMobile) {
      return "what-content what-noTouch";
    }
    let classes = "what-content";
    if (activeCard === index) {
      classes += " what-content-active";
    } else if (activeCard !== null) {
      classes += " what-sibling";
    }
    return classes;
  };

  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className={getCardClass(0)}
            onClick={() => toggleCard(0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>AGENTIC AI</h3>
              <h4>Autonomous Architectures</h4>
              <p>
                Architecting enterprise-grade autonomous agents, multi-agent
                orchestration swarms, and context-engineered conversational
                systems. Specializing in intelligent tool calling, real-time
                voice agents, and robust multi-cloud agentic workflows.
              </p>
              <h5>Skillset & Architecture</h5>
              <div className="what-content-flex">
                <div className="what-tags">Agentic AI Architect</div>
                <div className="what-tags">OpenAI Agents SDK</div>
                <div className="what-tags">LangGraph</div>
                <div className="what-tags">LangChain</div>
                <div className="what-tags">Multi-Agent Systems</div>
                <div className="what-tags">Context Engineering</div>
                <div className="what-tags">Prompt Engineering</div>
                <div className="what-tags">Model Context Protocol (MCP)</div>
                <div className="what-tags">Voice & Conversational AI</div>
                <div className="what-tags">Agentic Workflows</div>
                <div className="what-tags">FastAPI</div>
                <div className="what-tags">Python</div>
              </div>
              <div
                className="what-arrow"
                onClick={(e) => toggleCard(0, e)}
                role="button"
                tabIndex={0}
                aria-label="Toggle Agentic AI section"
              ></div>
            </div>
          </div>
          <div
            className={getCardClass(1)}
            onClick={() => toggleCard(1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>FULL-STACK</h3>
              <h4>Cloud & Web Systems</h4>
              <p>
                Engineering high-performance, type-safe web applications and
                cloud-native systems. Transforming complex requirements and
                Figma designs into production-ready platforms powered by
                scalable backends and modern database architectures.
              </p>
              <h5>Skillset & Architecture</h5>
              <div className="what-content-flex">
                <div className="what-tags">Next.js</div>
                <div className="what-tags">TypeScript</div>
                <div className="what-tags">React</div>
                <div className="what-tags">Tailwind CSS</div>
                <div className="what-tags">Node.js</div>
                <div className="what-tags">Express.js</div>
                <div className="what-tags">Database Architecture</div>
                <div className="what-tags">PostgreSQL</div>
                <div className="what-tags">Docker</div>
                <div className="what-tags">Kubernetes</div>
                <div className="what-tags">Apache Kafka</div>
                <div className="what-tags">Dapr</div>
                <div className="what-tags">Sanity CMS</div>
              </div>
              <div
                className="what-arrow"
                onClick={(e) => toggleCard(1, e)}
                role="button"
                tabIndex={0}
                aria-label="Toggle Full-Stack section"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;
