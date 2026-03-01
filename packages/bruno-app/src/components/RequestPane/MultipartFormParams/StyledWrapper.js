import styled from 'styled-components';

const Wrapper = styled.div`
  .upload-btn,
  .clear-file-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    color: ${(props) => props.theme.colors.text.muted};
    background: transparent;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    transition: color 0.15s ease;

    &:hover {
      color: ${(props) => props.theme.colors.text.link};
    }
  }

  .clear-file-btn:hover {
    color: ${(props) => props.theme.colors.text.danger};
  }

  .file-value-cell {
    padding: 4px 0;

    .file-name {
      font-size: 12px;
      color: ${(props) => props.theme.text};
    }
  }

  .value-cell {
    .expand-btn {
      position: absolute;
      top: 2px;
      right: 2px;
      z-index: 5;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3px;
      color: ${(props) => props.theme.colors.text.muted};
      background: ${(props) => props.theme.bg};
      border: 1px solid ${(props) => props.theme.border.border0};
      cursor: pointer;
      border-radius: 4px;
      opacity: 0;
      transition: opacity 0.15s ease, color 0.15s ease;

      &:hover {
        color: ${(props) => props.theme.colors.text.link};
      }
    }

    &:hover .expand-btn {
      opacity: 1;
    }

    .upload-btn {
      position: absolute;
      top: 2px;
      right: 24px;
    }
  }
`;

export default Wrapper;
