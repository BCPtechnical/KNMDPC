import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

// Styled Components
const ButtonContainer = styled.div`
  position: fixed;
  z-index: 21;
  cursor: pointer;
  width: 2em;
  height: 4em;
  top: 1em;
  right: 1.5em;
  display: flex;
  flex-direction: column;
  text-align: center;
  opacity: 0.8;
`;

const Line = styled(motion.div)<{ $isOpen: boolean }>`
  margin-top: 0.5em;
  background: ${(props) => (props.$isOpen ? `white` : `black`)};
  border: 0.1em solid ${(props) => (props.$isOpen ? `white` : `black`)};
  transition: background 0.2s, border 0.2s;
`;

// Types
const variants = {
  topLineOpened: { rotate: 45, y: `0.7em` },
  topLineClosed: { rotate: 0 },
  midLineOpened: { opacity: 0 },
  midLineClosed: { opacity: 1 },
  botLineOpened: { rotate: -45, y: `-0.7em` },
  botLineClosed: { rotate: 0 },
};

// Default Export
export default function TransformingButton({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: any;
}) {
  return (
    <React.Fragment>
      <ButtonContainer onClick={() => setIsVisible(!isVisible)}>
        <Line
          $isOpen={isVisible}
          variants={variants}
          animate={isVisible ? `topLineOpened` : `topLineClosed`}
        />
        <Line
          $isOpen={isVisible}
          variants={variants}
          animate={isVisible ? `midLineOpened` : `midLineClosed`}
        />
        <Line
          $isOpen={isVisible}
          variants={variants}
          animate={isVisible ? `botLineOpened` : `botLineClosed`}
        />
      </ButtonContainer>
    </React.Fragment>
  );
}
