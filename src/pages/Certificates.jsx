
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X } from "lucide-react";

const CERTS = {
  tech: [
    {
      title: "Foundations of Prompt Engineering",
      org: "AWS Training and Certification",
      img: "/Certificate/AWS.jpg",
    },
    {
      title: "AI Agent Fundamentals",
      org: "Databricks Academy",
      img: "/Certificate/DATABRICKS.jpg",
    },
    {
      title: "Introduction to Generative AI",
      org: "Google",
      img: "/Certificate/GOOGLE%20-AI.jpg",
    },
    {
      title: "Trust and Security with Google Cloud",
      org: "Google Cloud / Simplilearn",
      img: "/Certificate/GOOGLE%20CLOUD.jpg",
    },
    {
      title: "AI in Remote Sensing",
      org: "ISRO / IIRS",
      img: "/Certificate/ISRO-%20AI.jpg",
    },
    {
      title: "Introduction to GitHub",
      org: "Microsoft",
      img: "/Certificate/MICROSOFT.jpg",
    },
    {
      title: "Career Essentials in Generative AI",
      org: "Microsoft and LinkedIn",
      img: "/Certificate/LINKDED%20IN.jpg",
    },
    {
      title: "AI Upskilling Certificate: Hands-On Development from Model to App",
      org: "Qualcomm Academy",
      img: "/Certificate/QUALCOMM.jpg",
    },
    {
      title: "Certificate of Excellence",
      org: "Scalar Topics",
      img: "/Certificate/SCALAR%20TOPICS.jpg",
    },
    {
      title: "Certificate of Completion",
      org: "Simplilearn SkillUp",
      img: "/Certificate/SIMPLI%20LEARN.jpg",
    },
    {
      title: "Career Edge - Young Professional",
      org: "TCS iON",
      img: "/Certificate/TCS%20ION.jpg",
    },
    {
      title: "Business Planning Course",
      org: "HP LIFE",
      img: "/Certificate/HP.jpg",
    },
  ],

  other: [
    {
      title: "Technology Job Simulation",
      org: "Deloitte",
      img: "/Certificate/DELOITTE.jpeg",
    },
    {
      title: "Software Engineering Job Simulation",
      org: "HPE / Forage",
      img: "/Certificate/HPE.jpg",
    },
    {
      title: "Software Development Internship",
      org: "Prodigy InfoTech",
      img: "/Certificate/PRODIGY.jpg",
    },
    {
      title: "Advanced Software Engineering Job Simulation",
      org: "Walmart Global Tech / Forage",
      img: "/Certificate/WALMART.jpeg",
    },
  ],
};

export default function Certificates() {
  const [tab, setTab] = useState("tech");
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section
      className="container"
      style={{ padding: "40px 0" }}
    >
      <div
        className="card"
        style={{
          background: "#111",
          borderRadius: 12,
          padding: 24,
          color: "#fff",
        }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            marginBottom: 4,
            color: "#fff",
          }}
        >
          Certificates 🏅
        </h2>

        <p className="lead" style={{ color: "#aaa" }}>
          Certifications, learning achievements, and professional
          job simulations from my learning journey.
        </p>

        {/* Category Tabs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginTop: 20,
          }}
        >
          {[
            { id: "tech", label: "Technical & Learning" },
            { id: "other", label: "Job Simulations & Internship" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={tab === item.id ? "tab active" : "tab"}
              style={{
                padding: "9px 16px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                background:
                  tab === item.id ? "#007bff" : "#333",
                color: "#fff",
                fontWeight: 500,
                transition: "0.3s",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Certificate Cards */}
        <div
          className="certs-grid"
          style={{
            marginTop: 28,
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
            gap: 20,
          }}
        >
          <AnimatePresence mode="wait">
            {CERTS[tab].map((cert, index) => (
              <motion.article
                key={cert.img}
                className="cert card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.04,
                }}
                whileHover={{
                  y: -5,
                  boxShadow:
                    "0 8px 24px rgba(0, 123, 255, 0.2)",
                }}
                style={{
                  background: "#1a1a1a",
                  borderRadius: 12,
                  padding: 16,
                  color: "#fff",
                  minWidth: 0,
                }}
              >
                <button
                  type="button"
                  onClick={() => setSelectedCert(cert)}
                  aria-label={`Preview ${cert.title}`}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: 0,
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={cert.img}
                    alt={`${cert.title} certificate`}
                    loading="lazy"
                    style={{
                      display: "block",
                      width: "100%",
                      height: 175,
                      borderRadius: 8,
                      objectFit: "contain",
                      background: "#fff",
                      marginBottom: 14,
                    }}
                  />
                </button>

                <h3
                  style={{
                    fontSize: "1rem",
                    lineHeight: 1.5,
                    margin: "0 0 6px",
                  }}
                >
                  {cert.title}
                </h3>

                <p
                  style={{
                    fontSize: 13,
                    color: "#bbb",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {cert.org}
                </p>

                <button
                  type="button"
                  onClick={() => setSelectedCert(cert)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    marginTop: 14,
                    padding: "8px 14px",
                    borderRadius: 6,
                    border: "none",
                    background: "#007bff",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  View Certificate
                  <ExternalLink size={15} />
                </button>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Certificate Preview Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label={selectedCert.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.88)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
              zIndex: 1000,
            }}
          >
            <motion.div
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              onClick={(event) => event.stopPropagation()}
              style={{
                position: "relative",
                width: "min(950px, 100%)",
                maxHeight: "90vh",
                overflow: "auto",
                padding: 16,
                borderRadius: 12,
                background: "#171717",
                color: "#fff",
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                aria-label="Close certificate preview"
                style={{
                  display: "flex",
                  marginLeft: "auto",
                  marginBottom: 12,
                  padding: 8,
                  border: "none",
                  borderRadius: 6,
                  background: "#333",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                <X size={20} />
              </button>

              <img
                src={selectedCert.img}
                alt={`${selectedCert.title} certificate`}
                style={{
                  display: "block",
                  width: "100%",
                  maxHeight: "70vh",
                  objectFit: "contain",
                  borderRadius: 8,
                  background: "#fff",
                }}
              />

              <h3 style={{ margin: "16px 0 5px" }}>
                {selectedCert.title}
              </h3>

              <p style={{ color: "#bbb", margin: 0 }}>
                {selectedCert.org}
              </p>

              <a
                href={selectedCert.img}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: 14,
                  color: "#69aaff",
                }}
              >
                Open image in a new tab
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
