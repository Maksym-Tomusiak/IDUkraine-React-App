import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import TitledLogo from '../../assets/svgs/logos/header-logo.svg';
import PhoneIcon from '../../assets/svgs/call.svg';
import NavigationOptions from './NavigationOptions';
import IconedNavigationOptions from './IconedNavigationOptions';
import '../../assets/styles/header.css';
import CloseIcon from '../../assets/svgs/close.svg';
import MenuLogo from '../../assets/svgs/logos/menu-logo.svg';
import MenuIcon from '../../assets/svgs/menu-icon.svg';

const Header = () => {
  const [visible, setVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (window.scrollY > 0 && !isMenuOpen && !isHovered) {
        timerRef.current = setTimeout(() => {
          setVisible(false);
        }, 8000);
      }
    };

    window.addEventListener('scroll', handleScroll);

    if (window.scrollY > 0 && !isMenuOpen && !isHovered) {
      timerRef.current = setTimeout(() => {
        setVisible(false);
      }, 8000);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isMenuOpen, isHovered]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      className="header-container"
      initial={{ y: -100, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TitledLogo
        className="header-logo"
        onClick={scrollToTop}
        style={{ cursor: 'pointer' }}
      />
      <div className="header-nav-options desktop-only">
        <NavigationOptions />
      </div>
      <div className="header-phone-container desktop-only">
        <PhoneIcon className="header-phone-icon" />
        <p>+380 67 843-02-44</p>
      </div>
      <button className="hamburger-menu mobile-only" onClick={toggleMenu}>
        <MenuIcon className="menu-icon" />
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleOverlayClick}
            />
            <motion.div
              className="mobile-menu"
              ref={menuRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <div className="menu-top-content" onClick={toggleMenu}>
                <MenuLogo className="menu-logo" />
                <CloseIcon className="menu-close-icon" />
              </div>
              <IconedNavigationOptions />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Header;
