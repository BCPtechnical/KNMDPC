import { styled } from 'styled-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceItem } from '@/utils/types';
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

// Styled Components for the Grid
const GridContainer = styled.div`
  margin-top: 0; /* Removed top margin as it's now on the parent container */
  width: 100%;
  max-width: 1232px; /* Increased from 1120px */
  position: relative;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(3, 396px); /* Increased from 360px */
  grid-template-rows: repeat(2, 308px); /* Increased from 280px */
  grid-gap: 22px; /* Increased from 20px */
  grid-template-areas:
    'item1 item5 item2'
    'item3 item5 item4';
  justify-content: center;

  /* This ensures the center item spans 2 rows */
  & > div:nth-of-type(5) {
    grid-row: span 2;
    height: 638px; /* Increased from 580px (2*308 + 22) */
  }
`;

const GridItemWrapper = styled(motion.div)`
  overflow: hidden;
  position: relative;
  cursor: pointer;
  background-color: #107379; /* Changed from black to #107379 */

  &:nth-child(1) {
    grid-area: item1;
  }
  &:nth-child(2) {
    grid-area: item2;
  }
  &:nth-child(3) {
    grid-area: item3;
  }
  &:nth-child(4) {
    grid-area: item4;
  }
  &:nth-child(5) {
    grid-area: item5;
  }
`;

const GridImage = styled.div<{ $isCenterItem?: boolean }>`
  position: relative;
  width: 100%;
  height: ${(props) => (props.$isCenterItem ? `638px` : `308px`)};
  z-index: 0;
  background: ${(props) =>
    props.$isCenterItem
      ? `#107379` // For center item, just a solid color
      : `none`};
  filter: ${(props) =>
    props.$isCenterItem
      ? `none` // No image filter for center item
      : `grayscale(100%) brightness(0.45)`};
  transition: filter 0.3s ease;

  .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
  }

  ${(props) =>
    !props.$isCenterItem &&
    `
    ${GridItemWrapper}:hover & {
      filter: grayscale(10%) brightness(0.8);
    }
  `}
`;

const ItemTitle = styled(motion.h3)<{ $isCenterItem?: boolean }>`
  font-size: ${(props) =>
    props.$isCenterItem
      ? `1.7vw`
      : `1.7vw`}; /* Larger font for Treatment title */
  line-height: 2.75vw;
  margin: 0;
  text-align: center;
  font-family: ${(props) => (props.$isCenterItem ? `Primary` : `Tertiary`)};
  font-style: ${(props) => (props.$isCenterItem ? `normal` : `italic`)};
  color: white;
  z-index: 20; /* Increased z-index to appear above the overlay */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  letter-spacing: ${(props) =>
    props.$isCenterItem
      ? `0.35vw`
      : `0.25vw`}; /* Wider letter spacing for Treatment */
  opacity: 1; /* Always visible */
  transition: transform 0.3s ease, letter-spacing 0.3s ease;
  user-select: none; /* Prevent text selection */
  -webkit-user-select: none; /* For Safari */

  /* Removed highlight box on hover */
  ${GridItemWrapper}:hover & {
    letter-spacing: ${(props) => (props.$isCenterItem ? `0.4vw` : `0.3vw`)};
  }
`;

const BannerDescription = styled(motion.div)`
  font-size: 1.3rem;
  line-height: 1.8;
  font-family: 'Secondary';
  color: white;
  text-align: left;
  max-width: 80ch;
  letter-spacing: 0.1rem;
