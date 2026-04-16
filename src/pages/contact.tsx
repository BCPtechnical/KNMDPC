import Seo from '@/components/seo/Seo';
import Layout from '@/layouts/Layout';
import Metadata from '@/static/metadata/template-metadata.json';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1232px;
  margin: 0 auto;
  padding: 0.5rem 1rem 0;
  box-sizing: border-box;
  height: calc(100vh - 60px);

  @media (max-width: 768px) {
    padding: 0.5rem 0.5rem 0;
  }
`;

const Title = styled.h1`
  font-family: Primary;
  font-size: 2.2rem;
  font-weight: 300;
  letter-spacing: 0.4vw;
  text-transform: uppercase;
  text-align: center;
  color: #4a4a4a;
  margin: 0;
  padding-top: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.6rem;
    padding-top: 1rem;
    margin: 0;
  }
`;

const Divider = styled.div`
  width: 40px;
  height: 1px;
  background-color: #107379;
  margin: 0 auto 0;
`;

const IframeContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: stretch;
  justify-content: center;
  background: transparent;
  min-height: 0;
  overflow: hidden;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  max-width: 600px;
  height: 100%;
  border: none;
  display: block !important;
  background: transparent;
  color-scheme: normal;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export default function ContactPage() {
  const isBrowser = typeof window !== `undefined`;

  return isBrowser ? (
    <Layout>
      <Container>
        <Title>Contact Us</Title>
        <Divider />
        <IframeContainer>
          <StyledIframe
            src="https://8534e653.sibforms.com/serve/MUIFADbymuB_KOHfyO2IQr0onZkPmqTJHp51_JbUWoX0hfMlrGy_SMVaUDwYrnnolPtPUGQg6oxmtc_7gdkEYj9hos_Q691-TMR9oZ7KV4jovjPX55fx25u1xJr8jJEjTl8HJvvNBVYz8VSRFYiDGDmiYAJMLpJw8bi5_u3z_bVBGUReEIo0RxgABamBXmssmWWFKLIWMds8Tv4-_g=="
            frameBorder="0"
            scrolling="auto"
            allowFullScreen={true}
            title="Contact Form"
          />
        </IframeContainer>
      </Container>
    </Layout>
  ) : null;
}

export function Head() {
  return <Seo metadataArray={Metadata} />;
}
