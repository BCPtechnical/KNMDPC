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
  padding: 2rem 2rem 0;
  box-sizing: border-box;
  overflow: hidden;
`;

const Title = styled.h1`
  font-family: Primary;
  font-size: 2.2rem;
  font-weight: 300;
  letter-spacing: 0.4vw;
  text-transform: uppercase;
  text-align: center;
  color: #4a4a4a;
  margin: 0 0 0.4rem;
  padding-top: 3rem;
`;

const Divider = styled.div`
  width: 40px;
  height: 1px;
  background-color: #107379;
  margin: 0 auto 0.5rem;
`;

const IframeContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: transparent;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  max-width: 600px;
  height: 600px;
  border: none;
  display: block !important;
  background: transparent;
  color-scheme: normal;
  overflow: hidden;
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
            scrolling="no"
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
