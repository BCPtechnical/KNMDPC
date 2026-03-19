import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavBarOption } from '@/utils/types';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { motion } from 'framer-motion';

const NavBarBackground = styled(motion.div)`
  position: fixed;
  top: 3%;
  left: 0;
  right: 0;
  z-index: 999998;
  width: 100vw;
  height: 60px;
  background-color: #fcf3ee4f;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const BackgroundImage = styled(motion.img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 60px;
  object-fit: cover;
  opacity: 0.2;
  z-index: 0;
  pointer-events: none;
`;

const NavContainer = styled.div`
  position: relative;
  font-family: Primary;
  width: 100vw;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const NavOptions = styled.nav`
  display: flex;
  flex-direction: row;
  column-gap: 3em;
  font-size: 0.9rem;
`;

const StyledLink = styled(Link)`
  cursor: pointer;
  color: #000000;
  text-transform: lowercase;
  font-family: Tertiary;
  letter-spacing: 0.1em;
  padding: 8px;
  text-decoration: none;

  &:hover {
    color: #107379;
  }
`;

const FadeNavBarBackground = styled(NavBarBackground)<{ $visible: boolean }>`
  // We'll control these properties with Framer Motion variants instead
`;

const FadeBackgroundImage = styled(BackgroundImage)<{ $visible: boolean }>`
  // We'll control opacity with Framer Motion variants instead
`;

// Define animation variants
const navBackgroundVariants = {
  visible: {
    backgroundColor: `rgba(252, 243, 238, 0.8)`, // Light beige with some transparency
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
  const [showBar, setShowBar] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setShowBar(window.scrollY > 0);
    };
    window.addEventListener(`scroll`, onScroll, { passive: true });
    return () => window.removeEventListener(`scroll`, onScroll);
  }, []);

  const data = useStaticQuery(graphql`
    query {
      texture: file(relativePath: { eq: "images/background.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            layout: FULL_WIDTH
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  `);
  const backgroundImageSrc =
    data?.texture?.childImageSharp?.gatsbyImageData?.images?.fallback?.src;

  return (
    <FadeNavBarBackground
      $visible={showBar}
      animate={showBar ? `visible` : `hidden`}
      variants={navBackgroundVariants}
      initial={`hidden`}
    >
      {backgroundImageSrc && (
        <FadeBackgroundImage
          $visible={showBar}
          src={backgroundImageSrc}
          alt="Background texture"
          animate={showBar ? `visible` : `hidden`}
          variants={backgroundImageVariants}
          initial={`hidden`}
        />
      )}
      <NavContainer>
        <NavOptions>
          <StyledLink to="/">Home</StyledLink>
          {menuOptions.map((option: NavBarOption, index: number) => (
            <StyledLink key={option.name + index} to={option.path}>
              {option.name}
            </StyledLink>
          ))}
          <StyledLink to="/contact">Contact</StyledLink>
        </NavOptions>
      </NavContainer>
    </FadeNavBarBackground>
  );
}
