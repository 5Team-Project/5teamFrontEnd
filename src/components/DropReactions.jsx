import styled from 'styled-components';
import React, { useRef, useState } from 'react';
import ArrowDown from '../assets/icons/Ic_Arrow_down.svg';
import useClickOutside from '../hooks/useClickOutside';

const DropReactions = ({ reactions, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isDarkMode = theme !== 'light';
  const dropdownRef = useRef();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });

  return (
    <ReactionsWrapper>
      <ShowAllButton ref={dropdownRef} onClick={toggleDropdown}>
        <ArrowIcon
          src={ArrowDown}
          alt="리액션 전체 보기"
          isOpen={isOpen}
          isDarkMode={isDarkMode}
        />
      </ShowAllButton>
      {isOpen && (
        <AllReactionsBox>
          {reactions.map((reaction) => {
            return (
              <Reactions key={reaction.id}>
                {reaction.emoji} {reaction.count}
              </Reactions>
            );
          })}
        </AllReactionsBox>
      )}
    </ReactionsWrapper>
  );
};

const ReactionsWrapper = styled.div`
  position: relative;
`;

const ShowAllButton = styled.button`
  width: 36px;
  height: 36px;

  @media ${({ theme }) => theme.device.Tablet} {
    margin-right: 14px;
  }
`;

const ArrowIcon = styled.img`
  width: 36px;
  height: 36px;
  transform: ${(props) => (props.isOpen ? '' : 'rotate(180deg)')};
  transition: transform 250ms;

  filter: ${({ isDarkMode, theme }) =>
    isDarkMode
      ? `invert(1) sepia(1) saturate(0) hue-rotate(0deg) brightness(${theme.darkModeBrightness})`
      : 'none'};
`;

const AllReactionsBox = styled.div`
  width: 350px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  position: absolute;
  left: -267px;
  top: 45px;

  display: grid;
  grid-template-columns: repeat(4, 65px);
  gap: 10px 8px;
`;

const Reactions = styled.div`
  width: 65px;
  height: 36px;
  border-radius: 32px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.WHITE};
  font-size: ${({ theme }) => theme.fontsize.MEDIUM};
  font-weight: ${({ theme }) => theme.fontweight.REGULAR};
  background-color: ${({ theme }) => theme.colors.DARKGRAY};
`;
export default DropReactions;
