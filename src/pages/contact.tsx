import Seo from '@/components/seo/Seo';
import Layout from '@/layouts/Layout';
import Metadata from '@/static/metadata/template-metadata.json';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1232px;
  margin: 0 auto;
  padding: 2rem;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  margin-top: 0;
  margin-bottom: 3rem;
  text-align: center;
  text-transform: uppercase;
  font-weight: 300;
  letter-spacing: 0.4vw;
  font-family: Primary;
  color: #333;
`;

const IframeContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  padding: 2rem;
  box-sizing: border-box;
  background: #f9f9f9;
  border-radius: 8px;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const StyledIframe = styled.iframe`
  width: 100%;
  max-width: 600px;
  height: auto;
  min-height: 600px;
  border: none;
  display: block !important;
`;

export default function ContactPage() {
  const isBrowser = typeof window !== `undefined`;

  return isBrowser ? (
    <Layout>
      <Container>
        <Title>Contact Us</Title>
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
