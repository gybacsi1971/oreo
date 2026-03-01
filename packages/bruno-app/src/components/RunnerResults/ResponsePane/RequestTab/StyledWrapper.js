import styled from 'styled-components';

const StyledWrapper = styled.div`
  .method-url-bar {
    display: flex;
    align-items: baseline;
    gap: 8px;
    padding: 8px 0;
  }

  .method-badge {
    font-weight: 600;
    font-size: 13px;
    color: ${(props) => props.theme.colors.text.link};
    flex-shrink: 0;
  }

  .url-text {
    word-break: break-all;
    font-size: 13px;
    color: ${(props) => props.theme.text};
  }
`;

export default StyledWrapper;
