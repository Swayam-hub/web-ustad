const footerLinks = [
  {
    title: "Product",
    links: ["Web Ustad Builder", "CRM & Leads", "Analytics", "AI Automation"], // Updated link name
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Blog", "Press"],
  },
  {
    title: "Resources",
    links: ["Documentation", "API Reference", "Support Center", "Status Page"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookies", "SLA"],
  },
];

const Footer: React.FC = () => (
  <footer className="w-full border-t border-neutral-900/50 bg-neutral-900/30 backdrop-blur-sm mt-24">
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-12">
        {/* Logo and Social Section (Col 1 & 2 on mobile, Col 1 & 2 span on desktop) */}
        <div className="col-span-2 space-y-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-linear-to-br from-white to-neutral-400 rounded-lg" />
            <span className="font-bold text-xl tracking-tight text-white">
              Web <span className="text-neutral-500">Ustad</span>
            </span>{" "}
            {/* Updated Logo */}
          </div>
          <p className="text-sm text-neutral-400 max-w-xs">
            The unified platform for building high-performing websites and
            managing customer relationships.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-neutral-500 hover:text-blue-400 transition-colors"
            >
              {/* <Twitter className="h-6 w-6" /> */}
            </a>
            <a
              href="#"
              className="text-neutral-500 hover:text-white transition-colors"
            >
              {/* <Github className="h-6 w-6" /> */}
            </a>
            {/* Add more social icons as needed */}
          </div>
        </div>

        {/* Navigation Links */}
        {footerLinks.map((section) => (
          <div key={section.title} className="col-span-1 space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">
              {section.title}
            </h4>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 pt-8 border-t border-neutral-800 text-center">
        <p className="text-xs text-neutral-600">
          &copy; {new Date().getFullYear()} Web Ustad, Inc. All rights reserved.
          Built with love and React. {/* Updated Copyright */}
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;