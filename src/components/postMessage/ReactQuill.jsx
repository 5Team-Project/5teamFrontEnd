import React from 'react';
import ReactQuill from 'react-quill';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';

const ReactQuillTemplate = (props) => {
  const { value, onChange } = props;

  const handleQuillChange = (content, delta, source, editor) => {
    onChange(editor.getHTML());
  };

  const formats = [
    'bold',
    'italic',
    'underline',
    'list',
    'bullet',
    'indent',
    'align',
    'color',
  ];

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
    ],
  };

  return (
    <StyledEditorContainer>
      <ReactQuill
        style={{
          width: '100%',
          height: '100%',
          marginTop: '15px',
        }}
        theme="snow"
        modules={modules}
        formats={formats}
        value={value || ''}
        onChange={handleQuillChange}
      />
    </StyledEditorContainer>
  );
};

const StyledEditorContainer = styled.div`
  .ql-toolbar {
    background-color: ${({ theme }) => theme.colors.GRAY};
    color: white;
  }
  height: 180px;
  min-width: 350px;
`;

export default ReactQuillTemplate;
