import styled from 'styled-components';

const Wrapper = styled.div`
  table {
    width: 100%;
    border-collapse: collapse;
    font-weight: 500;
    table-layout: fixed;

    thead,
    td {
      border: 1px solid ${(props) => props.theme.table.border};
    }

    thead {
      color: ${(props) => props.theme.table.thead.color};
      font-size: ${(props) => props.theme.font.size.base};
      user-select: none;
    }
    td {
      padding: 6px 10px;
      }
    }

  .btn-add-param {
    font-size: ${(props) => props.theme.font.size.base};
  }

  input[type='text'] {
    width: 100%;
    border: solid 1px transparent;
    outline: none !important;
    color: ${(props) => props.theme.table.input.color};
    background: transparent;

    &:focus {
      outline: none !important;
      border: solid 1px transparent;
    }
  }

  input[type='checkbox'] {
    cursor: pointer;
    position: relative;
    top: 1px;
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
  }
`;

export default Wrapper;
