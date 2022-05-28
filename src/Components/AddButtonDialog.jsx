import React, { useState } from 'react';
import { Button, Dialog, TextField } from '@mui/material';
import { handleTextChange } from '../Utils/HookChangeHandlers';

function AddButtonDialog({ open, onClose, onAdd }) {
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  return (
    <Dialog open={open} onClose={onClose}>
      <TextField label="Text" value={text} onChange={handleTextChange(setText)} />
      <TextField label="URL" value={url} onChange={handleTextChange(setUrl)} />

      <Button
        onClick={() => {
          setText('');
          setUrl('');
          onClose();
        }}
      >
        Cancel
      </Button>

      <Button onClick={() => {
        onAdd({ text, url });
        setText('');
        setUrl('');
        onClose();
      }}
      >
        Add
      </Button>
    </Dialog>
  );
}

export default AddButtonDialog;
