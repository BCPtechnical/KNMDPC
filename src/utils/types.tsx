import { IGatsbyImageData } from 'gatsby-plugin-image';

export type Metadata = {
  name: string;
  content: string;
};

export type NavBarOption = {
  name: string;
  path: string;
};

export interface ContentfulRichText {
  raw: string;
}

export type ServiceItem = {
  title: string;
  fullTitle?: string;
  description: ContentfulRichText;
  image: {
    gatsbyImageData: IGatsbyImageData;
  }; // Updated to accept either GatsbyImageData or string
  large?: boolean;
  path?: string; // Optional path for navigation
};
