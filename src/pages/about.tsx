import Seo from '@/components/seo/Seo';
import Layout from '@/layouts/Layout';
import Metadata from '@/static/metadata/template-metadata.json';
import styled from 'styled-components';
import useIsPortrait from '@/components/hooks/useIsPortrait';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { INLINES, Block, Inline } from '@contentful/rich-text-types';

const richTextOptions = {
  renderNode: {
    [INLINES.HYPERLINK]: (node: Block | Inline, children: any) => {
      const { uri } = node.data;
      return (
        <a href={uri} style={{ color: `#107379`, textDecoration: `none` }}>
          {children}
        </a>
      );
    },
  },
};

const Container = styled.div<{ $isMobile: boolean }>`
  display: ${(props) => (props.$isMobile ? `flex` : `grid`)};
  flex-direction: ${(props) => (props.$isMobile ? `column` : `initial`)};
  grid-template-columns: ${(props) => (props.$isMobile ? `none` : `1fr 2fr`)};
  gap: ${(props) => (props.$isMobile ? `5vw` : `2rem`)};
  align-items: center;
  width: 100%;
  padding: ${(props) => (props.$isMobile ? `1rem` : `0 5vw`)};
  padding-bottom: ${(props) => (props.$isMobile ? `10vh` : `0`)};
  min-height: ${(props) => (props.$isMobile ? `auto` : `calc(100vh - 80px)`)};
  margin: 0 auto;
  box-sizing: border-box;
`;

const Portrait = styled.div<{ $isMobile: boolean }>`
  margin-top: ${(props) => (props.$isMobile ? `5vh` : `0`)};
  width: ${(props) => (props.$isMobile ? `65vw` : `100%`)};
  height: ${(props) => (props.$isMobile ? `100vw` : `560px`)};
  justify-self: ${(props) => (props.$isMobile ? `auto` : `auto`)};
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const Description = styled.div<{ $isMobile: boolean }>`
  font-family: Secondary;
  font-size: ${(props) => (props.$isMobile ? `1rem` : `1.2rem`)};
  letter-spacing: 0.05rem;
  line-height: ${(props) => (props.$isMobile ? `1.6rem` : `2rem`)};
  padding-left: ${(props) => (props.$isMobile ? `0` : `2rem`)};
  position: relative;
  width: ${(props) => (props.$isMobile ? `90%` : `95%`)};
  pointer-events: auto;
  opacity: 0.9;
  margin-top: ${(props) => (props.$isMobile ? `5vh` : `0`)};
  margin-bottom: ${(props) => (props.$isMobile ? `15vh` : `0`)};
  justify-self: ${(props) => (props.$isMobile ? `auto` : `start`)};
  align-self: ${(props) => (props.$isMobile ? `auto` : `center`)};
  font-family: Secondary;
  line-height: 1.8;
  letter-spacing: 0.05vw;
  opacity: 0.7;
  overflow-wrap: break-word;
  word-wrap: break-word;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: #000000;
    display: ${(props) => (props.$isMobile ? `none` : `block`)};
  }
`;

const BoldText = styled.p<{ $isMobile: boolean }>`
  font-weight: 400;
  font-size: ${(props) => (props.$isMobile ? `1.45rem` : `1.85rem`)};
  margin-bottom: 2.5rem;
  margin-top: -0.3rem;
  font-family: Tertiary;
  letter-spacing: inherit;
  line-height: 2.1rem;
  opacity: 1;
`;

export default function AboutPage({ data }: { data: any }) {
  const isBrowser = typeof window !== `undefined`;
  const isMobile = useIsPortrait();
  const aboutPageData = data.contentfulAboutPage;
  const profileImage = getImage(
    isMobile ? aboutPageData.mobileProfileImage : aboutPageData.profileImage,
  );

  return isBrowser ? (
    <Layout>
      <Container $isMobile={isMobile}>
        <Portrait $isMobile={isMobile}>
          {profileImage && (
            <GatsbyImage
              image={profileImage}
              alt="Profile"
              style={{ height: `100%`, width: `100%` }}
            />
          )}
        </Portrait>
        <Description $isMobile={isMobile}>
          {isMobile ? (
            <>
              <BoldText $isMobile={isMobile}>
                {aboutPageData.mobileHeaderText}
              </BoldText>
              {renderRichText(aboutPageData.mobileBodyText, richTextOptions)}
            </>
          ) : (
            <>
              <BoldText $isMobile={isMobile}>
                {aboutPageData.headerText}
              </BoldText>
              {renderRichText(aboutPageData.bodyText, richTextOptions)}
            </>
          )}
        </Description>
      </Container>
    </Layout>
  ) : null;
}

export const query = graphql`
  query AboutPageQuery {
    contentfulAboutPage {
      headerText
      bodyText {
        raw
      }
      mobileHeaderText
      mobileBodyText {
        raw
      }
      profileImage {
        gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED, width: 530)
      }
      mobileProfileImage {
        gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED, width: 530)
      }
    }
  }
`;

export function Head() {
  return <Seo metadataArray={Metadata} />;
}
