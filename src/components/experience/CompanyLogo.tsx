import { getInitials } from "@/lib/utils";
import { useState } from "react";

const CompanyLogo: React.FC<{ domain: string; company: string; className?: string }> = ({ domain, company, className = '' }) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <span className={`rounded-full bg-primary/15 text-primary font-bold flex items-center justify-center ${className}`}>
        {getInitials(company)}
      </span>
    );
  }

  return (
    <img
      src={`https://img.logo.dev/${domain}?token=${import.meta.env.VITE_LOGO_DEV_PUBLIC_KEY}&retina=true`}
      alt={`${company} logo`}
      onError={() => setError(true)}
      className={`rounded-full object-contain ${className}`}
    />
  );
};

export default CompanyLogo