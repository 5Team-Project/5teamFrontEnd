import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import defaultImage from '../../assets/images/defaultimg.png';
import { getProfileImg } from '../../api/getProfileImg';

const ProfileImageComponent = ({ onImageSelect }) => {
  const [selectedImage, setSelectedImage] = useState('');
  const [imageOptions, setImageOptions] = useState([]);

  useEffect(() => {
    const fetchProfileImages = async () => {
      try {
        const response = await getProfileImg();
        setImageOptions(response.imageUrls);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfileImages();
  }, []);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    onImageSelect(imageUrl);
  };

  return (
    <ProfileContainer>
      <ProfileImageContainer>
        <ProfileImage src={selectedImage || defaultImage} alt="Profile Image" />
      </ProfileImageContainer>
      <OptionsContainer>
        <Description>프로필 이미지를 선택해주세요!</Description>
        <OptionImageContainer>
          {imageOptions.map((imageUrl) => (
            <OptionImage
              key={imageUrl.id}
              src={imageUrl}
              alt={`Option ${imageUrl.id + 1}`}
              onClick={() => handleImageClick(imageUrl)}
            />
          ))}
        </OptionImageContainer>
      </OptionsContainer>
    </ProfileContainer>
  );
};
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const Description = styled.div`
  font-family: Pretendard;
  font-size: ${({ theme }) => theme.fontsize.MEDIUM_TXT};
  font-weight: ${({ theme }) => theme.fontweight.REGULAR};
  line-height: 26px;
  letter-spacing: -0.01em;
  text-align: left;
  color: ${({ theme }) => theme.colors.BLACK};
`;

const ProfileImageContainer = styled.div`
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 50%;
  background-color: #e0e0e0;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const OptionsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 40px;

  //모바일
  @media (max-width: 767px) {
    width: 300px;
    height: 122px;
  }
`;

const OptionImageContainer = styled.div`
  display: flex;
  flex-direction: row;

  //모바일
  @media (max-width: 767px) {
    flex-wrap: wrap;
    width: 120%;
  }
`;

const OptionImage = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 50%;
  object-fit: cover;
  margin: 5px 5px;
`;

export default ProfileImageComponent;
