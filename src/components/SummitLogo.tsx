
import React from "react";

interface SummitLogoProps {
  className?: string;
}

const SummitLogo: React.FC<SummitLogoProps> = ({ className }) => {
  return (
    <img 
      src="/lovable-uploads/c0830cad-fa2d-488b-a6ce-4a1ecba96c98.png" 
      alt="Summit Waste Services Logo" 
      className={className} 
    />
  );
};

export default SummitLogo;
