import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';

const FlexButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid rgb(0, 0, 0);
`;

function ButtonItem({ button, onRemoveClick }) {
  return (
    <FlexButtonDiv>
      <p>Text: {button.text}</p>

      <p>URL: {button.url}</p>
      <Button onClick={() => onRemoveClick(button.text)}>Remove button</Button>
    </FlexButtonDiv>
  );
}

export default ButtonItem;
