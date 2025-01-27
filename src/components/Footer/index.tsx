import React from 'react';
import FooterNav from './FooterNav';
import FooterSocial from './FooterSocial';
import FooterNewsletter from './FooterNewsletter';
import FooterCopyright from './FooterCopyright';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <FooterNav />
          <FooterSocial />
          <div className="md:col-span-2">
            <FooterNewsletter />
          </div>
        </div>
        <FooterCopyright />
      </div>
    </footer>
  );
};
export default Footer;