import React from 'react';

const ProgressIndicator = ({ loading }) => {
  if (loading) {
    return <div className="progress-indicator">Loading...</div>;
  }
  return null;
};

export default ProgressIndicator;
