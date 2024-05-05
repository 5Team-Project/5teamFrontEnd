import React from 'react';
import Dropdown from './DropDown';

const DropdownFont = ({ onChange }) => {
  const items = ['Noto Sans', 'Pretendard', '나눔명조', '나눔손글씨 손편지체'];
  const defaultValue = 'Noto Sans';

  const handleChange = (selectedFont) => {
    onChange(selectedFont);
  };

  return (
    <Dropdown
      items={items}
      defaultValue={defaultValue}
      onChange={handleChange}
    />
  );
};

export default DropdownFont;
