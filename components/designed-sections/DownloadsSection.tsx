import {
  Alert,
  AlertDescription,
  AlertIcon,
  Skeleton,
  Flex,
  Text,
  VStack,
  StackDivider,
  Box,
  Link,
  Center,
  Badge,
  Icon,
} from "@chakra-ui/react";
import * as React from "react";
import { FaRegFile } from "react-icons/fa";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { fileExtensionMap } from "../../utils/constants";
import { DesignedSection } from "../../utils/types";
import AnchorSection from "../AnchorSection";

interface IDownloadsSectionProps extends DesignedSection {}

const DownloadsSection: React.FunctionComponent<IDownloadsSectionProps> = ({
  dynamicsPageSection,
}) => {
  const { user, isLoading, isError } = useCurrentUser();
  return (
    <AnchorSection
      sectionId={dynamicsPageSection.bsi_sectionid}
      key={dynamicsPageSection.bsi_pagesectionid}
      py={32}
      backgroundColor={
        dynamicsPageSection.bsi_backgroundcolor || "rgb(241,241,241)"
      }
    >
      <Box w="95%" mx="auto">
        <Flex
          flexDirection="column"
          alignItems="flex-start"
          py={{ base: 8, md: 8 }}
          w={{ base: "100%", md: "65%" }}
          style={{ gap: "20px" }}
        >
          <Text
            as="a"
            fontSize="1.3rem"
            color={
              dynamicsPageSection.bsi_overlinetextcolor || "rgb(1, 78, 134)"
            }
            fontWeight="bold"
            textAlign={{ base: "start", md: "start" }}
          >
            {dynamicsPageSection.bsi_overline}
          </Text>

          <Text
            as="p"
            fontSize="1.8rem"
            fontWeight="bold"
            textAlign={{ base: "start", md: "start" }}
            color={dynamicsPageSection.bsi_mainheadingtextcolor || "inherit"}
          >
            {dynamicsPageSection.bsi_mainheading}
          </Text>
        </Flex>
        {isLoading && <Skeleton h="30vh" />}
        {isError && dynamicsPageSection.bsi_restricted && (
          <Box w={{ base: "100%", md: "95%" }}>
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>
                This section is viewable to authenticated users only. Please log
                in to view the content.
              </AlertDescription>
            </Alert>
          </Box>
        )}
        {(!!user || !dynamicsPageSection.bsi_restricted) && (
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
          >
            {dynamicsPageSection.bsi_FileAsset_bsi_PageSection_bsi_PageSec.map(
              (fs) => (
                <Flex
                  key={fs.bsi_fileassetid}
                  justify="space-between"
                  align="center"
                  p={6}
                  borderRadius="5px"
                  boxShadow="rgb(0 0 0 / 5%) 0px 5px 10px 0px"
                  bgColor="white"
                >
                  <Link href={fs.bsi_cdnurl} target="_blank" rel="noopener">
                    {fs.bsi_file_name}
                  </Link>
                  <Center minW="10rem" justifyContent="space-between">
                    <Icon
                      fontSize="1.5rem"
                      as={
                        fileExtensionMap[fs.bsi_file_name.split(".")[1]] ||
                        FaRegFile
                      }
                    />
                    <Badge
                      w="60%"
                      textAlign="center"
                      colorScheme={fs.bsi_restricted ? "orange" : "teal"}
                    >
                      {fs.bsi_restricted ? "RESTRICTED" : "OPEN"}
                    </Badge>
                  </Center>
                </Flex>
              )
            )}
          </VStack>
        )}
      </Box>
    </AnchorSection>
  );
};

export default DownloadsSection;
