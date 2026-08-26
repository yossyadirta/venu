import React from 'react';
import { cn } from 'loka';

const styles = {
  footer: 'pt-[60px] pb-10 px-10 border-t border-[#eee] bg-white',
  container: 'max-w-[1280px] mx-auto flex justify-between flex-wrap gap-10',
  logoText: 'font-black text-xl tracking-normal text-[#0070E0]',
  desc: 'text-[#888] text-sm max-w-[280px] leading-relaxed',
  sectionTitle: 'text-[11px] font-bold text-[#0a0a0a] mb-4 uppercase tracking-[0.12em]',
  link: 'text-sm text-[#888] cursor-pointer transition-colors duration-200 hover:text-[#007CFF]',
  bottomBar: 'max-w-[1280px] mx-auto mt-10 pt-6 border-t border-[#f0f0f0] flex justify-between items-center',
  bottomText: 'text-[13px] text-[#aaa]',
  socialLink: 'text-[13px] text-[#aaa] cursor-pointer transition-colors duration-200 hover:text-[#007CFF]'
};
export const GlobalFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/logo.svg" alt="Venu Logo" className="h-9" />
            <span
              className={styles.logoText}
              style={{ WebkitTextStroke: '1.2px currentColor' }}
            >
              VENU
            </span>
          </div>
          <p className={styles.desc}>
            Your gateway to extraordinary live experiences. Discover, book, and immerse yourself.
          </p>
        </div>
        <div className="flex-col-mobile flex gap-[60px]">
          {[
            {
              title: 'Product',
              links: ['Browse Events', 'Categories', 'For Organizers', 'Pricing'],
            },
            { title: 'Company', links: ['About', 'Careers', 'Press', 'Blog'] },
            { title: 'Support', links: ['Help Center', 'Contact', 'Refund Policy'] },
            { title: 'Legal', links: ['Terms', 'Privacy', 'Cookies'] },
          ].map((section) => (
            <div key={section.title}>
              <h4 className={styles.sectionTitle}>
                {section.title}
              </h4>
              <div className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <span
                    key={link}
                    className={styles.link}
                  >
                    {link}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.bottomBar}>
        <span className={styles.bottomText}>© 2025 VENU. All rights reserved.</span>
        <div className="flex gap-4">
          {['Twitter', 'Instagram', 'LinkedIn', 'YouTube'].map((s) => (
            <span
              key={s}
              className={styles.socialLink}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};
