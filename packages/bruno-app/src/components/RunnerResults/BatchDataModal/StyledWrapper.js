import styled from 'styled-components';

const StyledWrapper = styled.div`
  .tab-toggle {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .tab-button {
    padding: 0.375rem 0.75rem;
    border: 1px solid ${(props) => props.theme.border.border0};
    border-radius: ${(props) => props.theme.border.radius.base};
    background: transparent;
    color: ${(props) => props.theme.colors.text.subtext0};
    cursor: pointer;
    font-size: ${(props) => props.theme.font.size.sm};

    &.active {
      background-color: ${(props) => props.theme.background.surface1};
      color: ${(props) => props.theme.colors.text.text};
      font-weight: 500;
    }
  }

  .data-textarea {
    width: 100%;
    min-height: 200px;
    padding: 0.5rem;
    font-family: monospace;
    font-size: ${(props) => props.theme.font.size.sm};
    background-color: ${(props) => props.theme.input.bg};
    border: 1px solid ${(props) => props.theme.input.border};
    border-radius: ${(props) => props.theme.border.radius.base};
    color: ${(props) => props.theme.colors.text.text};
    resize: vertical;

    &:focus {
      border-color: ${(props) => props.theme.input.focusBorder};
      outline: none;
    }
  }

  .file-input-wrapper {
    margin-bottom: 1rem;
  }

  .parse-error {
    color: ${(props) => props.theme.colors.text.danger};
    font-size: ${(props) => props.theme.font.size.sm};
    margin-top: 0.5rem;
  }

  .validation-section {
    margin-top: 0.75rem;
    font-size: ${(props) => props.theme.font.size.sm};
  }

  .validation-matched {
    color: ${(props) => props.theme.colors.text.green};
  }

  .validation-unmatched {
    color: ${(props) => props.theme.colors.text.yellow};
  }

  .validation-missing {
    color: ${(props) => props.theme.colors.text.muted};
  }

  .preview-section {
    margin-top: 1rem;
  }

  .preview-label {
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: ${(props) => props.theme.colors.text.text};
  }

  .preview-table {
    width: 100%;
    border-collapse: collapse;
    font-size: ${(props) => props.theme.font.size.sm};

    th, td {
      padding: 0.25rem 0.5rem;
      border: 1px solid ${(props) => props.theme.border.border0};
      text-align: left;
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    th {
      background-color: ${(props) => props.theme.background.mantle};
      font-weight: 500;
    }

    td {
      color: ${(props) => props.theme.colors.text.subtext0};
    }
  }

  .preview-more {
    color: ${(props) => props.theme.colors.text.muted};
    font-size: ${(props) => props.theme.font.size.xs};
    margin-top: 0.25rem;
  }
`;

export default StyledWrapper;
