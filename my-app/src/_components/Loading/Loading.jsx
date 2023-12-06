import React, { useEffect, useState } from 'react';
import "@/_styles/css/loading.css";

const Loading = ({ progress }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This runs only on the client side
    setIsClient(true);
  }, []);

  return (
    <div className="circle-loading-spinner">
      {isClient && (
        <div className="circle-progress" style={{ background: `conic-gradient(#B31312 ${progress}%, transparent ${progress}%)` }}>
          <div className="progress-label">{progress}%</div>
        </div>
      )}
    </div>
  );
};

export default Loading;
