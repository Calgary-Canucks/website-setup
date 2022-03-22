import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  Heading,
} from "@chakra-ui/react";
import * as React from "react";

interface IErrorComponentProps {
  status: number;
  title: string;
  message: string;
}

const ErrorComponent: React.FunctionComponent<IErrorComponentProps> = ({
  status,
  title,
  message,
}) => {
  return (
    <Center
      h="100vh"
      w="100%"
      bg="linear-gradient(to top right, #FED7D7 0%, #E53E3E 100%)"
    >
      <Center
        w="50%"
        h="80vh"
        bg="white"
        borderRadius="10px"
        p="2rem"
        flexDirection="column"
        style={{ gap: "70px" }}
      >
        <Heading fontSize="4rem">ERROR {status}</Heading>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>{title}</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
        <Button
          as="a"
          href="/login"
          colorScheme="teal"
          fontSize="1.5rem"
          p="2rem"
        >
          Login
        </Button>
      </Center>
    </Center>
  );
};

export default ErrorComponent;
