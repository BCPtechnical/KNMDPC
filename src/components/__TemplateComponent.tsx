import { dimensions } from '@/utils/dimensions';
import React from 'react';
import styled from 'styled-components';

// Styled Components
const StyledTemplateDiv = styled.div`
  background-color: var(--background-color);
  color: var(--primary-color);
  font-family: Primary;
  @media ${dimensions.mobileS} {
  }
  @media ${dimensions.tablet} {
  }
  @media ${dimensions.laptop} {
  }
  @media ${dimensions.desktop} {
  }
`;

// Types

// Default Export
export default function Component({
  templatePropOne,
  templatePropTwo = `I am an optional prop that was passed nothing`,
}: {
  templatePropOne: string;
  templatePropTwo?: string;
}) {
  return (
    <React.Fragment>
      <StyledTemplateDiv>{templatePropOne}</StyledTemplateDiv>
      <StyledTemplateDiv>{templatePropTwo}</StyledTemplateDiv>
    </React.Fragment>
  );
}
