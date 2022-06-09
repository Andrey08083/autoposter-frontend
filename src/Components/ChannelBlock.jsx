import React from 'react';
import styled from '@emotion/styled';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const FlexChannelDiv = styled.div`
  padding: 20px;
  display: flex;
  gap: 15px;
  align-items: center;
  background-color: #F1F1F1;
  border-radius: 15px;
  border: 1px solid #e7e7e7;
`;

const ChannelImg = styled.img`
  width: 100px;
  border-radius: 50%;
`;

const ChannelDiv = styled.div`
  text-align: left;
`;

const ChannelSpan = styled.span`
  color: #969696;
`;

function ChannelBlock({ channel, onRemoveClick }) {
  return (
    <FlexChannelDiv>
      {channel.photo.length !== 0 && (<ChannelImg src={`data:image/png;base64, ${channel.photo}`} />)}
      <ChannelDiv>
        <p><ChannelSpan>Channel name:</ChannelSpan> {channel.title}</p>
        <p><ChannelSpan>Channel ID:</ChannelSpan> {channel.id}</p>
      </ChannelDiv>
      <IconButton
        style={{ marginLeft: 'auto' }}
        onClick={() => onRemoveClick(channel.id)}
        aria-label="delete"
        color="error"
        variant="outlined"
      >
        <DeleteIcon />
      </IconButton>
    </FlexChannelDiv>
  );
}

export default ChannelBlock;
