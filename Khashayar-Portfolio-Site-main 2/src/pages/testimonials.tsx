import Testimonials from '@/components/TestimonialsCarousel';
import Seo from '@/components/seo/Seo';
import Layout from '@/layouts/Layout';
import Metadata from '@/static/metadata/template-metadata.json';
import { graphql } from 'gatsby';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 2rem 0;
  min-height: calc(100vh - 4rem);
  margin: 0 auto;
`;
const Title = styled.h1`
  font-size: 2vw;
  margin-top: 10vh; /* Updated to match index page */
  margin-bottom: 1rem;
  text-align: center;
  text-transform: uppercase;
  font-weight: 300;
  letter-spacing: 0.5vw;
  font-family: Primary;
`;

export default function TestimonialsPage({ data }: { data: any }) {
  const isBrowser = typeof window !== `undefined`;
  const sampleTestimony = data.testimonialSample.nodes[0].publicURL; // Assuming this is the correct way to access the public URL of the testimonial video
  const testimonialsData = [
    {
      shortQuote: `This is a sample testimony A.`,
      video: { publicUrl: sampleTestimony, mimeType: `video/mp4` },
    },
    {
      shortQuote: `This is a sample testimony B.`,
      video: { publicUrl: sampleTestimony, mimeType: `video/mp4` },
    },
    {
      shortQuote: `This is a sample testimony C.`,
      video: { publicUrl: sampleTestimony, mimeType: `video/mp4` },
    },
    {
      shortQuote: `This is a sample testimony D.`,
      video: { publicUrl: sampleTestimony, mimeType: `video/mp4` },
    },
    {
      shortQuote: `This is a sample testimony E.`,
      video: { publicUrl: sampleTestimony, mimeType: `video/mp4` },
    },
    {
      shortQuote: `This is a sample testimony F.`,
      video: { publicUrl: sampleTestimony, mimeType: `video/mp4` },
    },
    {
      shortQuote: `This is a sample testimony G.`,
      video: { publicUrl: sampleTestimony, mimeType: `video/mp4` },
    },
    {
      shortQuote: `This is a sample testimony H.`,
      video: { publicUrl: sampleTestimony, mimeType: `video/mp4` },
    },
    {
      shortQuote: `This is a sample testimony I.`,
      video: { publicUrl: sampleTestimony, mimeType: `video/mp4` },
    },
    {
      shortQuote: `This is a sample testimony J.`,
      video: { publicUrl: sampleTestimony, mimeType: `video/mp4` },
    },
    {
      shortQuote: `This is a sample testimony K.`,
      video: { publicUrl: sampleTestimony, mimeType: `video/mp4` },
    },
    {
      shortQuote: `This is a sample testimony L.`,
      video: { publicUrl: sampleTestimony, mimeType: `video/mp4` },
    },
    {
      shortQuote: `This is a sample testimony M.`,
      video: { publicUrl: sampleTestimony, mimeType: `video/mp4` },
    },
  ];
  return isBrowser ? (
    <Layout>
      <Container>
        <Title>Testimonials</Title>
        <Testimonials testimonials={testimonialsData} />
      </Container>
    </Layout>
  ) : null;
}

export function Head() {
  return <Seo metadataArray={Metadata} />;
}

export const query = graphql`
  query Testimonials {
    testimonialSample: allFile(filter: { name: { eq: "testimonialSample" } }) {
      nodes {
        publicURL
      }
    }
  }
`;
