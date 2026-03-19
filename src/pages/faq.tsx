import Seo from '@/components/seo/Seo';
import Layout from '@/layouts/Layout';
import styled from 'styled-components';
import useIsPortrait from '@/components/hooks/useIsPortrait';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { graphql } from 'gatsby';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

const FAQContent = styled.div`
  font-family: Secondary;
  font-size: 0.85rem;
  line-height: 1.8;
  letter-spacing: 0.05vw;
  opacity: 0.8;

  a {
    color: #107379;
    text-decoration: none;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.7;
    }
  }
`;

const FAQItem = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  overflow: hidden;
`;

const QuestionHeader = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  cursor: pointer;
  user-select: none;
`;

const Heading = styled.h3`
  font-family: Primary;
  font-size: 1.3rem;
  font-weight: 500;
  letter-spacing: 0.1vw;
  margin: 0;
`;

const Icon = styled.div<{ $isOpen: boolean }>`
  width: 20px;
  height: 20px;
  position: relative;
  margin-right: 10px;
  transition: transform 0.4s ease;

  &:before {
    content: '♆';
    color: #107379;
    font-size: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: ${(props) =>
      props.$isOpen
        ? `translate(-50%, -50%) rotate(180deg)`
        : `translate(-50%, -50%)`};
    transition: transform 0.4s ease;
  }
`;

const Paragraph = styled.p`
  margin-top: 0;
  margin-bottom: 1.5rem;
  padding-right: 2rem;
  overflow-wrap: break-word;
  word-wrap: break-word;

  li & {
    margin-bottom: 0.15rem; /* Reduced margin for list items */
  }
`;

const StyledUl = styled.ul`
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
`;

const StyledLi = styled.li`
  padding-left: 0.5rem;
`;

const richTextRenderOptions: Options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Paragraph>{children}</Paragraph>,
    [BLOCKS.UL_LIST]: (node, children) => <StyledUl>{children}</StyledUl>,
    [BLOCKS.LIST_ITEM]: (node, children) => <StyledLi>{children}</StyledLi>,
  },
};

const Content = styled(motion.div)`
  overflow: hidden;
`;

interface FAQItemProps {
  question: string;
  answer: any; // Contentful Rich Text object
}

const FAQ = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FAQItem>
      <QuestionHeader onClick={() => setIsOpen(!isOpen)}>
        <Heading>{question}</Heading>
        <Icon $isOpen={isOpen} />
      </QuestionHeader>
      <AnimatePresence initial={false}>
        {isOpen && (
          <Content
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: `auto`, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FAQContent>
              {answer && renderRichText(answer, richTextRenderOptions)}
            </FAQContent>
          </Content>
        )}
      </AnimatePresence>
    </FAQItem>
  );
};

interface FaqPageProps {
  data: {
    contentfulInfoPage: {
      infoBlock: Array<{
        title: string;
        description: {
          raw: string;
        };
      }>;
    };
  };
}

const Container = styled.div<{ $isMobile: boolean }>`
  width: ${(props) => (props.$isMobile ? `calc(100% - 2rem)` : `85%`)};
  max-width: 1400px;
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: ${(props) => (props.$isMobile ? `1rem` : `0`)};
  padding-bottom: ${(props) => (props.$isMobile ? `10vh` : `0`)};
`;

const FaqContainer = styled.div`
  width: 100%;
  max-width: 900px;
`;

export default function FaqPage({ data }: FaqPageProps) {
  const { contentfulInfoPage } = data;
  const isMobile = useIsPortrait();

  return (
    <Layout>
      <Container $isMobile={isMobile}>
        <FaqContainer>
          {contentfulInfoPage.infoBlock.map((item, index) => (
            <FAQ key={index} question={item.title} answer={item.description} />
          ))}
        </FaqContainer>
      </Container>
    </Layout>
  );
}

export function Head() {
  return <Seo metadataArray={[]} />;
}

export const query = graphql`
  query FaqPageQuery {
    contentfulInfoPage {
      infoBlock {
        title
        description {
          raw
        }
      }
    }
  }
`;
