import { Box, Flex, Image, LinkBox, LinkOverlay } from "@chakra-ui/react";
import * as React from "react";
import Navbar from "./Navbar";

interface IHeaderProps {
  menuItems: any[];
  companyLogoUrl: string;
}

const Header: React.FunctionComponent<IHeaderProps> = ({
  menuItems,
  companyLogoUrl,
}) => {
  return (
    <Box>
      <Flex justify="space-between" w="100%" mx="auto" h="100%" align="center">
        <LinkBox as="image">
          <LinkOverlay href="/">
            <Image
              src={companyLogoUrl}
              alt="Betach Logo"
              w="300px"
              h="100px"
              objectFit="contain"
              mx={8}
            />
          </LinkOverlay>
        </LinkBox>

        <Navbar menuItems={menuItems} />
      </Flex>
    </Box>
  );
};

export default Header;
