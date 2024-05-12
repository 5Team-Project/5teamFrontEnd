import { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

import icSearch from '../../assets/icons/IconSearch.svg';
import queryString from 'query-string';

const ListSearch = ({ onSearch }) => {
  const location = useLocation();
  const { search } = location;
  const { name } = queryString.parse(location.search);

  const [searchValue, setSearchValue] = useState(name);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchValue.trim() === '') {
      navigate('/list');
    } else {
      onSearch(searchValue.trim());
    }
  };

  return (
    <SearchContainer>
      <SearchFrom onSubmit={handleSubmit}>
        <IconSearch src={icSearch} />
        <SearchInput
          type="text"
          maxLength={20}
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
  padding: 0 30px;
  width: 100%;
`;

const SearchFrom = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  width: 100%;
`;

const IconSearch = styled.img`
  position: absolute;
  left: 10px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 60px;

  padding: 5px 80px 5px 40px;
  border: 1px solid ${({ theme }) => theme.colors.BLACK}1a;
  border-radius: 16px;

  font-size: ${({ theme }) => theme.fontsize.S_TITLE};
  font-weight: ${({ theme }) => theme.fontweight.BOLD};
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
  position: absolute;
  right: -2px;

  width: 80px;
  height: 60px;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.PURPLE};
  border: none;
  border-radius: 0 16px 16px 0;

  color: ${({ theme }) => theme.colors.BLACK};
  font-size: ${({ theme }) => theme.fontsize.LARGE_TXT};
  font-weight: ${({ theme }) => theme.fontweight.BOLD};

  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.PURPLE_D};
  }
`;
