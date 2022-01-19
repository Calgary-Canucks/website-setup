import { Flex, Text } from "@chakra-ui/react";
import * as React from "react";

interface ISubHeaderProps {
  pageTitle: string;
}

const SubHeader: React.FunctionComponent<ISubHeaderProps> = (props) => {
  return (
    <Flex w="100%" h="100px" alignItems="center" px={8} bgColor="white">
      <Text as="h2" fontSize="1.8rem" fontWeight="bold">
        {props.pageTitle}
      </Text>
    </Flex>
  );
};

export default SubHeader;
