import { Box, Flex, Text, Link, Icon, Button, Image } from "@chakra-ui/react";
import * as React from "react";
import NextLink from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

interface IFooterProps {
  menuItems: any[];
  companyLogoUrl: string;
}

const Footer: React.FunctionComponent<IFooterProps> = ({
  menuItems,
  companyLogoUrl,
}) => {
  return (
    <Box>
      <Box w="100%" bg="rgb(1, 78, 134)">
        <Flex w="90%" mx="auto" py="8vh" justify="space-between">
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
          <Flex flexWrap="wrap">
            {menuItems.map((m) => (
              <Link
                fontSize="1.1rem"
                color="white"
                width="50%"
                key={m.bsi_navigationmenuitemid}
                href={m.bsi_linkurl}
              >
                {m.bsi_name}
              </Link>
            ))}
          </Flex>

          <Flex
            w="30%"
            h="100%"
            justifyContent="flex-start"
            flexDirection="column"
            style={{ gap: "20px" }}
          >
            <Flex w="60%" justifyContent="space-between" color="whiteAlpha.900">
              <Icon fontSize="1.2rem" as={FaFacebookF} />
              <Icon fontSize="1.2rem" as={FaTwitter} />
              <Icon fontSize="1.2rem" as={FaYoutube} />
              <Icon fontSize="1.2rem" as={FaLinkedinIn} />
            </Flex>
            <Text as="p" color="whiteAlpha.800">
              Sign up for our newsletter to get the latest updates on news &
              events!
            </Text>

            <Button as="a" href="#" colorScheme="whiteAlpha">
              SIGN UP
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
    </Box>
  );
};

export default Footer;
