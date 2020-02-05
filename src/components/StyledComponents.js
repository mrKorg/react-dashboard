import styled from "styled-components";

export const GridContainer = styled.div`
  display: ${props => (props.inline ? 'inline-grid' : 'grid')};
  grid-gap: ${props => (props.gap ? props.gap : '')};
  grid-template-columns: ${props => (props.columns ? props.columns : '')};
  grid-template-rows: ${props => (props.rows ? props.rows : '')};
  align-items: ${props => (props.alignItems ? props.alignItems : '')};
  justify-content: ${props => (props.justifyContent ? props.justifyContent : '')};
  justify-items: ${props => (props.justifyItems ? props.justifyItems : '')};
  margin: ${props => (props.margin ? props.margin : '')};
  padding: ${props => (props.padding ? props.padding : '')};
`;

export const Link = styled.a`
  &&& {
    color: #1890ff;
    transition: opacity .3s ease;

    .ant-typography {
      color: inherit;
    }

    &:hover {
      opacity: .5;
    }
  }
`;
