import { Box, Flex, Text } from "@chakra-ui/react";
import * as React from "react";
import { DynamicsPageSection, DynamicsSportsTeam } from "../../utils/types";
import AnchorSection from "../AnchorSection";
import Image from "next/image";

interface ITeamsInfoSectionProps {
  dynamicsPageSection: DynamicsPageSection;
  dynamicsSportsTeams: DynamicsSportsTeam[];
}

const TeamsInfoSection: React.FunctionComponent<ITeamsInfoSectionProps> = ({
  dynamicsPageSection,
  dynamicsSportsTeams,
}) => {
  if (dynamicsSportsTeams.length === 0) {
    return null;
  }
  let groups: any;
  if (dynamicsSportsTeams.length > 1) {
    groups = dynamicsSportsTeams.reduce((teams: any, item) => {
      if (!item.msmedia_Division) {
        return teams;
      }
      const group = teams[item.msmedia_Division.msmedia_name] || [];
      group.push(item);
      teams[item.msmedia_Division.msmedia_name] = group;
      return teams;
    }, {});
  }

  return (
    <AnchorSection
      sectionId={dynamicsPageSection.bsi_sectionid}
      key={dynamicsPageSection.bsi_pagesectionid}
      backgroundColor={
        dynamicsPageSection.bsi_backgroundcolor || "rgb(241,241,241)"
      }
      py={32}
    >
      {dynamicsSportsTeams.length === 1 && (
        <Box w="95%" mx="auto" py={8}>
          <Flex
            flexDirection={{ base: "column-reverse", md: "row" }}
            alignItems="center"
          >
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
                textTransform="uppercase"
              >
                {dynamicsSportsTeams[0].bsi_description}
              </Text>
              <Box
                fontSize="1rem"
                textAlign={{ base: "start", md: "start" }}
                dangerouslySetInnerHTML={{
                  __html: dynamicsSportsTeams[0].bsi_teaminfo,
                }}
              ></Box>
            </Flex>
            <Image
              src={
                dynamicsSportsTeams[0].bsi_TeamImage.bsi_cdnurl ||
                "/placeholder.jpg"
              }
              alt={dynamicsSportsTeams[0].bsi_TeamImage.bsi_alttext}
              width="960px"
              height="540px"
              className="single-image"
            />
          </Flex>
          {/* <Box py={16}>
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
                MATCHES
              </Text>

              <Text
                as="p"
                fontSize="1.8rem"
                fontWeight="bold"
                textAlign={{ base: "start", md: "start" }}
              >
                RECENT AND UPCOMING
              </Text>
            </Flex>
            <Flex w="100%" flexDirection="column">
              {dynamicsSportsTeams[0].bsi_matches.map((m) => (
                <Flex
                  key={m.bsi_matchid}
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
                    {new Date(m.bsi_matchtime).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    {", "}
                    {new Date(m.bsi_matchtime).toLocaleTimeString("en-US")}
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
                        {m.bsi_TeamOne.bsi_name}
                      </Text>
                      <Flex
                        direction="column"
                        align="center"
                        minW="20rem"
                        style={{ gap: "20px" }}
                      >
                        <Badge
                          colorScheme={
                            m.bsi_teamonescore && m.bsi_teamtwoscore
                              ? m.bsi_teamonescore > m.bsi_teamtwoscore
                                ? "green"
                                : "red"
                              : "blackAlpha"
                          }
                          fontSize="1.2rem"
                          boxShadow="rgb(0 0 0 / 5%) 0px 5px 10px 0px"
                        >
                          {m.bsi_teamonescore && m.bsi_teamtwoscore
                            ? `${m.bsi_teamonescore} - ${m.bsi_teamtwoscore}`
                            : new Date(m.bsi_matchtime).toLocaleTimeString(
                                "en-US"
                              )}
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
            </Flex>
          </Box> */}
          {/* <Box>
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
              {dynamicsSportsTeams[0].bsi_contacts.map((c) => (
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
                      {dynamicsSportsTeams[0].bsi_name}{" "}
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
          </Box> */}
        </Box>
      )}
      {dynamicsSportsTeams.length > 1 &&
        Object.keys(groups).map((k) => {
          return (
            <Box key={k} w="95%" mx="auto" py={8}>
              <Text
                as="h4"
                my={8}
                fontWeight="bold"
                color={
                  dynamicsPageSection.bsi_subheadingtextcolor ||
                  "blackAlpha.800"
                }
                fontSize="1.8rem"
                textAlign="start"
              >
                {k}
              </Text>

              <Flex style={{ gap: "15px" }} flexWrap="wrap">
                {groups[k].map((t: DynamicsSportsTeam) => (
                  <Flex
                    key={t.msmedia_sportsteamid}
                    w={{ base: "100%", sm: "48%", md: "33%", lg: "20%" }}
                    flexDirection="column"
                  >
                    <Image
                      src={
                        (t.bsi_TeamImage && t.bsi_TeamImage.bsi_cdnurl) ||
                        "/placeholder.jpg"
                      }
                      alt={t.bsi_TeamImage.bsi_alttext}
                      width="480px"
                      height="270px"
                      objectFit="contain"
                    />

                    <Text
                      as="a"
                      href={`/teams/${t.msmedia_sportsteamid}`}
                      w="100%"
                      h="130px"
                      bgColor="white"
                      display="inline-flex"
                      justifyContent="center"
                      alignItems="center"
                      p={4}
                      fontSize={{ base: "2rem", md: "1.3rem" }}
                    >
                      {t.msmedia_name}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            </Box>
          );
        })}
    </AnchorSection>
  );
};

export default TeamsInfoSection;
