
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  FolderGit2,
  Code2,
} from "lucide-react";

const GITHUB = "https://github.com/why-nehaa";
const API_URL =
  "https://api.github.com/users/why-nehaa/repos?per_page=100&sort=updated";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchProjects() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(
            response.status === 403
              ? "GitHub API rate limit reached. Please try again later."
              : "Unable to load repositories from GitHub."
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Unexpected response from GitHub.");
        }

        const repositories = data
          .filter((repo) => !repo.private)
          .sort((a, b) => {
            if (a.fork !== b.fork) {
              return Number(a.fork) - Number(b.fork);
            }

            return (
              new Date(b.updated_at) - new Date(a.updated_at)
            );
          });

        if (!cancelled) {
          setProjects(repositories);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.message || "Something went wrong while loading projects."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchProjects();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <motion.section
      className="container"
      id="projects"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="card"
        style={{
          background: "rgba(255,255,255,0.03)",
          borderRadius: 16,
          padding: 30,
        }}
      >
        <motion.h2
          className="text-4xl font-semibold text-cyan-400 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          🚀 My Projects
        </motion.h2>

        <p className="text-gray-400 mb-8">
          Explore my coding practice, software development work,
          web projects, and other public repositories on GitHub.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 24,
          }}
        >
          <span style={{ color: "#aaa", fontSize: 14 }}>
            {loading
              ? "Loading repositories..."
              : `${projects.length} public repositories`}
          </span>

          <a
            href={`${GITHUB}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "#22d3ee",
              textDecoration: "none",
              fontSize: 14,
            }}
          >
            View on GitHub <ExternalLink size={15} />
          </a>
        </div>

        {loading && (
          <div
            role="status"
            style={{
              textAlign: "center",
              padding: 40,
              color: "#22d3ee",
            }}
          >
            <Code2
              size={32}
              style={{ margin: "0 auto 12px" }}
            />
            Fetching your GitHub repositories...
          </div>
        )}

        {!loading && error && (
          <div
            role="alert"
            style={{
              padding: 20,
              borderRadius: 12,
              background: "rgba(255,80,80,0.08)",
              color: "#ffaaaa",
              textAlign: "center",
            }}
          >
            <p>{error}</p>
            <a
              href={`${GITHUB}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: 12,
                color: "#22d3ee",
              }}
            >
              Open all repositories on GitHub
            </a>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <p style={{ color: "#aaa", textAlign: "center" }}>
            No public repositories were found.
          </p>
        )}

        {!loading && !error && projects.length > 0 && (
          <div
            className="projects-grid"
            style={{
              display: "grid",
              gap: 24,
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            }}
          >
            {projects.map((project, index) => {
              const technologies = [
                project.language,
                ...(project.topics || []),
              ].filter(Boolean);

              return (
                <motion.article
                  key={project.id}
                  className="project-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(index * 0.04, 0.3),
                  }}
                  whileHover={{ y: -5 }}
                  viewport={{ once: true, amount: 0.1 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    minWidth: 0,
                    padding: 22,
                    borderRadius: 16,
                    background:
                      "linear-gradient(145deg, rgba(20,20,20,0.95), rgba(10,10,10,0.95))",
                    border: "1px solid rgba(0,255,255,0.13)",
                    boxShadow: "0 0 20px rgba(0,255,255,0.05)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 110,
                      borderRadius: 12,
                      marginBottom: 18,
                      background: "rgba(0,255,255,0.05)",
                      color: "#22d3ee",
                    }}
                    aria-hidden="true"
                  >
                    <FolderGit2 size={48} />
                  </div>

                  <h3
                    style={{
                      fontSize: 19,
                      color: "#22d3ee",
                      lineHeight: 1.4,
                      overflowWrap: "anywhere",
                      marginBottom: 10,
                    }}
                  >
                    {project.name}
                  </h3>

                  <p
                    style={{
                      fontSize: 14,
                      color: "#bbb",
                      lineHeight: 1.7,
                      marginBottom: 16,
                      flex: 1,
                      overflowWrap: "anywhere",
                    }}
                  >
                    {project.description ||
                      "Explore this repository on GitHub to learn more about its code and implementation."}
                  </p>

                  {technologies.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 7,
                        marginBottom: 20,
                      }}
                    >
                      {technologies.slice(0, 6).map((technology) => (
                        <span
                          key={technology}
                          style={{
                            background: "rgba(0,255,255,0.05)",
                            border:
                              "1px solid rgba(0,255,255,0.12)",
                            padding: "5px 9px",
                            borderRadius: 6,
                            fontSize: 12,
                            color: "#aaf",
                            overflowWrap: "anywhere",
                          }}
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      flexWrap: "wrap",
                      marginBottom: 18,
                      color: "#999",
                      fontSize: 12,
                    }}
                  >
                    <span>★ {project.stargazers_count}</span>
                    <span>⑂ {project.forks_count}</span>
                    {project.fork && <span>Forked repository</span>}
                  </div>

                  <motion.a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      padding: "10px 14px",
                      borderRadius: 8,
                      color: "#22d3ee",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(0,255,255,0.15)",
                      textDecoration: "none",
                      fontSize: 13,
                    }}
                  >
                    <Github size={16} />
                    View Code
                    <ExternalLink size={13} />
                  </motion.a>
                </motion.article>
              );
            })}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 32 }}>
          <a
            href={`${GITHUB}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 9,
              padding: "12px 20px",
              borderRadius: 8,
              color: "#fff",
              background: "linear-gradient(90deg, #0891b2, #2563eb)",
              textDecoration: "none",
            }}
          >
            <FolderGit2 size={18} />
            Explore All My Repositories
            <ExternalLink size={15} />
          </a>
        </div>
      </div>
    </motion.section>
  );
}
