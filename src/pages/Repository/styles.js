import styled, { css } from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #667;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const Filters = styled.ul`
  list-style: none;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FilterState = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #7159c1;
  border-radius: 4px;
  width: 100px;
  height: 40px;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #7159c1;
    color: #fff;
  }

  & + li {
    margin-left: 5px;
  }

  ${props =>
    props.selected &&
    css`
       {
        background: #7159c1;
        color: #fff;
      }
    `}
`;

export const IssueList = styled.ul`
  padding: 10px 0;
  margin: 10px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;
