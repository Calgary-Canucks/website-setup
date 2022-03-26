import { Link } from "@chakra-ui/layout";
import * as React from "react";

interface INavbarItemProps {
  faceMenuItem: any;
  dropdownItems?: any[];
}

const NavbarItem: React.FunctionComponent<INavbarItemProps> = (props) => {
  return (
    <Link
      href={props.faceMenuItem.bsi_linkurl || "#"}
      mx={2}
      py={2}
      px={props.dropdownItems?.length !== 0 ? 1 : 4}
      bgColor="transparent"
      borderRadius="300px"
      fontSize="0.9rem"
      fontWeight="bold"
      color={"white"}
    >
      {props.faceMenuItem.bsi_name}
    </Link>
  );
};

export default NavbarItem;
