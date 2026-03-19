import { graphql, useStaticQuery } from 'gatsby';
import { Metadata } from '@/utils/types';

// Default Export
export default function Seo({
  metadataArray = [],
  children,
}: {
  metadataArray?: Array<Metadata>;
  children?: any;
}) {
  const { allFile } = useStaticQuery(
    graphql`
      query {
        allFile(filter: { name: { eq: "SEOLandingImage" } }) {
          nodes {
            publicURL
          }
        }
      }
    `,
  );
  const defaultImageUrl = allFile.nodes[0].publicURL;

  return (
    <>
      {metadataArray.map((metadata: Metadata) => {
        return metadata.name === `title` ? (
          <title key={metadata.name}>{metadata.content}</title>
        ) : (
          <meta
            name={metadata.name}
            content={
              metadata.name.includes(`image`) && metadata.content === ``
                ? defaultImageUrl
                : metadata.content
            }
            key={metadata.name}
          />
        );
      })}
      {children}
    </>
  );
}
