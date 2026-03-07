import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 30px;
  font-family: Primary;
  color: #000000;
  font-size: 0.9vw;
  z-index: 4;
  letter-spacing: 0.2em;
`;

export default function Footer() {
  return (
    <FooterContainer whileHover={{ color: `#A9927D` }}>
      CLINICAL PSYCHIATRY
    </FooterContainer>
  );
}
