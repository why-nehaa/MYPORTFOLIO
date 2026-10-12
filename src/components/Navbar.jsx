
import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Gallery", to: "/gallery" },
  { label: "Skills", to: "/skills" },
  { label: "Certificates", to: "/certificates" },
  { label: "Blog", to: "/blog" },
  { label: "Resume", to: "/resume" },
  { label: "About Me", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const checkWidth = () => {
      setShowButton(window.innerWidth <= 1100);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);

    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
          padding: "12px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(12px)",
          fontFamily: "inherit",
        }}
      >
        {/* NK Logo and Branding */}
        <NavLink
          to="/"
          end
          aria-label="Neha Kumari - Home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            textDecoration: "none",
            color: "inherit",
            flexShrink: 0,
          }}
        >
          <motion.img
            src="/nk-logo.png"
            alt="NK logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.06 }}
            style={{
              width: 48,
              height: 48,
              objectFit: "contain",
              borderRadius: 8,
            }}
          />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                margin: 0,
                fontSize: 15,
                fontWeight: 700,
                color: "#fff",
                letterSpacing: 0.3,
              }}
            >
              Neha Kumari
            </span>

            <span
              style={{
                marginTop: 4,
                fontSize: 11,
                color: "var(--muted, #aaa)",
                whiteSpace: "nowrap",
              }}
            >
              Java | React | Node.js | Full Stack
            </span>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        {!showButton && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "clamp(12px, 1.5vw, 26px)",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                style={{ textDecoration: "none" }}
              >
                {({ isActive }) => (
                  <motion.div
                    whileHover={{
                      scale: 1.06,
                      color: "var(--accent)",
                    }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      color: isActive ? "var(--accent)" : "#fff",
                      fontSize: 13,
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {link.label}

                    <motion.span
                      animate={{
                        opacity: isActive ? 1 : 0,
                        scaleX: isActive ? 1 : 0,
                      }}
                      style={{
                        width: "70%",
                        height: 2,
                        marginTop: 4,
                        borderRadius: 2,
                        background: "var(--accent)",
                        transformOrigin: "center",
                      }}
                    />
                  </motion.div>
                )}
              </NavLink>
            ))}
          </div>
        )}

        {/* Mobile Menu Button */}
        {showButton && (
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((previous) => !previous)}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 8,
              color: "#fff",
              fontSize: 24,
              width: 44,
              height: 44,
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        )}
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && showButton && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999,
              padding: "90px 24px 30px",
              background: "rgba(0,0,0,0.97)",
              backdropFilter: "blur(14px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              overflowY: "auto",
            }}
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setIsOpen(false)}
                style={({ isActive }) => ({
                  color: isActive ? "var(--accent)" : "#fff",
                  textDecoration: "none",
                  padding: "15px 0",
                  width: "100%",
                  maxWidth: 400,
                  textAlign: "center",
                  fontSize: 17,
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