`;

const LearnMoreButton = styled(motion.a)`
  display: inline-block;
  background-color: #fff;
  color: #107379;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-family: 'Primary';
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 2rem;

  &:hover {
    background-color: #eee;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 20;
`;

// Remove BlackOverlay and ContentOverlay, as they are no longer needed.
// The expanding item itself will serve as the overlay.

const ExpandedContentWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px; /* Add max-width for readability */
  box-sizing: border-box;
  background: none;
  color: white;
`;

// Grid Item Component
interface GridItemProps {
  item: ServiceItem;
  onSelect: (item: ServiceItem, e: React.MouseEvent<HTMLDivElement>) => void;
  isAnySelected: boolean;
}

const GridItem = ({ item, onSelect, isAnySelected }: GridItemProps) => {
  const isCenterItem = item.title === `TREATMENT` || Boolean(item.large);
  const image = item.image?.gatsbyImageData
    ? getImage(item.image.gatsbyImageData)
    : null;

  return (
    <GridItemWrapper
      onClick={(e) => onSelect(item, e)}
      animate={{
        opacity: isAnySelected ? 0 : 1,
        transition: { duration: 0.3, ease: `easeInOut` },
      }}
      style={{ pointerEvents: isAnySelected ? `none` : `auto` }}
    >
      <div style={{ height: `100%`, position: `relative` }}>
        <GridImage $isCenterItem={isCenterItem}>
          {isCenterItem ? null : image ? (
            <GatsbyImage image={image} alt={item.title} />
          ) : null}
          {!isCenterItem && (
            <div
              style={{
                position: `absolute`,
                top: 0,
                left: 0,
                width: `100%`,
                height: `100%`,
                background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4))`,
                zIndex: 1,
              }}
            />
          )}
        </GridImage>
        <ItemTitle
          $isCenterItem={isCenterItem}
          animate={{
            opacity: isAnySelected ? 0 : 1,
            transition: { delay: 0, duration: 0.15 },
          }}
        >
          {item.title}
        </ItemTitle>
      </div>
    </GridItemWrapper>
  );
};

// Expanded Item Component
const ExpandedItem = ({
  item,
  onClose,
  origin,
}: {
  item: ServiceItem;
  onClose: () => void;
  origin: { top: number; left: number; width: number; height: number } | null;
}) => {
  const variants = {
    initial: origin
      ? {
          clipPath: `inset(${origin.top}px ${
            1232 - origin.left - origin.width
          }px ${638 - origin.top - origin.height}px ${
            origin.left
          }px round 10px)`,
          transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
        }
      : { opacity: 0 },
    animate: {
      clipPath: `inset(0px 0px 0px 0px round 0px)`,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
    },
    exit: origin
      ? {
          clipPath: `inset(${origin.top}px ${
            1232 - origin.left - origin.width
          }px ${638 - origin.top - origin.height}px ${
            origin.left
          }px round 10px)`,
          transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
        }
      : { opacity: 0 },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        position: `absolute`,
        top: 0,
        left: 0,
        width: `100%`,
        height: `100%`,
        backgroundColor: `#107379`,
        zIndex: 10,
        overflowY: `auto`,
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`,
        padding: `4rem`,
        boxSizing: `border-box`,
      }}
    >
      <ExpandedContentWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.4 } }}
        exit={{ opacity: 0, transition: { duration: 0 } }}
      >
        <ItemTitle
          $isCenterItem={item.title === `TREATMENT` || Boolean(item.large)}
          style={{
            position: `relative`,
            transform: `none`,
            top: `auto`,
            left: `auto`,
            marginBottom: `2rem`,
            fontFamily: `Primary`,
            fontStyle: `normal`,
            fontSize: `2rem`,
            textAlign: `left`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.4, duration: 0.4 } }}
          exit={{ opacity: 0, transition: { duration: 0 } }}
        >
          {item.fullTitle || item.title}
        </ItemTitle>
        <BannerDescription
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.4 } }}
          exit={{ opacity: 0, transition: { duration: 0 } }}
        >
          {item.description &&
            renderRichText(item.description, richTextRenderOptions)}
        </BannerDescription>
        {item.path && (
          <LearnMoreButton
            as={Link}
            to={item.path}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.6, duration: 0.4 } }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
          >
            Learn More
          </LearnMoreButton>
        )}
      </ExpandedContentWrapper>
      <CloseButton onClick={onClose}>✕</CloseButton>
    </motion.div>
  );
};

// Main component
export default function ApproachGridDesktop({
  services,
}: {
  services: ServiceItem[];
}) {
  const [selectedItem, setSelectedItem] = useState<ServiceItem | null>(null);
  const [clickPosition, setClickPosition] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  const handleSelectItem = (
    item: ServiceItem,
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    const gridBounds = gridContainerRef.current?.getBoundingClientRect();
    const itemBounds = e.currentTarget.getBoundingClientRect();

    if (gridBounds) {
      setClickPosition({
        top: itemBounds.top - gridBounds.top,
        left: itemBounds.left - gridBounds.left,
        width: itemBounds.width,
        height: itemBounds.height,
      });
    }
    setSelectedItem(item);
  };

  const handleClose = () => {
    setSelectedItem(null);
  };

  return (
    <div
      style={{
        display: `flex`,
        flexDirection: `column`,
        justifyContent: `center`,
        alignItems: `center`,
        minHeight: `calc(100vh - 100px)` /* Full viewport height minus header */,
        paddingBottom: `2rem`,
      }}
    >
      <div
        style={{
          position: `relative`,
          width: `100%`,
          maxWidth: `1232px`, // Increased from 1120px
          height: `638px`, // Increased from 580px
          marginTop: `2vh`,
        }}
      >
        <GridContainer ref={gridContainerRef}>
          {services.map((item: ServiceItem, index: number) => (
            <GridItem
              key={index}
              item={item}
              onSelect={handleSelectItem}
              isAnySelected={selectedItem !== null}
            />
          ))}
        </GridContainer>

        <AnimatePresence>
          {selectedItem && (
            <ExpandedItem
              item={selectedItem}
              onClose={handleClose}
              origin={clickPosition}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
