import { useState } from 'react';
import styled from 'styled-components';

const DropShare = ({ icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropDownWrapper>
      <DropDownHeader>
        <Icons src={icon} alt="공유" />
      </DropDownHeader>
      {isOpen && (
        <DropDownList>
          <DropDownItem>
            <DropDownLabel>카카오톡 공유</DropDownLabel>
          </DropDownItem>
          <DropDownItem>
            <DropDownLabel>URL 공유</DropDownLabel>
          </DropDownItem>
        </DropDownList>
      )}
    </DropDownWrapper>
  );
};

const DropDownWrapper = styled.div``;

const DropDownHeader = styled.div``;

const DropDownList = styled.div``;

const DropDownItem = styled.div``;

const DropDownLabel = styled.p``;

const Icons = styled.img`
  width: 24px;
  height: 24px;
  filter: ${({ isDarkMode, theme }) =>
    isDarkMode
      ? `invert(1) sepia(1) saturate(0) hue-rotate(0deg) brightness(${theme.darkModeBrightness})`
      : 'none'};
  @media ${({ theme }) => theme.device.Mobile} {
    width: 18px;
    height: 18px;
  }
`;

export default DropShare;
