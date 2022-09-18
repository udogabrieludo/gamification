import styled from "styled-components/macro";

export const Container = styled.div`
  background-image: url("/gulder.png");
  min-height: 100vh;
  background-repeat: no-repeat;
  background-position: top center;
  background-color: var(--humber-primary);
  background-size: cover;
`;

export const Wrapper = styled.div`
  width: 90%;
  padding-bottom: 50px;
  min-height: 100vh;
  margin: 50px auto;
`;

export const Scrambleheader = styled.div``;

export const SelectedBox = styled.div`
  border: 2px solid var(--humber-black);
  background: transparent;
  width: 60%;
  display: flex;
  justify-content: center;
  margin: auto;
  align-items: center;
  border-radius: 40px;
  padding: 10px;

  @media (max-width: 666px) {
    width: 100%;
  }
`;
export const Rowwrapper = styled.div`
  justify-content: ${(props) =>
    props.justify ? props.justify : "center!important"};
  margin: 0;
  display: flex;
  align-items: center;

  .scramble_title {
    font-size: 24px;
    color: var(--humber-light);
    font-weight: bold;
  }
  button {
    background: var(--humber-button-color);
    border: none;
    outline: none;
    cursor: pointer;
    color: var(--humber-light);
    font-weight: bold;
    text-transform: capitalize;
    border-radius: 6px;
    font-size: 1rem;
    margin: 3px;
    height: 45px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
  }
  button:nth-child(2) {
    background: none;
    color: var(--humber-black);
    border: 2px solid var(--humber-black);
    border-radius: 50px;
  }
`;

export const Letterbox = styled.div`
  position: relative;
  box-shadow: inlet 0px 0px 9px var(--humber-primary);
  background: radial-gradient(
    76.04% 76.04% at 42.16% 75%,
    #fbad03 28.13%,
    #889b00 99.97%
  );
  border: 3px solid var(--humber-light);
  width: ${({ width }) => (width ? width : "70px")};
  height: ${({ height }) => (height ? height : "67px")};
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin: 0 0.3rem 2rem 0;
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  @media (max-width:777px){
    width: 50px;
    height: 50px;
    margin: 0 0.1rem  0.5rem  0;

  }

  span {
    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 2rem;
    line-height: 43px;
    color: #ffffff;
    opacity: 0.8;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    @media (max-width: 600px){
      font-size: 1.5rem;

    }
  }
`;
export const QuestionBox = styled.div`
  background: var(--humber-dark);

  box-shadow: 0px 0px 85px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  width: 100%;
  text-align: center;
  margin: 30px auto 50px auto;
  padding: 30px 0;
  &::after {
    height: "240px";
    position: absolute;
  }
  img {
    width: 60px;
  }
  input {
    border: 2px solid var(--humber-black);
    background: transparent;
    width: 50%;
    outline: none;
    font-weight: bold;

    font-size: 18px;
    text-align: center;
    padding: 10px;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 30px;
    height: 71px;

    @media (max-width: 991px) {
      width: 90%;
    }
  }
`;
