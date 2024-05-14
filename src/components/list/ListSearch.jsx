import { useState } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';

import icSearch from '../../assets/icons/IconSearch.svg';

const ListSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get('name');

  const [searchValue, setSearchValue] = useState(name || '');

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchValue.trim() === '') {
      setSearchParams({});
    } else {
      setSearchParams({ name: searchValue.trim() });
    }
  };

  return (
    <SearchContainer>
      <SearchFrom onSubmit={handleSubmit}>
        <IconSearch src={icSearch} alt="검색" />
        <SearchInput
          type="text"
          maxLength={15}
          placeholder="누구의 롤링페이퍼를 찾고 싶나요?"
          value={searchValue}
          onChange={handleChange}
        />
        <SearchButton type="submit">검색</SearchButton>
      </SearchFrom>
    </SearchContainer>
  );
};

export default ListSearch;

const SearchContainer = styled.section`
  margin-top: 20px;
  margin: 20px auto 0;
  max-width: 600px;

  @media ${({ theme }) => theme.device.Tablet} {
    padding: 0px;
  }
`;

const SearchFrom = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;

  position: relative;

  width: 100%;
`;

const IconSearch = styled.img`
  position: absolute;
  left: 20px;
`;

const SearchInput = styled.input`
  flex-grow: 4;

  width: 100%;
  height: 60px;

  padding: 5px 20px 5px 60px;
  outline: 2px solid ${({ theme }) => theme.colors.BLACK}1a;
  border-radius: 16px;

  font-size: ${({ theme }) => theme.fontsize.S_TITLE};
  font-weight: ${({ theme }) => theme.fontweight.REGULAR};

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.PURPLE};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY};
  }

  @media ${({ theme }) => theme.device.Mobile} {
    &::placeholder {
      color: transparent;
    }
  }
`;

const SearchButton = styled.button`
  flex-grow: 2;

  width: 130px;
  height: 60px;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.PURPLE};
  border: none;
  /* border-radius: 0 16px 16px 0; */
  border-radius: 16px;

  color: ${({ theme }) => theme.colors.WHITE};
  font-size: ${({ theme }) => theme.fontsize.M_TITLE};
  font-weight: ${({ theme }) => theme.fontweight.REGULAR};

  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.PURPLE_D};
  }
`;
