import LogoLoop from './LogoLoop';

const imageLogos = [
  { src: "/mainframedeveloper.jpg", alt: "IBM Mainframe Developer", href: "https://www.coursera.org/account/accomplishments/specialization/certificate/GTA3SGF8S3NV" },
  { src: "/learnintermediatejava.jpg", alt: "Java", href: "https://www.codecademy.com/profiles/degf/certificates/2624ed9b49bb4d5c994983877e5263f0" },
  { src: "/IBMZALLSTAR.jpg", alt: "All Star Badge - IBM Z Xplore", href: "https://www.credly.com/badges/9c95a33b-7c50-434b-b7eb-eba86e1c1c0e/linked_in_profile" },
  { src: "/sfvip2025floresca.jpg", alt: "SFVIP", href: "https://www.salesforce.com/ap/" },
  { src: "/nextjsproj_page.jpg", alt: "NextJS Project BootCamp", href: "https://www.udemy.com/certificate/UC-e4312cb7-9b70-4822-ae7a-5270b6759622/" },
  { src: "/foundations.jpg", alt: "Foundations", href: "https://www.udemy.com/certificate/UC-47707ddb-68d9-4661-80e1-c54313587553/" },
  { src: "/htmlcssjsreact.jpg", alt: "React", href: "https://www.udemy.com/certificate/UC-9e5b5a02-e296-462b-9da7-09af19fb1706/" },
  { src: "/CyberThreatManagement.jpg", alt: "Cisco", href: "https://www.credly.com/badges/fedbe3b2-8519-4e22-976e-153dd577c5c7/public_url" },
  { src: "/SecurityandConnectivitySupport.jpg", alt: "Cisco", href: "https://www.credly.com/badges/fb5d7810-4e12-4d93-ab39-0b54c34bc1a5/public_url" },
];

export const Certificates = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-foreground mb-8 mx-auto max-w-5xl w-full">Certificates</h2>
      <div className='h-full relative overflow-hidden'>
        <LogoLoop
          logos={imageLogos}
          speed={100}
          direction="left"
          logoHeight={270}
          gap={10}
          hoverSpeed={50}
          scaleOnHover
          fadeOut
          fadeOutColor="#000"
          ariaLabel="Technology partners"
        />
      </div>
    </div>
  );
}