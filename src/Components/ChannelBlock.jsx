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

function ChannelBlock({ channel, onRemoveClick }) {
  return (
    <FlexChannelDiv>
      <p>Channel name: {channel.title}</p>

      <p>Channel ID: {channel.id}</p>
      <Button onClick={() => onRemoveClick(channel.id)}>Remove channel</Button>
    </FlexChannelDiv>
  );
}

export default ChannelBlock;
