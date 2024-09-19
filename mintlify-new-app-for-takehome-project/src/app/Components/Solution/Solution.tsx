import React from 'react';

interface MyComponentProps {
  title?: string;
  subtitle?: string; // Optional prop
}

const Solution: React.FC<MyComponentProps> = ({ title, subtitle }) => {
  return (
    <div>
      <h1>{title}</h1>
      {subtitle && <h2>{subtitle}</h2>}
      <p>This is a Next.js React TypeScript component.</p>
    </div>
  );
};

export default Solution;
