import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import * as React from "react";
import { DynamicsMatch, DynamicsPageSection } from "../../utils/types";
import AnchorSection from "../AnchorSection";

interface IRecentMatchesSectionProps {
  dynamicsPageSection: DynamicsPageSection;
  dynamicsMatches: DynamicsMatch[];
}

const RecentMatchesSection: React.FunctionComponent<
  IRecentMatchesSectionProps
> = ({ dynamicsPageSection, dynamicsMatches }) => {
  return (
    <AnchorSection
      sectionId={dynamicsPageSection.bsi_sectionid || "success-stories"}
      key={dynamicsPageSection.bsi_pagesectionid}
      backgroundColor={
        dynamicsPageSection.bsi_backgroundcolor || "rgb(241,241,241)"
      }
    >
      <Box pb={24} w="95%" mx="auto">
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

        <Flex w="100%" flexDirection="column">
          {dynamicsMatches.map((m) => (
            <Flex
              key={m.msmedia_mediaeventid}
              direction="column"
              align="stretch"
              w="100%"
              my={4}
              p={4}
              bgColor="white"
              borderRadius="5px"
              boxShadow="rgb(0 0 0 / 5%) 0px 5px 10px 0px"
            >
              <Text as="span">
                {new Date(m.bsi_starttime).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {", "}
                {new Date(m.bsi_starttime).toLocaleTimeString("en-US")}
              </Text>
              <Flex direction="column">
                <Flex
                  justify="space-around"
                  align={{ base: "center", sm: "flex-start" }}
                >
                  <Text
                    as="span"
                    fontSize="1.1rem"
                    fontWeight="bold"
                    w="300px"
                    textAlign="center"
                  >
                    {m.msmedia_HomeTeam.msmedia_name}
                  </Text>
                  <Flex
                    direction="column"
                    align="center"
                    minW="20rem"
                    style={{ gap: "20px" }}
                  >
                    <Badge
                      colorScheme={
                        m.msmedia_hometeamscore && m.msmedia_visitingteamscore
                          ? m.msmedia_hometeamscore >
                            m.msmedia_visitingteamscore
                            ? "green"
                            : "red"
                          : "blackAlpha"
                      }
                      fontSize="1.2rem"
                      boxShadow="rgb(0 0 0 / 5%) 0px 5px 10px 0px"
                    >
                      {m.msmedia_hometeamscore && m.msmedia_visitingteamscore
                        ? `${m.msmedia_hometeamscore} - ${m.msmedia_visitingteamscore}`
                        : new Date(m.bsi_starttime).toLocaleTimeString("en-US")}
                    </Badge>
                    <Text as="span">League</Text>
                    <Text as="span">{m.msmedia_PrimaryVenue.msmedia_name}</Text>
                  </Flex>

                  <Text
                    as="span"
                    fontSize="1.1rem"
                    fontWeight="bold"
                    w="300px"
                    textAlign="center"
                  >
                    {m.msmedia_VisitingTeam.msmedia_name}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Box>
    </AnchorSection>
  );
};

export default RecentMatchesSection;
