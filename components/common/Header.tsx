import { Box, Flex, Image, Link, LinkBox, LinkOverlay } from "@chakra-ui/react";
import * as React from "react";
import { CurrentUser } from "../../types/authentication";
import Navbar from "./Navbar";

interface IHeaderProps {
  menuItems: any[];
  companyLogoUrl: string;
  user?: CurrentUser;
}

const Header: React.FunctionComponent<IHeaderProps> = ({
  menuItems,
  companyLogoUrl,
  user,
}) => {
  return (
    <Box>
      <Flex
        justify="space-between"
        w="100%"
        mx="auto"
        h="100%"
        align="center"
        bgColor="rgb(1, 78, 134)"
      >
        <Link href="/">
          <Image
            src={companyLogoUrl}
            alt="Betach Logo"
            w="300px"
            h="100px"
            objectFit="contain"
            mx={8}
          />
        </Link>

        <Navbar menuItems={menuItems} />
      </Flex>
    </Box>
  );
};

export default Header;
