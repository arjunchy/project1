import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Typography, styled } from "@mui/material";
import { DataContext } from "../../context/DataProvider";
import AddIcon from "@mui/icons-material/Add";
import quotes from "../../assets/quotes";

const FontStyles = styled("style")`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
`;

const Background = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-image: url("https://wallpapercave.com/wp/wp4697718.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
  filter: brightness(0.7);
`;

const Container = styled(Box)`
  position: relative;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 80vh;
`;

const UserGreetingContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 40%;
  z-index: 2;
`;

const Avatar = styled(Box)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
  background-image: ${({ avatar }) => avatar ? `url(${avatar})` : 'none'};
  background-size: cover;
  background-position: center;
  margin-bottom: 10px;
`;

const UserGreeting = styled(Typography)`
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
  color: white;
  letter-spacing: 1px;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const QuoteBox = styled(Box)`
  padding: 30px;
  text-align: center;
  margin-top: 20px;
  border-radius: 12px;
  max-width: 1000px;
  width: 100%;
  position: relative;
  top: 48%;

  @media (max-width: 600px) {
    min-width: 300px;
    max-width: 90%;
    padding: 20px;
  }

  &:active {
    transform: translateY(2%);
  }
`;

const AddNoteButton = styled(Button)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: transparent;
  color: white;
  font-weight: bold;
  font-size: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-in-out;
  backdrop-filter: blur(0px); 

  &:hover {
    backdrop-filter: blur(8px);
    background-color: whitesmoke;
    color: black;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
  }

  &:active {
    background-color: whitesmoke;
    color: black;
  }

  & .MuiSvgIcon-root {
    font-size: 3rem;
    color: inherit;
  }
`;

const Home = () => {
  const { account } = useContext(DataContext);
  const [quote, setQuote] = useState({ content: "", author: "" });

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  const handleAddClick = () => {
    window.location.href = "/create";
  };

  return (
    <>
      <FontStyles />
      <Background />
      <Container>
        <UserGreetingContainer>
          <Avatar avatar={account?.avatar} />
          <UserGreeting variant="h5">
            {account?.username ? `Hello, ${account?.username}!` : "Hello, Guest!"}
          </UserGreeting>
        </UserGreetingContainer>

        <QuoteBox>
          <Typography variant="h5" sx={{ fontStyle: "italic", fontWeight: 300, marginBottom: 2 }}>
            "{quote.content}"
          </Typography>
          <Typography variant="h6" sx={{ textAlign: "right" }}>
            — {quote.author}
          </Typography>
        </QuoteBox>
      </Container>

      <AddNoteButton onClick={handleAddClick}>
        <AddIcon />
      </AddNoteButton>
    </>
  );
};

export default Home;
