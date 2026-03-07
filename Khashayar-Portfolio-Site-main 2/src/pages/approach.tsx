import Seo from '@/components/seo/Seo';
import Layout from '@/layouts/Layout';
import { styled } from 'styled-components';
import ApproachGridDesktop from '@/components/services/ApproachGridDesktop';
import ApproachGridMobile from '@/components/services/ApproachGridMobile';
import { graphql } from 'gatsby';
import { ServiceItem } from '@/utils/types';
import useIsPortrait from '@/components/hooks/useIsPortrait';

const Container = styled.div<{ $isMobile: boolean }>`
  width: ${(props) => (props.$isMobile ? `100%` : `85%`)};
  max-width: 1400px;
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.$isMobile ? `flex-start` : `center`)};
  align-items: center;
  margin: 0 auto;
  padding-bottom: ${(props) => (props.$isMobile ? `10vh` : `0`)};
`;

export default function ServicesPage({ data }: { data: any }) {
  const isBrowser = typeof window !== `undefined`;
  const approachData = data.contentfulApproachPage;

  const serviceItems: ServiceItem[] = [
    {
      title: approachData.bioTitle,
      fullTitle: approachData.bioHeader,
      description: approachData.bioBody,
      image: approachData.bioImage,
    },
    {
      title: approachData.psycheTitle,
      fullTitle: approachData.psycheHeader,
      description: approachData.psycheBody,
      image: approachData.psycheImage,
    },
    {
      title: approachData.socioTitle,
      fullTitle: approachData.socioHeader,
      description: approachData.socioBody,
      image: approachData.socioImage,
    },
    {
      title: approachData.neuroTitle,
      fullTitle: approachData.neuroHeader,
      description: approachData.neuroBody,
      image: approachData.neuroImage,
    },
    {
      title: approachData.treatmentTitle,
      fullTitle: approachData.treatmentHeader,
      description: approachData.treatmentBody,
      image: approachData.treatmentImage, // No image for the large item
      large: true,
    },
  ];

  const isMobile = useIsPortrait();

  return isBrowser ? (
    <Layout>
      <Container $isMobile={isMobile}>
        {isMobile && <ApproachGridMobile services={serviceItems} />}
        {!isMobile && <ApproachGridDesktop services={serviceItems} />}
      </Container>
    </Layout>
  ) : null;
}

export function Head() {
  return <Seo metadataArray={[]} />;
}

export const query = graphql`
  query ApproachPageQuery {
    contentfulApproachPage {
      bioTitle
      bioHeader
      bioBody {
        raw
      }
      bioImage {
        gatsbyImageData(
          width: 800
          quality: 90
          formats: [AUTO, WEBP, AVIF]
          placeholder: BLURRED
        )
      }
      psycheTitle
      psycheHeader
      psycheBody {
        raw
      }
      psycheImage {
        gatsbyImageData(
          width: 800
          quality: 90
          formats: [AUTO, WEBP, AVIF]
          placeholder: BLURRED
        )
      }
      socioTitle
      socioHeader
      socioBody {
        raw
      }
      socioImage {
        gatsbyImageData(
          width: 800
          quality: 90
          formats: [AUTO, WEBP, AVIF]
          placeholder: BLURRED
        )
      }
      neuroTitle
      neuroHeader
      neuroBody {
        raw
      }
      neuroImage {
        gatsbyImageData(
          width: 800
          quality: 90
          formats: [AUTO, WEBP, AVIF]
          placeholder: BLURRED
        )
      }
      treatmentTitle
      treatmentHeader
      treatmentBody {
        raw
      }
    }
  }
`;
