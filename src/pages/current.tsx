import Seo from '@/components/seo/Seo';
import Layout from '@/layouts/Layout';
import Metadata from '@/static/metadata/template-metadata.json';
import styled from 'styled-components';
import useIsPortrait from '@/components/hooks/useIsPortrait';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 4rem);
  padding: 2rem;
  height: 100%;
  margin: 0 auto;
  overflow: auto;
`;

const ContentContainer = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.$isMobile ? `90%` : `70%`)};
  max-width: 900px;
  margin-top: 30vh;
`;

const Section = styled.div`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2`
  font-family: Primary;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 1rem;
  letter-spacing: 0.1vw;
  color: #4a4a4a;
`;

const Paragraph = styled.p`
  font-family: Secondary;
  font-size: 0.9rem;
  line-height: 1.6;
  letter-spacing: 0.05vw;
  margin-bottom: 1.5rem;
  letter-spacing: 0.1vw;
  line-height: 1.6rem;
  padding-left: 1rem;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    background-color: #107379;
  }
`;

export default function CurrentPage() {
  const isBrowser = typeof window !== `undefined`;
  const isMobile = useIsPortrait();

  return isBrowser ? (
    <Layout>
      <Container>
        <ContentContainer $isMobile={isMobile}>
          <Section>
            <Paragraph>
              <SectionTitle>Current Research Focus</SectionTitle>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              auctor magna at lectus efficitur, non sagittis nunc dapibus. Donec
              vitae lacinia dolor. Vestibulum ante ipsum primis in faucibus orci
              luctus et ultrices posuere cubilia curae; Sed sit amet justo eget
              nisi tincidunt facilisis. Maecenas condimentum fringilla erat, id
              aliquam risus dignissim at.
            </Paragraph>
          </Section>
        </ContentContainer>
      </Container>
    </Layout>
  ) : null;
}

export function Head() {
  return <Seo metadataArray={Metadata} />;
}
