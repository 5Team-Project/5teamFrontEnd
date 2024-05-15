import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import defaultImage from '../../assets/images/defaultimg.png';
import { getProfileImg, getProfileImgs } from '../../api/getProfileImg';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../utils/firebase';
import { ProfileImageSkeleton, OptionImageSkeleton } from './Skeleton';

const ProfileImageComponent = ({ onImageSelect }) => {
  const [selectedImage, setSelectedImage] = useState(defaultImage);
  const [imageOptions, setImageOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const profileImageRef = useRef(null);
  const optionImagesRef = useRef([]);

  useEffect(() => {
    const fetchProfileImages = async () => {
      try {
        setIsLoading(true);
        const response = await getProfileImgs();
        setImageOptions(response.imageUrls);
        setIsLoading(false);

        if (profileImageRef.current) {
          profileImageRef.current.src = selectedImage;
        }
        optionImagesRef.current.forEach((ref, index) => {
          ref.src = imageOptions[index];
        });
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchProfileImages();
  }, []);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    onImageSelect(imageUrl);
  };

  const handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const storageRef = ref(storage, `profile_images/${imageFile.name}`);
      uploadBytes(storageRef, imageFile)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => {
              setSelectedImage(url);
              onImageSelect(url);
            })
            .catch((error) => {
              console.error('Download URL을 가져오는 중 에러 발생:', error);
            });
        })
        .catch((error) => {
          console.error('파일 업로드 중 에러 발생:', error);
        });
    }
  };

  return (
    <ProfileContainer>
      <ProfileImageContainer>
        {isLoading ? (
          <ProfileImageSkeleton />
        ) : (
          <ProfileImage
            ref={profileImageRef}
            src={selectedImage}
            alt="Profile Image"
            onClick={() => document.getElementById('fileInput').click()}
          />
        )}
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </ProfileImageContainer>
      <OptionsContainer>
        <Description>프로필 이미지를 선택해주세요!</Description>
        <OptionImageContainer>
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <OptionImageSkeleton key={index} />
              ))
            : imageOptions.map((imageUrl, index) => (
                <OptionImage
                  key={index}
                  ref={(el) => (optionImagesRef.current[index] = el)}
                  src={imageUrl}
                  alt={`Option ${index + 1}`}
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
  min-width: 200px;
  font-size: ${({ theme }) => theme.fontsize.MEDIUM_TXT};
  font-weight: ${({ theme }) => theme.fontweight.REGULAR};
  line-height: 26px;
  letter-spacing: -0.01em;
  text-align: left;
  color: ${({ theme }) => theme.colors.BLACK};
`;

const ProfileImageContainer = styled.div`
  min-width: 80px;
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
  cursor: pointer;
`;

const OptionsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 30px;

  //모바일
  @media (max-width: 767px) {
    width: 300px;
    height: 122px;
  }
`;

const OptionImageContainer = styled.div`
  min-width: 230px;
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
  @media (max-width: 767px) {
    // 모바일 화면 크기에서
    margin: 5px 5px; // 가로 여백 조정
  }
`;

export default ProfileImageComponent;
