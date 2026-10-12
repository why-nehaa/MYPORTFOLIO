
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import "./blog.css";

const defaultPosts = [
  {
    id: 1,
    title: "My Journey into Full Stack Development",
    text: "As a Computer Science student, I am exploring full stack development to understand how frontend and backend technologies work together. Learning React.js, Node.js, and Express.js is helping me build interactive and practical web applications.",
  },
  {
    id: 2,
    title: "Building Secure Web Applications",
    text: "Developing web applications has helped me understand the importance of authentication, API development, and data validation. I am learning how technologies like Node.js, Express.js, JWT, and bcrypt can be used to build more secure applications.",
  },
  {
    id: 3,
    title: "What I Learned from My Projects",
    text: "Working on projects such as a Task Management App, an E-Commerce Platform, and a Student Result Portal has helped me explore CRUD operations, database management, responsive design, and application development. Each project gives me an opportunity to improve my problem-solving skills.",
  },
  {
    id: 4,
    title: "Why SQL and Database Design Matter",
    text: "A good application needs well-organized data. Learning SQL, MySQL, database normalization, constraints, and indexing has helped me understand how to manage data efficiently and structure databases for real-world applications.",
  },
  {
    id: 5,
    title: "Clean Code and Continuous Learning",
    text: "I believe writing code is not just about making a program work. It is also about keeping it readable, maintainable, and easy to improve. As an aspiring Full Stack Developer, I want to keep strengthening my programming fundamentals and problem-solving abilities.",
  },
];

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      const savedVotes = JSON.parse(
        localStorage.getItem("kd_blog_votes") || "{}"
      );
      const votedByUser = JSON.parse(
        localStorage.getItem("kd_blog_voted") || "{}"
      );

      const withVotes = defaultPosts.map((post) => ({
        ...post,
        agree: savedVotes[post.id]?.agree || 0,
        disagree: savedVotes[post.id]?.disagree || 0,
        userVote: votedByUser[post.id] || null,
      }));

      setPosts(withVotes);
    } catch (error) {
      console.error("Unable to load blog votes:", error);

      setPosts(
        defaultPosts.map((post) => ({
          ...post,
          agree: 0,
          disagree: 0,
          userVote: null,
        }))
      );
    }
  }, []);

  function vote(id, type) {
    const votedByUser = JSON.parse(
      localStorage.getItem("kd_blog_voted") || "{}"
    );

    if (votedByUser[id]) return;

    const next = posts.map((post) =>
      post.id === id
        ? {
            ...post,
            [type]: post[type] + 1,
            userVote: type,
          }
        : post
    );

    setPosts(next);

    const votes = Object.fromEntries(
      next.map((post) => [
        post.id,
        {
          agree: post.agree,
          disagree: post.disagree,
        },
      ])
    );

    localStorage.setItem("kd_blog_votes", JSON.stringify(votes));

    localStorage.setItem(
      "kd_blog_voted",
      JSON.stringify({
        ...votedByUser,
        [id]: type,
      })
    );
  }

  return (
    <motion.section
      className="blog-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="blog-title"
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        📝 My Blog
      </motion.h2>

      <p className="blog-sub">
        My learning journey, development insights, and lessons from
        building web applications.
      </p>

      <div className="blog-grid">
        {posts.map((post, idx) => (
          <motion.div
            key={post.id}
            className="blog-post"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: idx * 0.15,
            }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 20px rgba(255,255,255,0.1)",
            }}
          >
            <h3 className="post-title">{post.title}</h3>

            <p className="post-text">{post.text}</p>

            <div className="vote-container">
              <motion.button
                type="button"
                aria-label={`Agree with ${post.title}`}
                onClick={() => vote(post.id, "agree")}
                disabled={!!post.userVote}
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.15 }}
                className={`vote-btn-circle agree ${
                  post.userVote === "agree" ? "active" : ""
                }`}
              >
                <ThumbsUp size={20} />

                <motion.span
                  key={post.agree}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="vote-count"
                >
                  {post.agree}
                </motion.span>
              </motion.button>

              <motion.button
                type="button"
                aria-label={`Disagree with ${post.title}`}
                onClick={() => vote(post.id, "disagree")}
                disabled={!!post.userVote}
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.15 }}
                className={`vote-btn-circle disagree ${
                  post.userVote === "disagree" ? "active" : ""
                }`}
              >
                <ThumbsDown size={20} />

                <motion.span
                  key={post.disagree}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="vote-count"
                >
                  {post.disagree}
                </motion.span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
