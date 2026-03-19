import Seo from '@/components/seo/Seo';
import Layout from '@/layouts/Layout';
import ContactSection from '@/components/contact-form/ContactForm';
import Metadata from '@/static/metadata/template-metadata.json';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1232px;
  height: calc(100vh - 60px); /* Match navbar height from Layout.tsx */
  margin: 0 auto;
  padding: 2rem;
  box-sizing: border-box;
  overflow: hidden;
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

export default function ContactPage() {
  const isBrowser = typeof window !== `undefined`;

  return isBrowser ? (
    <Layout>
      <Container>
        <Title>Contact Us</Title>
        <ContactSection enable={true} />
      </Container>
    </Layout>
  ) : null;
}

export function Head() {
  return <Seo metadataArray={Metadata} />;
}
