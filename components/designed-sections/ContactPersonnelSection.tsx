import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import * as React from "react";
import {
  DesignedSection,
  DynamicsOrganizationContact,
  DynamicsSportsTeam,
} from "../../utils/types";
import AnchorSection from "../AnchorSection";

interface IContactPersonnelSectionProps extends DesignedSection {
  dynamicsOrganizationContacts: DynamicsOrganizationContact[];
  dynamicsTeamContacts: DynamicsSportsTeam["bsi_contacts"];
}

const ContactPersonnelSection: React.FunctionComponent<
  IContactPersonnelSectionProps
> = ({
  dynamicsPageSection,
  dynamicsOrganizationContacts,
  dynamicsTeamContacts,
}) => {
  if (!dynamicsPageSection) {
    return null;
  }
  if (dynamicsTeamContacts) {
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
            px={4}
            py={{ base: 8, md: 2 }}
            w={{ base: "100%", md: "65%" }}
            style={{ gap: "20px" }}
          >
            <Text
              as="a"
              fontSize="1.3rem"
              color="rgb(1, 78, 134)"
              fontWeight="bold"
              textAlign={{ base: "start", md: "start" }}
            >
              CONTACT
            </Text>

            <Text
              as="p"
              fontSize="1.8rem"
              fontWeight="bold"
              textAlign={{ base: "start", md: "start" }}
            >
              OFFICIALS
            </Text>
          </Flex>
          <Flex w="100%" flexWrap="wrap" alignItems="center">
            {dynamicsTeamContacts.map((c) => (
              <Flex
                key={c.bsi_sportsteammemberid}
                w={{
                  base: "100%",
                  md: "calc(50% - 15px)",
                  lg: "calc(33.3% - 15px)",
                }}
                m="7.5px"
                alignItems="center"
                justifyContent="flex-start"
                bgColor="white"
                borderRadius="5px"
                boxShadow="rgb(0 0 0 / 5%) 0px 5px 10px 0px"
                p={4}
              >
                <Avatar name={c.bsi_name} size="lg" />
                <Flex flexDirection="column" ml={4} flexGrow={1}>
                  <Text color="rgb(118,118,118)" fontSize="0.9rem">
                    {c.bsi_SportsTeamMember_bsi_SportsTeamRoles_[0].bsi_name}
                  </Text>
                  <Text fontSize="1.1rem">{c.bsi_name}</Text>
                  <Text
                    fontSize="0.9rem"
                    alignSelf="flex-end"
                    color="rgb(1, 78, 134)"
                    as="a"
                    href={`mailto:${c.bsi_email}`}
                  >
                    EMAIL
                  </Text>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Box>
      </AnchorSection>
    );
  }
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
          px={4}
          py={{ base: 8, md: 2 }}
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

        <Flex w="100%" flexWrap="wrap" alignItems="center">
          {dynamicsOrganizationContacts.map((c) => (
            <Flex
              key={c.bsi_organizationcontactid}
              w={{
                base: "100%",
                md: "calc(50% - 15px)",
                lg: "calc(33.3% - 15px)",
              }}
              m="7.5px"
              alignItems="center"
              justifyContent="flex-start"
              bgColor="white"
              borderRadius="5px"
              boxShadow="rgb(0 0 0 / 5%) 0px 5px 10px 0px"
              p={4}
            >
              <Avatar name={c.bsi_name} size="lg" />
              <Flex flexDirection="column" ml={4} flexGrow={1}>
                <Text color="rgb(118,118,118)" fontSize="0.9rem">
                  {c.bsi_title}
                </Text>
                <Text fontSize="1.1rem">{c.bsi_name}</Text>
                <Text
                  fontSize="0.9rem"
                  alignSelf="flex-end"
                  color="rgb(1, 78, 134)"
                  as="a"
                  href={`mailto:${c.bsi_email}`}
                >
                  EMAIL
                </Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Box>
    </AnchorSection>
  );
};

export default ContactPersonnelSection;
