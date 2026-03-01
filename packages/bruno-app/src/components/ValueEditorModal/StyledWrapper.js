import styled from 'styled-components';

const StyledWrapper = styled.div`
  .editor-container {
    height: 400px;
    border: 1px solid ${(props) => props.theme.codemirror.border};
    border-radius: 4px;
    overflow: hidden;
  }
`;

export default StyledWrapper;
