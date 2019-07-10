import styled from 'styled-components';

export const PaginationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #7159c1;
    border-radius: 4px;
    width: 100px;
    height: 40px;
    text-transform: uppercase;
    font-weight: bold;
    background: #fff;

    &:hover {
      background: #7159c1;
      color: #fff;
    }

    &[disabled] {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
`;
