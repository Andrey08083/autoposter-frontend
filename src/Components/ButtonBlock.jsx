import React from 'react';
import styled from '@emotion/styled';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const FlexButtonDiv = styled.div`
  min-width: 150px;
  padding: 15px;
  display: flex;
  gap: 10px;
  justify-content: stretch;
  align-items: center;
  text-align: left;
  background-color: #F1F1F1;
  border-radius: 15px;
  border: 1px solid #e7e7e7;
`;

function ButtonBlock({ button, onRemoveClick }) {
  return (
    <FlexButtonDiv>
      <span>{button.text}</span>
      <span>•</span>
      <span style={{ textDecoration: 'underline', color: '#2c81d5' }}>{button.url}</span>
      <IconButton variant="outlined" onClick={() => onRemoveClick(button.text)}><DeleteIcon color="error" /></IconButton>
    </FlexButtonDiv>
  );
}

export default ButtonBlock;
