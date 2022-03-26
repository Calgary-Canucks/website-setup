import { Box, Flex, Link, Text } from "@chakra-ui/layout";
import * as React from "react";
import AnchorSection from "../../components/common/AnchorSection";
import NextLink from "next/link";
import { DynamicsPageSection } from "../../types/dynamics-365/common/types";

interface INewsSectionProps {
  dynamicsPageSection: DynamicsPageSection;
}

const NewsSection: React.FunctionComponent<INewsSectionProps> = ({
  dynamicsPageSection,
}) => {
  return (
    <AnchorSection
      sectionId={dynamicsPageSection.bsi_sectionid || "introduction"}
      key={dynamicsPageSection.bsi_sectionid}
      backgroundColor={
        dynamicsPageSection.bsi_backgroundcolor || "rgb(241,241,241)"
      }
    >
      <Box w="100%" my={24}>
        <Flex flexDirection="column" w="90%" mx="auto" align="center">
          <Flex>
            {dynamicsPageSection.bsi_AttachedComponent_bsi_PageSection_bsi &&
              dynamicsPageSection.bsi_AttachedComponent_bsi_PageSection_bsi.map(
                (dp) => (
                  <Flex
                    flexDirection="column"
                    align="center"
                    w="33%"
                    px={6}
                    key={dp.bsi_attachedcomponentid}
                  >
                    <Text
                      as="h5"
                      fontWeight="extrabold"
                      color={dp.bsi_titletextcolor || "blackAlpha.800"}
                      fontSize="2.5rem"
                    >
                      {dp.bsi_title}
                    </Text>
                    {dp.bsi_subtitle && (
                      <Text
                        as="h5"
                        fontWeight="bold"
                        color={dp.bsi_subtitletextcolor || "blackAlpha.800"}
                        fontSize="1.3rem"
                        textAlign="center"
                      >
                        {dp.bsi_subtitle}
                      </Text>
                    )}
                    <Text
                      as="p"
                      color={dp.bsi_descriptiontextcolor || "blackAlpha.800"}
                      textAlign="center"
                      my={8}
                      lineHeight="2"
                    >
                      {dp.bsi_description}
                    </Text>
                    {dp.bsi_hasctabutton && (
                      <NextLink href={dp.bsi_ctabuttonlink || "/test"} passHref>
                        <Link
                          as="span"
                          py={4}
                          px={6}
                          bg={dp.bsi_ctabuttonbgcolor || "royalblue"}
                          color={dp.bsi_ctabuttontextcolor || "whiteAlpha.800"}
                          borderRadius="300px"
                        >
                          {dp.bsi_ctabuttontext}
                        </Link>
                      </NextLink>
                    )}
                  </Flex>
                )
              )}
          </Flex>
        </Flex>
      </Box>
    </AnchorSection>
  );
};

export default NewsSection;
