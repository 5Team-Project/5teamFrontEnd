export const lightTheme = {
  colors: {
    PURPLE: '#ffd43b',
    PURPLE_D: '#fcc419',
    PURPLE_DD: '#fab005',
    ORANGE: '#FFC583',
    BLUE: '#7CD2FF',
    GREEN: '#9BE282',
    GRAY: '#CCCCCC',
    DARKGRAY: '#484848',
    WHITE: '#FFFFFF',
    RED: '#DC3A3A',
    BLACK: '#000000',
    YELLOW: '#fff9db',
    SURFACE: '#fff9db',
    LIME: '#c0eb75',
    LIME_D: '#94d82d',
    LIME_DD: '#74b816',
    ORANGE_D: '#d9480f',
    ACTIVE: '#f76707',
    DARK_GRAY: '#CCCCCC',
    DARK_DARKGRAY: '#484848',
    VIOLET: '#DCB9FF',
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

export const darkTheme = {
  darkModeBrightness: '70%',
  colors: {
    PURPLE: '#fcc419',
    PURPLE_D: '#F5B53B',
    PURPLE_DD: '#fab005',
    ORANGE: '#B36B2E',
    BLUE: '#2D6A7A',
    GREEN: '#3D612D',
    GRAY: '#bfbfbf',
    DARKGRAY: '#cccaca',
    WHITE: '#2b2b2b',
    RED: '#A32929',
    BLACK: '#fcfcfc',
    SURFACE: '#fff3bf',
    YELLOW: '#fab005',
    LIME_DD: '#5c940d',
    LIME_D: '#2b8a3e',
    LIME: '#087f5b',
    ORANGE_D: '#d9480f',
    ACTIVE: '#f76707',
    DARK_GRAY: '#484848',
    DARK_DARKGRAY: '#CCCCCC',
    VIOLET: '#4D2D6A',
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
    THIN: '200',
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
font-size: ${({ theme }) => theme.fontsize.LARGE_TXT};
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
