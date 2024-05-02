import React, { useState } from 'react';
import styled from 'styled-components';

const DropRelative = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('지인');

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectItem = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownHeader onClick={toggleDropdown}>
        {selectedItem}
        <DropdownIcon isOpen={isOpen} />
      </DropdownHeader>
      {isOpen && (
        <DropdownList>
          <DropdownItem onClick={() => selectItem('지인')}>지인</DropdownItem>
          <DropdownItem onClick={() => selectItem('친구')}>친구</DropdownItem>
          <DropdownItem onClick={() => selectItem('동료')}>동료</DropdownItem>
          <DropdownItem onClick={() => selectItem('가족')}>가족</DropdownItem>
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownHeader = styled.div`
  display: flex;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border: 1px solid ${({ theme }) => theme.colors.GRAY};
  border-radius: 8px;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.BLACK};
  }
`;

const DropdownIcon = styled.span`
  border: solid ${({ theme }) => theme.colors.BLACK};
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: ${(props) => (props.isOpen ? 'rotate(225deg)' : 'rotate(45deg)')};
  transition: transform 0.3s;
`;

const DropdownList = styled.ul`
  width: 100%;
  list-style-type: none;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY};
  border-radius: px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  margin-top: 5px;
  z-index: 0;
`;

const DropdownItem = styled.li`
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.SURFACE};
    border-radius: 8px;
  }
`;
export default DropRelative;
