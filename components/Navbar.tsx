import NextLink from "next/link";
import { Button, Flex, Heading, Link, Text } from "@chakra-ui/react";
import * as React from "react";
import MenuItemDropdown from "./NavbarItem";
import { useCurrentUser } from "../hooks/useCurrentUser";

interface INavbarProps {
  menuItems: any[];
}

const Navbar: React.FunctionComponent<INavbarProps> = ({ menuItems }) => {
  const { user, isLoading } = useCurrentUser();
  return (
    <Flex as="nav" flexDirection="column" flexGrow={2} color="white">
      <Flex
        w="100%"
        justify="flex-start"
        align="center"
        fontSize="0.8rem"
        fontWeight="semibold"
        h="60px"
        pl="14"
      >
        <NextLink
          href="https://www.pitchero.com/clubs/calgarycanucksrugby/a/junior-rugby-39207.html"
          passHref
        >
          <Link>JUNIOR RUGBY!</Link>
        </NextLink>
        <NextLink
          href="https://www.pitchero.com/clubs/calgarycanucksrugby/a/junior-rugby-39207.html"
          passHref
        >
          <Link px="8">CALGARY RUGBY UNION</Link>
        </NextLink>
        <NextLink
          href="https://www.pitchero.com/clubs/calgarycanucksrugby/a/junior-rugby-39207.html"
          passHref
        >
          <Link>SIGN UP FOR CANUCKS EMAIL</Link>
        </NextLink>
      </Flex>
      <Flex
        h="30px"
        align="center"
        justify="space-between"
        pl="14"
        pr="9.5rem"
        mb="30px"
      >
        <Heading as="h1" fontSize="1.4rem" fontWeight="bold">
          CALGARY CANUCKS RUGBY
        </Heading>
        {user ? (
          <Text as="span">Welcome back, {user.fullname}</Text>
        ) : (
          <Button
            as="a"
            href="/login"
            variant="solid"
            color="rgb(1, 78, 134)"
            borderRadius="500"
            isLoading={isLoading}
          >
            Login
          </Button>
        )}
      </Flex>
      <Flex
        justify="space-around"
        align="center"
        pl={14}
        h="60px"
        background="linear-gradient(
          125deg
          , rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 35px, rgba(0, 0, 0, 0.25) 36px, rgba(0, 0, 0, 0.25) 100%)"
        borderLeft="20px transparent"
      >
        {menuItems.map((mi) => (
          <MenuItemDropdown
            key={mi.bsi_linkurl}
            faceMenuItem={mi}
            dropdownItems={mi.bsi_NavigationMenuSubItem_NavigationMenuI}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default Navbar;
