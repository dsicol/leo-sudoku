import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader">
        <div className="spinner" />
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
