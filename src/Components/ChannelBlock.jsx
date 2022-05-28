import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';

const FlexChannelDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid rgb(0, 0, 0);
`;

function ChannelBlock({ button, onRemoveClick }) {
  return (
    <FlexChannelDiv>
      <p>Channel name: {button.title}</p>

      <p>Channel ID: {button.id}</p>
      <Button onClick={() => onRemoveClick(button.id)}>Remove channel</Button>
    </FlexChannelDiv>
  );
}

export default ChannelBlock;
