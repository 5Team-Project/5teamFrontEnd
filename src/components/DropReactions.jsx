import styled from 'styled-components';
import { Theme } from '../styles/Theme';
import React, { useEffect, useState } from 'react';
import ArrowDown from '../assets/icons/Ic_Arrow_down.svg';
import { getData } from '../api/getData';

const DropReactions = () => {
  const [reactions, setReactions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleLoadReactions = async () => {
      const queryData = '3-1/recipients/2629/reactions/';
      try {
        const res = await getData(queryData);
        if (res && res.results) {
          setReactions(res.results);
        }
      } catch (e) {
        console.error(e);
      }
    };
    handleLoadReactions();
  }, []);

  return (
    <ReactionsWrapper>
      <ShowAllButton onClick={toggleDropdown}>
        <ArrowIcon src={ArrowDown} alt="리액션 전체 보기" isOpen={isOpen} />
      </ShowAllButton>
      {isOpen && (
        <AllReactionsBox>
          {reactions.map((emoji) => {
            return (
              <Reactions key={emoji.id}>
                {emoji.emoji} {emoji.count}
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
  transform: ${(props) =>
    props.isOpen ? 'rotate(3780deg)' : 'rotate(-3960deg)'};
  transition: transform 1s;
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
  background: rgba(0, 0, 0, 0.54);
  color: ${({ theme }) => theme.colors.WHITE};
  font-size: ${({ theme }) => theme.fontsize.MEDIUM};
  font-weight: ${({ theme }) => theme.fontweight.REGULAR};
`;
export default DropReactions;
