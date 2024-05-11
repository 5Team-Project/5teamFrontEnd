import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../../utils/firebase';
import { FaPlus } from 'react-icons/fa';

const BackgroundImageSelector = ({ onImageSelect }) => {
  const [selectedImage, setSelectedImage] = useState('');
  const [imageOptions, setImageOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    const fetchBackgroundImages = async () => {
      try {
        setIsLoading(true);
        const listRef = ref(storage, 'background_images/');
        const response = await listAll(listRef);
        const imageUrls = await Promise.all(
          response.items.map((itemRef) => getDownloadURL(itemRef)),
        );
        setImageOptions(imageUrls);
        setSelectedImage(imageUrls[0]);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchBackgroundImages();
  }, []);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    onImageSelect(imageUrl);
    setPreviewImage(null);
  };

  const handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const storageRef = ref(storage, `background/${imageFile.name}`);
      uploadBytes(storageRef, imageFile)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => {
              setSelectedImage(url);
              onImageSelect(url);
              setPreviewImage(null);
              setUploadedImage(url);
              setImageOptions([...imageOptions, url]);
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

  const handlePreviewImage = (e) => {
    e.prr;

    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setSelectedImage('');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <SelectImageWrapper>
      <FileInputWrapper>
        <FileInput
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handlePreviewImage}
          onClick={(e) => (e.target.value = null)}
        />
        <FileInputLabel htmlFor="fileInput">
          {previewImage ? (
            <PreviewImageContainer>
              <PreviewImage
                src={previewImage}
                alt="Preview"
                onClick={handleImageUpload}
              />
            </PreviewImageContainer>
          ) : (
            <>
              <PlusIcon />
              <span>이미지 등록</span>
            </>
          )}
        </FileInputLabel>
      </FileInputWrapper>
      {imageOptions.map((imageUrl) => (
        <BackgroundImages
          key={imageUrl}
          src={imageUrl}
          alt="BackGround"
          selected={selectedImage === imageUrl}
          onClick={() => handleImageClick(imageUrl)}
          isUploaded={uploadedImage === imageUrl}
        />
      ))}
    </SelectImageWrapper>
  );
};

const SelectImageWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 15px;

  //모바일
  @media (max-width: 767px) {
    flex-wrap: wrap;
    padding-left: 15px;
  }
`;

const FileInputWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 168px;
  height: 168px;
  cursor: pointer;
  background-color: #f0f0f0;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const PlusIcon = styled(FaPlus)`
  margin-right: 8px;
`;

const BackgroundImages = styled.div`
  width: 168px;
  height: 168px;
  border-radius: 8px;
  background-image: url(${({ src }) => src});
  background-size: cover;
  cursor: pointer;
  border: ${({ selected }) => (selected ? '2px solid #DCB9FF' : 'none')};
  position: relative;
  ${({ selected, isUploaded }) =>
    selected &&
    !isUploaded &&
    css`
      &::after {
        content: '✓';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 40px;
        font-weight: 700;
        color: white;
      }
    `}
`;

const PreviewImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 8px;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default BackgroundImageSelector;
