
import React from "react";

interface SummitLogoProps {
  className?: string;
}

const SummitLogo: React.FC<SummitLogoProps> = ({ className }) => {
  return (
    <img 
      src="/lovable-uploads/0f7c273d-2d2d-4b31-ae19-419cb3f86537.png" 
      alt="Summit Waste Services Logo" 
      className={className} 
    />
  );
};

export default SummitLogo;
