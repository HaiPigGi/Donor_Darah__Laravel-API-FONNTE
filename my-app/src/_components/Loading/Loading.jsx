import React from 'react';
import "@/_styles/css/loading.css";

const Loading = ({ progress }) => {
  return (
    <div className="circle-loading-spinner">
      <div className="circle-progress" style={{ background: `conic-gradient(#B31312 ${progress}%, transparent ${progress}%)` }}>
        <div className="progress-label">{progress}%</div>
      </div>
    </div>
  );
};

export default Loading;
