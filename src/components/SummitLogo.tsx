
import React from "react";

interface SummitLogoProps {
  className?: string;
}

const SummitLogo: React.FC<SummitLogoProps> = ({ className }) => {
  return (
    <img 
      src="/lovable-uploads/a9603f01-33ea-4185-8b33-9c3ae3b48525.png" 
      alt="Summit Waste Services Logo" 
      className={className} 
    />
  );
};

export default SummitLogo;
