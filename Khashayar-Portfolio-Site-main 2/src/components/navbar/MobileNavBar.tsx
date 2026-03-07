import { useState, useEffect } from 'react';
import TransformingButton from './TransformingButton';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { NavBarOption } from '@/utils/types';
import { motion } from 'framer-motion';

const NavbarBackground = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 19; /* Below menu button and title, but above other content */
  pointer-events: none; /* Allows clicks to pass through */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;

const BackgroundImage = styled(motion.img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  object-fit: cover;
  opacity: 0.2;
  z-index: 0;
  pointer-events: none;
`;

const NavbarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 21;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  pointer-events: none; /* Allow clicks to pass through to elements beneath */

  /* Create a container for the burger menu that receives pointer events */
  & > div:first-child {
    pointer-events: auto; /* Make sure the burger button is clickable */
  }
`;

const PageTitle = styled.h1<{ isOpen: boolean }>`
  font-size: 5.25vw;
  text-transform: uppercase;
  font-weight: 300;
  letter-spacing: 0.08rem;
  font-family: Primary;
  position: fixed;
  z-index: 21;
  margin-top: 1.75rem;
  margin-left: 1.25rem;
  line-height: 1.3;
  pointer-events: auto; /* Ensure title is clickable */
  color: ${({ isOpen }) => (isOpen ? `#dbd2cb` : `inherit`)};
  transition: color 0.3s ease-in-out;
`;

const MenuBackground = styled.div`
  position: fixed;
  z-index: 20;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #107379;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
`;

const MenuContentWrapper = styled.div`
  position: fixed;
  z-index: 30;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  padding-bottom: env(safe-area-inset-bottom, 1.5em);
  box-sizing: border-box;
  gap: 1.5em;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
  display: block;
  pointer-events: auto;
`;

const MenuOption = styled.div`
  color: #dbd2cb;
  width: 100vw;
  text-align: center;
  font-size: 1.8rem;
  cursor: pointer;
  font-family: Tertiary;
  font-style: italic;
  letter-spacing: 0.05rem;

  &:hover {
    color: #a9927d;
  }
`;

// Animation variants for the navbar background
const navBackgroundVariants = {
  visible: {
    backgroundColor: `rgba(252, 243, 238, 0.8)`, // Light beige with opacity
    boxShadow: `0 2px 8px rgba(0, 0, 0, 0.04)`,
    transition: {
      duration: 0.3,
      ease: `easeInOut`,
    },
  },
  hidden: {
    backgroundColor: `rgba(252, 243, 238, 0)`,
    boxShadow: `none`,
    transition: {
      duration: 0.3,
      ease: `easeInOut`,
    },
  },
};

// Animation variants for the background image
const backgroundImageVariants = {
  visible: {
    opacity: 0.2,
    transition: {
      duration: 0.3,
      ease: `easeInOut`,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: `easeInOut`,
    },
  },
};

// Default Export
export default function Component({
  menuOptions,
}: {
  menuOptions: NavBarOption[];
}) {
  const [open, setOpen] = useState(false);
  const [showBar, setShowBar] = useState(false);

  // Add scroll detection like in the desktop navbar
  useEffect(() => {
    const onScroll = () => {
      setShowBar(window.scrollY > 0);
    };
    window.addEventListener(`scroll`, onScroll, { passive: true });
    return () => window.removeEventListener(`scroll`, onScroll);
  }, []);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Navigation bar with background effect that appears on scroll */}
      <NavbarBackground
        initial={`hidden`}
        animate={showBar || open ? `visible` : `hidden`}
        variants={navBackgroundVariants}
      >
        <BackgroundImage
          src={`/images/background.jpg`}
          alt={`Background Image`}
          initial={`hidden`}
          animate={showBar || open ? `visible` : `hidden`}
          variants={backgroundImageVariants}
        />
      </NavbarBackground>

      {/* Navigation controls */}
      <NavbarWrapper>
        <TransformingButton isVisible={open} setIsVisible={setOpen} />
        <PageTitle isOpen={open}>Khashayar Nattagh, MD</PageTitle>
      </NavbarWrapper>

      {/* Menu background */}
      {open && <MenuBackground />}

      {/* Menu content */}
      {open && (
        <MenuContentWrapper>
          <StyledLink to="/" onClick={handleLinkClick}>
            <MenuOption>Home</MenuOption>
          </StyledLink>

          {menuOptions.map((option: NavBarOption, index: number) => (
            <StyledLink key={index} to={option.path} onClick={handleLinkClick}>
              <MenuOption>{option.name}</MenuOption>
            </StyledLink>
          ))}
          <StyledLink to="/contact" onClick={handleLinkClick}>
            <MenuOption>Contact</MenuOption>
          </StyledLink>
        </MenuContentWrapper>
      )}
    </>
  );
}
