import { ReactChild } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
`;
const Container = styled.div`
  position: fixed;
  border: 0px solid black;
  margin: 0 50px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  box-sizing: border-box;
  background: var(--top-background);
  padding: 0 5px;
`;

type ChildWrapperProps = {
  maxWidth?: string;
};
const ChildWrapperMaxWidth = ({maxWidth}: ChildWrapperProps) => maxWidth ? `max-width: ${maxWidth}px;` : `max-width: 400px;`
const ChildWrapper = styled.div`
  border-radius: 10px;
  height: 100%;
  margin: 5px 0;
  background: var(--top-background);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: max-width 0.5s linear;
  ${ChildWrapperMaxWidth}
  overflow: hidden;
  z-index: 3;
`;

const calculateHeightWhenRotated45Deg = (targetHeight: number) => {
  const result = targetHeight / Math.SQRT2;
  return result;
};

const imageHeight = calculateHeightWhenRotated45Deg(80);
const ProfileImageLeftContainer = styled.div`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: -40px;
  height: 80px;
  width: 80px;
  display: flex;
  align-items: center;
`;
const ProfileImageRightContainer = styled.div`
  overflow: hidden;
  position: absolute;
  top: 0;
  right: -40px;
  height: 80px;
  width: 81px; /* 1 more to fight css rounding down the rotated height */
  display: flex;
  align-items: center;
`;
const ProfileImageBodyContainer = styled.div`
  overflow: hidden;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ProfileImageLeft = styled.img`
  border-radius: 10px;
  height: ${calculateHeightWhenRotated45Deg(80)}px;
  transform: translateX(12px) rotate(45deg) scale(1.12);
`;
const ProfileImageRight = styled.img`
  border-radius: 10px;
  height: ${imageHeight}px;
  transform: translateX(12px) rotate(45deg) scale(1.12);
`;
const ProfileImageBody = styled.img`
  transform: translateY(-50%) rotate(45deg) scale(-2);
  filter: blur(1px);
  opacity: 0.5;
`;

type AppContainerProps = {
  avatarUrl?: string;
  children: ReactChild;
  maxWidth?: string;
};
export const AppContainer = ({ avatarUrl, children, maxWidth }: AppContainerProps) => {
  return (
    <Wrapper>
      <Container>
        <ProfileImageBodyContainer>
          <ProfileImageBody src={avatarUrl} />
        </ProfileImageBodyContainer>
        <ProfileImageLeftContainer>
          <ProfileImageLeft src={avatarUrl} />
        </ProfileImageLeftContainer>
        <ProfileImageRightContainer>
          <ProfileImageRight src={avatarUrl} />
        </ProfileImageRightContainer>
        <ChildWrapper maxWidth={maxWidth}>{children}</ChildWrapper>
      </Container>
    </Wrapper>
  );
};
