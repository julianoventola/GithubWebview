import styled, { keyframes, css } from 'styled-components';

// --- > FORM
export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid #aaa;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

// --- > ROTATE
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

// --- > SUBMIT BUTTON
export const SubmitButton = styled.button.attrs(props => ({
  // Determina que o botao seja um 'submit'
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

// --- > LIST
export const List = styled.ul`
  list-style: none;
  margin-top: 30px;
  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 1px solid #ccc;
    }

    a {
      color: #00cccc;
      text-decoration: none;
    }
  }
`;
