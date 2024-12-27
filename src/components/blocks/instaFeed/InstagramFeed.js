// components/InstagramFeed.js
import React from "react";

const InstagramFeed = ({ posts }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "center",
      }}
    >
      {posts.map((post) => (
        <a
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            width: "200px",
            height: "200px",
            backgroundSize: "cover",
            backgroundImage: `url(${post.media_url})`,
            borderRadius: "8px",
          }}
        >
          {/* Optionally overlay content */}
        </a>
      ))}
    </div>
  );
};

export default InstagramFeed;
