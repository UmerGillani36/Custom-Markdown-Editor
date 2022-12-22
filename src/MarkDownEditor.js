/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/destructuring-assignment */
import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
// import FormatSizeIcon from '@mui/icons-material/FormatSize';
import classes from './MarkDownEditor.module.css';

function EditButton(props) {
  return (
    <IconButton
      key={props.cmd}
      style={{
        color: props.selectedTag.includes(props.cmd) && 'black',
        borderRadius: '10px',
        marginBottom: '20px',
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        let arr = [...props.selectedTag];

        if (arr.includes(props.cmd)) {
          arr = arr.filter((a) => a !== props.cmd);
        } else {
          arr.push(props.cmd);
        }
        document.execCommand(props.cmd, false, props.arg);
        props.setSelectedTag([...arr]);
      }}
    >
      {props.icon}
    </IconButton>
  );
}

function MarkDownEditor(props) {
  const [value, setValue] = useState({
    html: ' ',
    editable: true,
  });
  const [selectedTag, setSelectedTag] = useState([]);
  const handleChange = (evt) => {
    setValue({ html: evt.target.value });
    props.onChange({ html: evt.target.value });
  };

  useEffect(() => {
    if (props.desc) {
      setValue(props.desc);
    }
  }, [props.desc]);

  return (
    <div className={classes.MainContainer} style={props.readable ? { height: '300px', paddingRight: 0 } : {}}>
      <ContentEditable
        className={classes.editable}
        tagName="pre"
        html={value.html}
        disabled={props.disable}
        onChange={handleChange}
        style={props.readable ? { height: '300px', overflow: 'auto' } : {}}
      />
      {!props.disable
      && (
        props.iconDisable && (
        <div className={classes.ActionContainer}>
          <EditButton cmd="bold" setSelectedTag={setSelectedTag} selectedTag={selectedTag} icon={<FormatBoldIcon style={{ fontSize: '20px' }} />} />
          <EditButton cmd="italic" setSelectedTag={setSelectedTag} selectedTag={selectedTag} icon={<FormatItalicIcon style={{ fontSize: '20px' }} />} />
          <EditButton cmd="underline" setSelectedTag={setSelectedTag} selectedTag={selectedTag} icon={<FormatUnderlinedIcon style={{ fontSize: '20px' }} />} />
          <EditButton cmd="strikethrough" setSelectedTag={setSelectedTag} selectedTag={selectedTag} icon={<StrikethroughSIcon style={{ fontSize: '20px' }} />} />
        </div>
        )
      )}
    </div>
  );
}

export default MarkDownEditor;
