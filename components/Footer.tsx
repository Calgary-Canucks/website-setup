import {
  Box,
  Flex,
  Text,
  Link,
  Icon,
  Button,
  Image,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";
import { dynamicsSocialPlatformMap } from "../utils/constants";
import ContactForm from "./ContactForm";

interface IFooterProps {
  menuItems: any[];
  companyLogoUrl: string;
  dynamicsSocialPlatforms: any[];
}

const Footer: React.FunctionComponent<IFooterProps> = ({
  menuItems,
  companyLogoUrl,
  dynamicsSocialPlatforms,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Box w="100%" bg="rgb(1, 78, 134)">
        <Flex
          w="90%"
          mx="auto"
          py="8vh"
          justify="space-between"
          flexDirection={{ base: "column", md: "row" }}
        >
          <Flex direction="column" align="center">
            <Image alt="Canucks Logo" src={companyLogoUrl} />
            <Text
              as="span"
              fontSize="1.5rem"
              fontWeight="bold"
              color="whiteAlpha.900"
            >
              CALGARY CANUCKS RUGBY
            </Text>
          </Flex>
          <Flex flexWrap="wrap" my={{ base: 20, md: 0 }}>
            {menuItems.map((m) => (
              <Center key={m.bsi_navigationmenuitemid} width="50%">
                <Link
                  fontSize="1.1rem"
                  color="white"
                  href={m.bsi_linkurl}
                  textAlign={{ base: "center", md: "start" }}
                >
                  {m.bsi_name}
                </Link>
              </Center>
            ))}
          </Flex>

          <Flex
            w={{ base: "100%", md: "30%" }}
            h="100%"
            justifyContent={{ base: "center", md: "flex-start" }}
            flexDirection="column"
            style={{ gap: "20px" }}
          >
            <Flex
              w="60%"
              mx="auto"
              justifyContent="space-between"
              color="whiteAlpha.900"
            >
              {dynamicsSocialPlatforms.map((p) => (
                <Link
                  key={p.bsi_socialplatformid}
                  href={p.bsi_socialplatformurl}
                  role="group"
                >
                  <Icon
                    fontSize="1.2rem"
                    as={
                      dynamicsSocialPlatformMap[
                        p.bsi_socialplatformchannel as number
                      ]
                    }
                    transition="transform 0.3s ease"
                    _groupHover={{ transform: "scale(1.5,1.5)" }}
                  />
                </Link>
              ))}
            </Flex>
            <Text
              as="p"
              color="whiteAlpha.800"
              textAlign={{ base: "center", md: "start" }}
            >
              Sign up for our newsletter to get the latest updates on news &
              events!
            </Text>

            <Button colorScheme="whiteAlpha" onClick={onOpen}>
              MESSAGE US
            </Button>
          </Flex>
        </Flex>
      </Box>
      <Flex
        bgColor="rgb(2, 51, 87)"
        height="5vh"
        p={4}
        justify="flex-end"
        align="center"
      >
        <Text as="p" color="whiteAlpha.700" fontSize="0.8rem">
          Powered by @Betach Solutions Inc. D365 CMS
        </Text>
      </Flex>
      <ContactForm
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        sentTo={{ name: "", id: "" }}
      />
    </Box>
  );
};

export default Footer;
