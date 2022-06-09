import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { Editor } from '@tinymce/tinymce-react';
import {
  Alert,
  Button,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FlexColumnDiv100 from '../Components/FlexColumnDiv100';
import ResponsiveAppBar from '../Components/ResponsiveAppBar';
import {
  getTelegramChannelsByUserId,
  sendTelegramPostToSelectedChannel,
  scheduleTelegramPostToSelectedChannel,
} from '../API/WorkspaceApi';
import { handleTextChange } from '../Utils/HookChangeHandlers';
import ButtonBlock from '../Components/ButtonBlock';
import AddButtonDialog from '../Components/AddButtonDialog';
import FlexRowDiv from '../Components/FlexRowDiv';

dayjs.extend(utc);

const MenuItemDiv = styled.div`
  display: grid;
  column-gap: 15px;
  align-items: center;
  grid-template-columns: 50px 1fr;
`;

const ChannelImg = styled.img`
  width: 100%;
  border-radius: 50%;
`;

const CreatePageDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  padding: 15px 15px;
  align-items: flex-start;
  flex-grow: 1;
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
  height: auto;
`;

const transformDateToUtcTimeStamp = (dayJsObject) => (
  dayjs(dayJsObject)
    .utc(false)
    .second(0)
    .millisecond(0)
    .valueOf());

function WorkspaceCreatePostPage() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const [editorValue, setEditorValue] = useState('');

  const [selectedChannelId, setSelectedChannelId] = useState('');
  const [channels, setChannels] = useState([]);

  const [buttons, setButtons] = useState([]);
  const [dateAndTime, setDateAndTime] = useState(dayjs());
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

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

  const handleRemoveButton = (text) => {
    setButtons(buttons.filter((button) => button.text !== text));
  };

  const handleAddButton = (button) => {
    setButtons([...buttons, button]);
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
    sendTelegramPostToSelectedChannel(selectedChannelId, editorValue, buttons)
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

  const handlePostSchedule = () => {
    if (!selectedChannelId) {
      setAlertSeverity('error');
      setAlertContent('Please select Telegram channel first');
      setShowAlert(true);
      return;
    }
    scheduleTelegramPostToSelectedChannel(
      selectedChannelId,
      editorValue,
      buttons,
      transformDateToUtcTimeStamp(dateAndTime),
    )
      .then(() => {
        const selectedChannelName = channels
          .find((channel) => channel.id === selectedChannelId).title;

        setAlertSeverity('success');
        setAlertContent(`Your post was successfully scheduled to ${selectedChannelName} channel`);
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
      <CreatePageDiv>
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
              underline: {
                inline: 'u',
                exact: true,
              },
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
        <Button onClick={handleOpenDialog}>Add Button to Telegram post</Button>
        <AddButtonDialog
          open={open}
          onClose={handleCloseDialog}
          onAdd={handleAddButton}
        />
        <FlexRowDiv>
          {buttons.map((button, index) => (
            <ButtonBlock
              id={index}
              button={button}
              onRemoveClick={handleRemoveButton}
            />
          ))}
        </FlexRowDiv>
        Select Telegram channel from dropdown:
        <Select
          defaultValue="0"
          onChange={handleTextChange(setSelectedChannelId)}
        >
          <MenuItem value={0}>Select something</MenuItem>
          {channels.map((channel) => (
            <MenuItem value={channel.id}>
              <MenuItemDiv>
                <ChannelImg src={`data:image/png;base64, ${channel.photo}`} />
                <span>{channel.title}</span>
              </MenuItemDiv>
            </MenuItem>
          ))}
        </Select>

        Set date for post:
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
        >
          <DateTimePicker
            value={dateAndTime}
            onChange={setDateAndTime}
            renderInput={(props) => <TextField {...props} />}
          />
        </LocalizationProvider>

        <FlexRowDiv style={{ alignSelf: 'center' }}>
          <Button variant="contained" onClick={handlePostSchedule}>Schedule</Button>
          <p>or</p>
          <Button variant="outlined" onClick={handlePostSending}>Post now</Button>
        </FlexRowDiv>
      </CreatePageDiv>
    </FlexColumnDiv100>
  );
}

export default WorkspaceCreatePostPage;
