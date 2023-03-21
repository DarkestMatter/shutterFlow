import styled from "@emotion/styled";

const CenterScreen = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
`;

export const Loader: React.FC = () => {
  return (
    <>
      <CenterScreen>
        <img src="loader.svg" />
      </CenterScreen>
    </>
  );
};
