
import React from "react";

interface SummitLogoProps {
  className?: string;
}

const SummitLogo: React.FC<SummitLogoProps> = ({ className }) => {
  return (
    <img 
      src="/lovable-uploads/f6a4e98a-393e-4ec6-aad9-999e11a7e29d.png" 
      alt="Summit Waste Services Logo" 
      className={className} 
    />
  );
};

export default SummitLogo;
