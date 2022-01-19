import { Box, ChakraProps } from "@chakra-ui/react";
import * as React from "react";

interface IAnchorSectionProps extends ChakraProps {
  sectionId: string;
}

const AnchorSection: React.FunctionComponent<IAnchorSectionProps> = ({
  sectionId,
  children,
  ...chakraProps
}) => {
  return (
    <Box as="section" {...chakraProps} id={sectionId}>
      {children}
    </Box>
  );
};

export default AnchorSection;
