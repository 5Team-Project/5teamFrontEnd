import styled, { keyframes } from 'styled-components';

const ListCardSkeleton = () => {
  return (
    <ListCardSkeletonWrap>
      <TitleSkeleton>
        <TitleTextSkeleton />
        <AvatarWrapper>
          <AvatarSkeleton />
          <AvatarSkeleton />
          <AvatarSkeleton />
        </AvatarWrapper>
      </TitleSkeleton>
      <ContentSkeleton />
      <ReactionSkeleton>
        <ReactionItemSkeleton />
        <ReactionItemSkeleton />
        <ReactionItemSkeleton />
      </ReactionSkeleton>
    </ListCardSkeletonWrap>
  );
};

export default ListCardSkeleton;

const skeletonAnimation = keyframes`
  0% {
    background-color: #f0f0f0;
  }
  100% {
    background-color: #e0e0e0;
  }
`;

const ListCardSkeletonWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 275px;
  height: 260px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  padding: 20px;
`;

const TitleSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`;

const TitleTextSkeleton = styled.div`
  width: 80px;
  height: 24px;
  border-radius: 4px;
  animation: ${skeletonAnimation} 1.5s infinite;
  margin-right: 8px;
  margin-bottom: 20px;
`;
const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const AvatarSkeleton = styled.div`
  position: relative;
  margin-left: -7px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  animation: ${skeletonAnimation} 1.5s infinite;
`;

const ContentSkeleton = styled.div`
  width: 100%;
  height: 120px;
  border-radius: 8px;
  animation: ${skeletonAnimation} 1.5s infinite;

  margin-bottom: 20px;
`;

const ReactionSkeleton = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ReactionItemSkeleton = styled.div`
  width: 50px;
  height: 30px;
  border-radius: 15px;
  animation: ${skeletonAnimation} 1.5s infinite;
  margin: 0 8px;
`;
