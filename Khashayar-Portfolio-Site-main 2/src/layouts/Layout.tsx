import React, { ReactNode } from 'react';
import '@/static/styles/normalize.css';
import '@/static/styles/layout.css';
import TransformingNav from '@/components/navbar/TransformingNav';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql, useStaticQuery } from 'gatsby';

const BackgroundTextureWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
  }

  img {
    opacity: 0.2 !important;
  }
`;

// Types
type LayoutProps = {
  children: ReactNode;
};

// Common menu options (used as fallback)
const menuOptions = [
  { name: `Approach`, path: `/approach` },
  { name: `About`, path: `/about` },
  { name: `Info`, path: `/faq` },
];

// Mobile-specific menu options
const mobileMenuOptions = [
  { name: `Approach`, path: `/approach` },
  { name: `About`, path: `/about` },
  { name: `Info`, path: `/faq` },
];

// Desktop-specific menu options
const desktopMenuOptions = [
  { name: `About`, path: `/about` },
  { name: `Approach`, path: `/approach` },
  { name: `Info`, path: `/faq` },
];

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: `easeOut`,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: `easeIn`,
    },
  },
};

export default function Layout({ children }: LayoutProps) {
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

  const backgroundImage = getImage(data.texture);

  return (
    <React.Fragment>
      <TransformingNav
        menuOptions={menuOptions}
        mobileMenuOptions={mobileMenuOptions}
        desktopMenuOptions={desktopMenuOptions}
      />
      {backgroundImage && (
        <BackgroundTextureWrapper>
          <GatsbyImage
            image={backgroundImage}
            alt="Background texture"
            style={{ position: `absolute`, width: `100%`, height: `100%` }}
          />
        </BackgroundTextureWrapper>
      )}
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        style={{
          marginTop: `60px`,
          minHeight: `calc(100vh - 60px)`,
          overflowX: `hidden`,
          position: `relative`,
        }}
      >
        {children}
      </motion.div>
    </React.Fragment>
  );
}
