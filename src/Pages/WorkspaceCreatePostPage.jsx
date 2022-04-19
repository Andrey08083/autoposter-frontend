import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {
  Alert, Button, MenuItem, Select,
} from '@mui/material';

import FlexColumnDiv100 from '../Components/FlexColumnDiv100';
import ResponsiveAppBar from '../Components/ResponsiveAppBar';
import FlexColumnDiv from '../Components/FlexColumnDiv';
import {
  getTelegramChannelsByUserId,
  sendTelegramPostToSelectedChannel,
} from '../API/WorkspaceApi';
import { handleTextChange } from '../Utils/HookChangeHandlers';

function WorkspaceCreatePostPage() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const [editorValue, setEditorValue] = useState('');

  const [channels, setChannels] = useState([]);
  const [selectedChannelId, setSelectedChannelId] = useState('');

  const sizeLimit = 1000;

  useEffect(() => {
    getTelegramChannelsByUserId()
      .then(({ data }) => setChannels(data));
  }, []);

  const handleUpdate = (value, editor) => {
    const { length } = editor.getContent({ format: 'text' });
    if (length <= sizeLimit) {
      setEditorValue(value);
    }
  };

  const handleBeforeAddUndo = (evt, editor) => {
    const { length } = editor.getContent({ format: 'text' });
    if (length > sizeLimit) {
      evt.preventDefault();
    }
  };

  const handlePostSending = () => {
    if (!selectedChannelId) {
      setAlertSeverity('error');
      setAlertContent('Please select Telegram channel first');
      setShowAlert(true);
      return;
    }
    sendTelegramPostToSelectedChannel(selectedChannelId, editorValue)
      .then(() => {
        const selectedChannelName = channels
          .find((channel) => channel.id === selectedChannelId).title;

        setAlertSeverity('success');
        setAlertContent(`Your post was successfully sent to ${selectedChannelName} channel`);
        setShowAlert(true);
      })
      .catch((error) => {
        setAlertSeverity('error');
        setAlertContent(error.response.data.errors.join(', '));
        setShowAlert(true);
      });
  };

  return (
    <FlexColumnDiv100>
      <ResponsiveAppBar />
      {showAlert
        && (
        <Alert
          severity={alertSeverity}
          onClose={() => { setShowAlert(false); }}
        >{alertContent}
        </Alert>
        )}
      <FlexColumnDiv>
        <Editor
          apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
          initialValue="Write your text here..."
          value={editorValue}
          onEditorChange={handleUpdate}
          onBeforeAddUndo={handleBeforeAddUndo}
          outputFormat="html"
          init={{
            height: 500,
            width: 1000,
            menubar: false,
            selector: 'textarea',
            inline_styles: false,
            formats: {
              underline: { inline: 'u', exact: true },
            },
            entity_encoding: 'raw',
            force_br_newlines: false,
            force_p_newlines: false,
            forced_root_block: '',
            plugins: [
              'link', 'preview', 'emoticons',
              'searchreplace', 'codesample', 'wordcount',
            ],
            toolbar: 'undo redo | '
              + 'bold italic underline codesample pre link | '
              + 'emoticons | '
              + 'removeformat',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
        />
        <p>Select Telegram channel from dropdown below</p>
        <Select
          defaultValue=""
          onChange={handleTextChange(setSelectedChannelId)}
        >
          {channels.map((channel) => <MenuItem value={channel.id}>{channel.title}</MenuItem>)}
        </Select>
        <Button onClick={handlePostSending}>Post in selected channel</Button>
      </FlexColumnDiv>
    </FlexColumnDiv100>
  );
}

export default WorkspaceCreatePostPage;
