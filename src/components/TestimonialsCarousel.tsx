import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import useScreenSize from './hooks/useScreenSize';

const Container = styled.section`
  margin: 0;
  background-color: #27221f;
  color: #f8f8f8;
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  background-color: transparent;
`;

const TestimonialVideoWrapper = styled.div<{ $isMobile: boolean }>`
  height: ${(props) => (props.$isMobile ? `auto` : `28vw`)};
  width: ${(props) => (props.$isMobile ? `100%` : `22vw`)};
  overflow: hidden;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TestimonialVideo = styled(motion.video)`
  pointer-events: auto;
  user-select: none;
  opacity: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(60%); /* Darkened videos */
  transition: filter 0.3s ease;

  &:hover {
    filter: brightness(90%); /* Slightly brighten on hover */
  }
`;

const TestimonialCard = styled.blockquote<{ $isMobile: boolean }>`
  position: relative;
  margin: 0;
  padding: 0;
  background-color: var(--secondary-background-color);
  height: 100%;
  width: ${(props) => (props.$isMobile ? `100vw` : `25vw`)};
`;

const TestimonialCarousel = styled(motion.div)`
  display: flex;
  justify-content: flex-start;
  gap: 0;
  overflow-x: hidden;
  width: max-content;
  padding: 0;
  margin: 0;
  cursor: grab;
  -moz-user-select: none;
  user-select: none;
  touch-action: none;
`;

const TestimonialQuote = styled(motion.footer)`
  position: absolute;
  font-family: Secondary;
  font-weight: 100;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background-color: rgba(0, 0, 0, 0.7); /* Black box with transparency */
  padding: 0.5rem 0.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); /* Blurred edges */
  color: white; /* Ensure text remains visible */
`;

const DragIndicator = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  width: 24.6vw;
  gap: 0.2vw;
  margin: 1.2vw 0;
  font-size: ${(props) => (props.$isMobile ? `2.5vw` : `1vw`)};
`;
const DragTitle = styled.div`
  font-family: Secondary;
  color: #000000;
`;
const DragLine = styled(motion.div)`
  height: 1px;
  width: 100%;
  border-style: solid;
  border-width: 1px 0 0 0;
  border-color: #000000;
`;

function AnimatingRightDragLine({ isMobile }: { isMobile: boolean }) {
  return (
    <DragIndicator
      style={{
        alignSelf: `end`,
        justifyContent: `center`,
        textAlign: `left`,
      }}
      $isMobile={isMobile}
    >
      <DragTitle>drag</DragTitle>
      <DragLine
        animate={{
          x: [`0%`, `0%`, `100%`],
          width: [`0%`, `100%`, `100%`],
        }}
        transition={{ repeat: Infinity, duration: 2, ease: [1, 0.24, 0.3, 1] }}
      />
    </DragIndicator>
  );
}

function AnimatingLeftDragLine({ isMobile }: { isMobile: boolean }) {
  return (
    <DragIndicator
      style={{
        justifyContent: `center`,
        alignItems: `end`,
      }}
      $isMobile={isMobile}
    >
      <DragLine
        animate={{
          x: [`0%`, `0%`, `-100%`],
          width: [`0%`, `100%`, `100%`],
        }}
        transition={{ repeat: Infinity, duration: 2, ease: [1, 0.24, 0.3, 1] }}
      />
      <DragTitle>drag</DragTitle>
    </DragIndicator>
  );
}

function TestimonialAnimatedCard({
  testimonial,
}: {
  testimonial: {
    shortQuote: string;
    video: { publicUrl: string; mimeType: string };
  };
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useScreenSize();

  return (
    <TestimonialCard
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      $isMobile={isMobile}
    >
      <TestimonialVideoWrapper $isMobile={isMobile}>
        <TestimonialVideo
          width="100%"
          height="auto"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          whileHover={{ opacity: 0.5 }}
          transition={{ duration: 0.3 }}
          loop
          autoPlay
          muted
        >
          <source
            src={testimonial.video.publicUrl}
            type={testimonial.video.mimeType}
          />
          Your browser does not support the video tag.
        </TestimonialVideo>
      </TestimonialVideoWrapper>
      <TestimonialQuote animate={{ opacity: isHovered ? 1 : 0 }}>
        - {testimonial.shortQuote}
      </TestimonialQuote>
    </TestimonialCard>
  );
}

export default function Testimonials({
  testimonials,
}: {
  testimonials: {
    shortQuote: string;
    video: { publicUrl: string; mimeType: string };
  }[];
}) {
  const isMobile = useScreenSize();
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (carouselRef.current && containerRef.current) {
      setCarouselWidth(carouselRef.current.scrollWidth);
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, [testimonials]);

  return (
    <Container ref={containerRef}>
      <AnimatingRightDragLine isMobile={isMobile} />
      <TestimonialCarousel
        ref={carouselRef}
        drag="x"
        dragListener
        dragConstraints={{
          left: -(carouselWidth - containerWidth),
          right: 0,
        }}
        dragTransition={{ power: 0.05 }}
      >
        {testimonials.map((testimonial, index) => (
          <TestimonialAnimatedCard key={index} testimonial={testimonial} />
        ))}
      </TestimonialCarousel>
      <AnimatingLeftDragLine isMobile={isMobile} />
    </Container>
  );
}
