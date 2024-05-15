import styled, { css, keyframes } from 'styled-components';
import React, { useRef, useState } from 'react';
import ArrowDown from '../assets/icons/IconArrowdown.svg';
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
    <ReactionsWrapper className="here">
      <ShowAllButton
        ref={dropdownRef}
        onClick={toggleDropdown}
        type="button"
        style={reactions.length >= 4 ? {} : { display: 'none' }}
      >
        <ArrowIcon
          src={ArrowDown}
          alt="리액션 전체 보기"
          isOpen={isOpen}
          isDarkMode={isDarkMode}
        />
      </ShowAllButton>
      {isOpen && (
        <AllReactionsBox isOpen={isOpen}>
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

const balloonAnimation = keyframes`
    0% {
      transform: scaleY(0) translateY(-60%);
      opacity: 0;
    }
    50% {
      transform: scaleY(1.03) translateY(0);
      opacity: 1;
    }
    100% {
      transform: scaleY(1) translateY(0);
      opacity: 1;
    }
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

  animation: ${({ isOpen }) =>
    isOpen
      ? css`
          ${balloonAnimation} 0.5s ease
        `
      : 'none'};

  @media ${({ theme }) => theme.device.Mobile} {
    left: -65px;
  }

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
