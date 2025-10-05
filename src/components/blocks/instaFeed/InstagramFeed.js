// components/InstagramFeed.js
import React, { useEffect } from "react";

const InstagramFeed = ({ posts }) => {
  useEffect(() => {
    // Load Instagram embed script if not already loaded
    if (typeof window !== "undefined" && !window.instgrm) {
      const script = document.createElement("script");
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        // Cleanup script on unmount
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, []);

  useEffect(() => {
    // Process Instagram embeds after posts change
    if (
      typeof window !== "undefined" &&
      window.instgrm &&
      posts &&
      posts.length > 0
    ) {
      window.instgrm.Embeds.process();
    }
  }, [posts]);

  // Don't render anything if no posts or posts is undefined
  if (!posts || posts.length === 0) {
    return null;
  }

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
