import Layout from '@/layouts/Layout';
import Metadata from '@/static/metadata/template-metadata.json';
import Seo from '@/components/seo/Seo';
import styled from 'styled-components';
import useIsPortrait from '@/components/hooks/useIsPortrait';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const ContentContainer = styled.div<{ $isMobile?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 4rem);
  padding: ${(props) => (props.$isMobile ? `3.5rem 2rem 2rem` : `2rem`)};
  height: 100%;
  margin: 0 auto;
  position: relative;

  @media (max-width: 500px) {
    width: 100%;
    padding: 2rem 0 2rem; /* Adjusted to account for navbar height */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.4em;
  margin-top: 30vh;
  margin-bottom: 2rem;
  text-align: center;
  text-transform: uppercase;
  font-weight: 300;
  letter-spacing: 0.5vw;
  font-family: Primary;
  position: relative;
  z-index: auto;
  width: 100%;
  line-height: 1.3;
`;

const TextGrid = styled.div<{ $isMobile?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 13vw;
  width: 90%;
  margin-top: ${(props) => (props.$isMobile ? `16rem;` : `13rem`)};
  margin-left: 4vw;
  position: relative;
  max-width: 1200px;
  opacity: 0.7;
  box-sizing: border-box;

  @media (max-width: 500px) {
    flex-direction: column;
    gap: 0;
    margin-top: 0; /* Removed margin top since page title is now in the navbar */
    margin-left: auto;
    margin-right: auto;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`;

const TextColumn = styled.div`
  font-family: Secondary;
  font-size: 1.2rem;
  letter-spacing: 0.1vw;
  line-height: 1.6rem;
  padding-left: 1rem;
  position: relative;
  width: 100%;
  pointer-events: none;
  white-space: pre-wrap; /* Add this line to preserve whitespace */

  @media (max-width: 500px) {
    width: 90%;
    font-size: 0.85rem;
    line-height: 1.6;
  }

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    background-color: #000000;
    opacity: 0.7;
  }
`;

const CombinedTextColumn = styled(TextColumn)`
  width: 80%;
  font-size: 0.85rem;
  text-align: left;
  margin: 0 auto;
  align-self: center;

  p {
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  &:before {
    top: 2rem;
  }
`;

export default function IndexPage({ data }: { data: any }) {
  const isMobile = useIsPortrait();
  const homePageData = data.contentfulHomePage;
  const mobileImage = getImage(homePageData.mobileImage);

  return (
    <Layout>
      <ContentContainer $isMobile={isMobile}>
        {!isMobile && <PageTitle>{homePageData.desktopTitleText}</PageTitle>}
        {isMobile ? (
          <>
            {mobileImage && (
              <GatsbyImage
                image={mobileImage}
                alt=""
                style={{
                  width: `300px`,
                  height: `45vh`,
                  margin: `2vh auto 4vh auto`,
                }}
              />
            )}
            <TextGrid $isMobile={isMobile}>
              <CombinedTextColumn>
                <p
                  style={{
                    fontSize: `1.3rem`,
                    fontFamily: `Primary`,
                    marginBottom: `1.5rem`,
                  }}
                >
                  {homePageData.mobileTitleText}
                </p>
                <p style={{ marginBottom: `0rem` }}>
                  {homePageData.mobileSubText}
                </p>
              </CombinedTextColumn>
            </TextGrid>
          </>
        ) : (
          <TextGrid $isMobile={isMobile}>
            <TextColumn>{homePageData.desktopLeftText}</TextColumn>
            <TextColumn>{homePageData.desktopRightText}</TextColumn>
          </TextGrid>
        )}
      </ContentContainer>
    </Layout>
  );
}

export const query = graphql`
  query HomePageQuery {
    contentfulHomePage {
      desktopTitleText
      desktopLeftText
      desktopRightText
      mobileTitleText
      mobileSubText
      mobileImage {
        gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED, width: 300)
      }
    }
  }
`;

export function Head() {
  return <Seo metadataArray={Metadata} />;
}
