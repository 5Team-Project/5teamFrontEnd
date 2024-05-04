export const Theme = {
  colors: {
    PURPLE: '#DCB9FF',
    PURPLE_D: '#AB57FF',
    PURPLE_DD: '#6E0AD1',
    ORANGE: '#FFC583',
    BLUE: '#7CD2FF',
    GREEN: '#9BE282',
    GRAY: '#CCCCCC',
    DARKGRAY: '#484848',
    WHITE: '#FFFFFF',
    RED: '#DC3A3A',
    BLACK: '#000000',
    SURFACE: '#F6F8FF',
  },
  fontsize: {
    TITLE: '28px',
    M_TITLE: '24px',
    S_TITLE: '20px',
    LARGE_TXT: '18px',
    MEDIUM_TXT: '16px',
    SMALL_TXT: '14px',
    MINI_TXT: '12px',
  },
  fontweight: {
    BOLD: '700',
    REGULAR: '400',
  },
  device: {
    PC: `screen and (max-width: 1920px)`,
    Tablet: `screen and (max-width: 1200px)`,
    Mobile: `screen and (max-width: 768px)`,
  },
};

/*
색상
color: ${({ theme }) => theme.colors.PURPLE};
color: ${({ theme }) => theme.colors.ORANGE};
color: ${({ theme }) => theme.colors.BLUE};
color: ${({ theme }) => theme.colors.GREEN};
color: ${({ theme }) => theme.colors.GRAY};
color: ${({ theme }) => theme.colors.DARKGRAY};
color: ${({ theme }) => theme.colors.WHITE};
color: ${({ theme }) => theme.colors.RED};
color: ${({ theme }) => theme.colors.BLACK};
color: ${({ theme }) => theme.colors.SURFACE};

글자 크기
font-size: ${({ theme }) => theme.fontsize.TITLE};
font-size: ${({ theme }) => theme.fontsize.M_TITLE};
font-size: ${({ theme }) => theme.fontsize.S_TITLE};
font-size: ${({ theme }) => theme.fontsize.MEDIUM_TXT};
font-size: ${({ theme }) => theme.fontsize.SMALL_TXT};
font-size: ${({ theme }) => theme.fontsize.MINI_TXT};

글자 두께
font-weight: ${({ theme }) => theme.fontweight.BOLD};
font-weight: ${({ theme }) => theme.fontweight.REGULAR};

반응형
@media ${({theme}) => theme.device.PC} {}
@media ${({theme}) => theme.device.Tablet} {}
@media ${({theme}) => theme.device.Mobile} {}
*/
