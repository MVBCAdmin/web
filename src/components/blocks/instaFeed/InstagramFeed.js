// components/InstagramFeed.js
import React from "react";

const InstagramFeed = ({ posts }) => {
  return (
    <div className="instagram-feed">
      {posts.map((post, index) => (
        <div key={index} className="instagram-post">
          {/* Render the oEmbed HTML directly */}
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      ))}
    </div>
  );
};

export default InstagramFeed;
