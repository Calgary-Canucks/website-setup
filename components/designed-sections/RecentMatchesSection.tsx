import {
  Badge,
  Box,
  Flex,
  Heading,
  Image,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { DynamicsMatch, DynamicsPageSection } from "../../utils/types";
import AnchorSection from "../AnchorSection";
import winningteam from "../../public/winningteam.svg";
import losingteam from "../../public/losingteam.svg";

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
    >
      <Box bgColor="rgb(241,241,241)" pb={24}>
        <Heading
          as="h2"
          width="90%"
          mx="auto"
          fontSize="1rem"
          pt={16}
          pb={2}
          color={dynamicsPageSection.bsi_mainheadingtextcolor || "inherit"}
        >
          {dynamicsPageSection.bsi_mainheading}
        </Heading>
        <Heading
          as="h3"
          width="90%"
          mx="auto"
          pb={16}
          color={dynamicsPageSection.bsi_subheadingtextcolor || "inherit"}
        >
          {dynamicsPageSection.bsi_subheading}
        </Heading>
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          space={4}
          align="stretch"
          w="90%"
          mx="auto"
          bgColor="white"
        >
          {dynamicsMatches.map((m) => (
            <Flex
              key={m.bsi_matchid}
              direction="column"
              align="stretch"
              p={6}
              style={{ gap: "20px" }}
            >
              <Text as="span">
                {new Date(m.bsi_matchtime).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                {new Date(m.bsi_matchtime).toLocaleTimeString("en-US")}
              </Text>
              <Flex direction="column">
                <Flex justify="space-around" align="flex-start">
                  <Text
                    as="span"
                    fontSize="1.1rem"
                    fontWeight="bold"
                    w="300px"
                    textAlign="center"
                  >
                    {m.bsi_TeamOne.bsi_name}
                  </Text>
                  <Flex
                    direction="column"
                    align="center"
                    style={{ gap: "20px" }}
                  >
                    <Badge
                      colorScheme={
                        m.bsi_teamonescore > m.bsi_teamtwoscore
                          ? "green"
                          : "red"
                      }
                      fontSize="1.2rem"
                    >
                      {m.bsi_teamonescore} - {m.bsi_teamtwoscore}
                    </Badge>
                    <Text as="span">League</Text>
                    <Text as="span">{m.bsi_Venue.bsi_name}</Text>
                  </Flex>

                  <Text
                    as="span"
                    fontSize="1.1rem"
                    fontWeight="bold"
                    w="300px"
                    textAlign="center"
                  >
                    {m.bsi_TeamTwo.bsi_name}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          ))}
        </VStack>
      </Box>
    </AnchorSection>
  );
};

export default RecentMatchesSection;
