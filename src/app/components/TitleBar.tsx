import React from 'react';

interface TitleBarProps {
  backgroundColor: string;
  textColor: string;
  title: string;
}

const TitleBar: React.FC<TitleBarProps> = ({ backgroundColor, textColor, title }) => {
  return (
    <div className="title-bar" style={{ backgroundColor, color: textColor }}>
      <h1>{title}</h1>
    </div>
  );
};

export default TitleBar;