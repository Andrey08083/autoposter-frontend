import React, { useState } from 'react';
import { Button, Dialog, TextField } from '@mui/material';
import { handleTextChange } from '../Utils/HookChangeHandlers';
import DialogDiv from './DialogDiv';

function AddButtonDialog({ open, onClose, onAdd }) {
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogDiv>
        <TextField label="Text" value={text} onChange={handleTextChange(setText)} />
        <TextField label="URL" value={url} onChange={handleTextChange(setUrl)} />

        <Button onClick={() => {
          onAdd({ text, url });
          setText('');
          setUrl('');
          onClose();
        }}
        >
          Add
        </Button>

        <Button
          onClick={() => {
            setText('');
            setUrl('');
            onClose();
          }}
        >
          Cancel
        </Button>

      </DialogDiv>
    </Dialog>
  );
}

export default AddButtonDialog;
