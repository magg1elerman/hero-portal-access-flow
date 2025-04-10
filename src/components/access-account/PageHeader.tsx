
import SummitLogo from "@/components/SummitLogo";

interface PageHeaderProps {
  businessId: string;
}

const PageHeader = ({ businessId }: PageHeaderProps) => {
  return (
    <div className="mb-8 text-center">
      <SummitLogo className="mx-auto mb-4 h-16" />
      <h2 className="text-2xl font-semibold text-hauler-dark">One-Time Access</h2>
      <p className="text-hauler-secondary mt-2">Business ID: {businessId}</p>
    </div>
  );
};

export default PageHeader;
