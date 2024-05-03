import React from 'react';
import Dropdown from './DropDown';

const DropRelative = ({ onChange }) => {
  const items = ['지인', '친구', '동료', '가족'];
  const defaultValue = '지인';

  return (
    <Dropdown items={items} defaultValue={defaultValue} onChange={onChange} />
  );
};

export default DropRelative;
