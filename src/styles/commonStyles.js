import styled from "styled-components";

export const ErrorMessage = styled.p`
  color: tomato;
  background-color: black;
  padding: 1rem;
`;

export const Main = styled.main`
  display: flex;
  gap: 5rem;
  flex-direction: column;
  align-items: center;
  background-color: #81b64c;
`;

export const FormElement = styled.form`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
  border-radius: 20px;
  border-bottom: 5px solid #558c44;
`;

export const FormTitle = styled.h1`
  color: white;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  background-color: #558c44;
  border-radius: 18px 18px 0 0;
  padding-block: 10px;
  margin: 0;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  padding: 1rem;
`;

export const Input = styled.input`
  font-size: 1.2rem;
  color: black;
  background-color: #fafafa;
  padding: 1rem;
  border: none;
  border-radius: 6px;
  margin-top: 0.5rem;
`;

export const DisabledInput = styled.input`
  font-size: 1rem;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  background-color: #fafafa;
`;

export const BtnBox = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const Button = styled.button`
  width: fit-content;
  color: white;
  background-color: #558c44;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

export const CheckButton = styled.button`
  width: fit-content;
  color: white;
  background-color: #558c44;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  padding: 1rem;
  cursor: pointer;
`;

export const Card = styled.div`
  width: 400px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border-bottom: 5px solid #558c44;
`;

export const Poster = styled.div`
  width: 400px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-radius: 10px;
`;

export const Page = styled.div`
  width: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border-bottom: 5px solid #558c44;
`;

export const Header = styled.h1`
  color: white;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  background-color: #558c44;
  border-radius: 10px 10px 0 0;
  padding-block: 10px;
  margin: 0;
`;

export const Avatar = styled.img`
  width: fit-content;
  height: 100px;
  border-radius: 50%;
  border: 5px solid #81b64c;
  margin: 1rem auto;
`;

export const Box = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
`;

export const Text = styled.p`
  color: black;
  padding-inline: 1rem;
  font-weight: 700;
`;

export const TextArea = styled.textarea`
  color: black;
  background-color: #fafafa;
  height: 100px;
`;

export const Select = styled.select`
  font-size: 1rem;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  background-color: #fafafa;
`;
