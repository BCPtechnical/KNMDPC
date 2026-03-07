import { styled } from 'styled-components';
import { ServiceItem } from '@/utils/types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

const richTextRenderOptions: Options = {
  renderNode: {
    [INLINES.HYPERLINK]: (node, children) => {
      const { uri } = node.data;
      return (
        <a href={uri} style={{ color: `#107379`, textDecoration: `underline` }}>
          {children}
        </a>
      );
    },
    [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
  },
};

// Styled Components
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 45vw);
  grid-template-rows: auto;
  grid-template-areas:
    'item5 item5'
    'item1 item2'
    'item3 item4';
  gap: 2px;
  width: 100vw;
  position: relative; /* This is important for absolute positioning of children */
  justify-content: center;
  margin-top: 1em;
`;

const GridImage = styled.div<{ $isLarge?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background-color: ${(props) => (props.$isLarge ? `#107379` : `transparent`)};
  transition: filter 0.3s ease-in-out;

  .gatsby-image-wrapper,
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%) brightness(0.65);
  }
`;

const ItemTitle = styled.h3<{ $isLarge?: boolean }>`
  font-size: 1.2rem;
  margin: 0; /* Reset margin for perfect centering */
  text-align: center;
  font-family: ${(props) => (props.$isLarge ? `Primary` : `Tertiary`)};
  font-style: ${(props) => (props.$isLarge ? `normal` : `italic`)};
  text-transform: lowercase;
  color: #ddd5d5; /* Reverted to white for all */
  z-index: 2;
  position: relative;
  letter-spacing: ${(props) => (props.$isLarge ? `0.5vw` : `0.7vw`)};
  opacity: 1;
  transition: all 0.3s ease;
  user-select: none; /* Prevent text selection on mobile */
  -webkit-user-select: none; /* For Safari */

  &::after {
    content: ' →';
    margin-left: 0em;
    transition: transform 0.3s ease;
  }

  /* Remove highlight box on hover */
`;

const GridItem = styled(motion.div)<{ $isLarge?: boolean; $gridArea: string }>`
  background-color: ${(props) => (props.$isLarge ? `#107379` : `#f8f8f8`)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  height: 45vw;
  grid-area: ${(props) => props.$gridArea};
  border-radius: 0;
`;

const ContentOverlay = styled(motion.div)`
  position: absolute; /* Position relative to the parent div */
  top: 1rem; /* Match GridContainer's margin-top */
  left: 50%;
  transform: translateX(-50%); /* Center horizontally */
  width: calc(90vw + 2px); /* Match the grid width (2 * 45vw + 2px gap) */
  height: 100%; /* Match the grid height, accounting for margin */
  z-index: 9999;
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Align content to the top for scrolling */
  background-color: rgba(16, 115, 121, 1);
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  box-sizing: border-box; /* Include padding in the element's total width and height */
  padding: 2rem 1rem; /* Add padding */
  overflow-y: auto; /* Enable vertical scrolling */
`;

const CloseButton = styled.button`
  position: sticky; /* Changed from absolute to sticky */
  top: -6px; /* Moved up by 1rem (16px) from 10px */
  right: 10px;
  align-self: flex-end; /* Align to the right of the flex container */
  background: rgba(16, 115, 121, 0.85);
  border-radius: 50%;
  color: white;
  border: none;
  font-size: 1.2rem; /* Slightly smaller for a cleaner look */
  cursor: pointer;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  z-index: 10001; /* Ensure it's above all other content */
  margin-bottom: -30px; /* Pull it up so it doesn't take up vertical space (height + top) */
  flex-shrink: 0; /* Prevent the button from shrinking */
`;

const OverlayTitle = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  text-align: center;
  font-family: Primary;
  color: white;
  letter-spacing: 0.25vw;
  pointer-events: auto;
`;

const OverlayTextContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const OverlayDescription = styled.p`
  font-family: Secondary;
  white-space: pre-wrap;
  color: white;
  font-size: 1.2rem;
  width: 90%;
  text-align: left;
  line-height: 1.8;
  pointer-events: auto;
  letter-spacing: 0.1rem;
`;

const OverlayButton = styled(motion.button)`
  padding: 10px 20px;
  background-color: white;
  color: black;
  border: none;
  cursor: pointer;
  font-family: Primary;
  font-size: 0.8rem;
  margin-top: 20px;
  border-radius: 0;
  pointer-events: auto;
  position: relative;
  z-index: 10000; /* Extra high z-index to ensure clickability */
`;

// Main component
export default function ApproachGridMobile({
  services,
}: {
  services: ServiceItem[];
}) {
  const [selectedItem, setSelectedItem] = useState<ServiceItem | null>(null);

  const handleItemClick = (item: ServiceItem) => {
    setSelectedItem(item);
  };

  const handleClose = () => {
    setSelectedItem(null);
  };

  return (
    <div style={{ position: `relative` }}>
      <GridContainer>
        {services.map((item, index) => {
          const isLargeItem = Boolean(item.large);
          const gridArea = `item${index + 1}`;

          return (
            <GridItem
              key={index}
              $isLarge={isLargeItem}
              $gridArea={gridArea}
              onClick={() => handleItemClick(item)}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {!isLargeItem && (
                <GridImage $isLarge={isLargeItem}>
                  {item.image?.gatsbyImageData ? (
                    <GatsbyImage
                      image={getImage(item.image.gatsbyImageData)!}
                      alt={item.title}
                    />
                  ) : null}
                </GridImage>
              )}
              <ItemTitle $isLarge={isLargeItem}>{item.title}</ItemTitle>
            </GridItem>
          );
        })}
      </GridContainer>

      {/* Content overlay for the selected item */}
      <AnimatePresence>
        {selectedItem && (
          <ContentOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
          >
            <CloseButton
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
            >
              ✕
            </CloseButton>
            <OverlayTextContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <OverlayTitle>
                {selectedItem.fullTitle || selectedItem.title}
              </OverlayTitle>
              <OverlayDescription>
                {selectedItem.description?.raw &&
                  renderRichText(
                    { raw: selectedItem.description.raw },
                    richTextRenderOptions,
                  )}
              </OverlayDescription>
              {selectedItem.path && (
                <OverlayButton as={Link} to={selectedItem.path}>
                  Learn More
                </OverlayButton>
              )}
            </OverlayTextContainer>
          </ContentOverlay>
        )}
      </AnimatePresence>
    </div>
  );
}
