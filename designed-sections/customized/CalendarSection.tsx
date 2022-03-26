import {
  Badge,
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  StackDivider,
  Switch,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Calendar from "react-calendar";
import { DynamicsPageSection } from "../../types/dynamics-365/common/types";
import AnchorSection from "../../components/common/AnchorSection";
import { DynamicsMatch } from "../../types/dynamics-365/customized/types";

interface ICalendarSectionProps {
  events: DynamicsMatch[];
  dynamicsPageSection: DynamicsPageSection;
}

const CalendarSection: React.FunctionComponent<ICalendarSectionProps> = ({
  events,
  dynamicsPageSection,
}) => {
  const [value, setValue] = useState(new Date());
  const firstDayOfMonth = new Date(value.getFullYear(), value.getMonth(), 1);
  const lastDayOfMonth = new Date(value.getFullYear(), value.getMonth() + 1, 0);
  const [matchDate, setMatchDate] = useState<Date>(new Date());
  const [isListView, setIsListView] = useState(false);
  const nextMatchDate = new Date(matchDate);
  nextMatchDate.setDate(matchDate.getDate() + 1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const prevMonth = new Date();
  prevMonth.setMonth(value.getMonth() + 1);
  const nextMonth = new Date();
  nextMonth.setMonth(value.getMonth() - 1);

  return (
    <AnchorSection
      sectionId={dynamicsPageSection.bsi_sectionid}
      key={dynamicsPageSection.bsi_pagesectionid}
      backgroundColor={
        dynamicsPageSection.bsi_backgroundcolor || "rgb(241,241,241)"
      }
    >
      <Box pb={32}>
        <Flex
          h="10vh"
          bg="white"
          px={8}
          justify="space-between"
          alignItems="center"
        >
          <Text
            as="h2"
            fontSize="1.5rem"
            fontWeight="bold"
            flexGrow={1}
            color={dynamicsPageSection.bsi_mainheadingtextcolor || "inherit"}
          >
            {dynamicsPageSection.bsi_mainheading}
          </Text>
          <FormControl
            display="inline-flex"
            justifyContent="flex-end"
            alignItems="center"
            w="20rem"
          >
            <FormLabel htmlFor="list-view-toggle" mb="0" fontSize="0.9rem">
              LIST VIEW
            </FormLabel>
            <Switch
              id="list-view-toggle"
              isChecked={isListView}
              onChange={() => setIsListView((prev) => !prev)}
            />
          </FormControl>
        </Flex>

        <Box display={isListView ? "block" : "none"}>
          <Calendar
            value={value}
            view={isListView ? "month" : "year"}
            onActiveStartDateChange={(dateProps) => {
              setValue(() => dateProps.activeStartDate);
            }}
            className={["year-only"]}
          />
          <Box h="20vh" bgColor="rgb(241,241,241)"></Box>
          {!events.find((e) => {
            const matchDate = new Date(e.bsi_starttime);
            return matchDate >= firstDayOfMonth && matchDate <= lastDayOfMonth;
          }) && (
            <Center pb={32}>
              <Text as="h2">No match history found for this period.</Text>
            </Center>
          )}

          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={8}
            align="stretch"
          >
            {events.map((e) => {
              const matchDate = new Date(e.bsi_starttime);
              if (matchDate >= firstDayOfMonth && matchDate <= lastDayOfMonth) {
                return (
                  <Box
                    key={e.msmedia_mediaeventid}
                    w="95%"
                    mx="auto"
                    bgColor="white"
                    borderRadius="5px"
                    boxShadow="rgb(0 0 0 / 5%) 0px 5px 10px 0px"
                  >
                    <Flex h="60px" p={0} w="100%">
                      <Center alignItems="stretch" h="100%" py="5px" px="15px">
                        <Text
                          as="span"
                          fontSize="50px"
                          lineHeight="100%"
                          mr={4}
                        >
                          {matchDate.getDate()}
                        </Text>
                        <Flex
                          flexDirection="column"
                          justify="space-around"
                          h="100%"
                        >
                          <Text as="span" fontSize="18px" lineHeight="100%">
                            {matchDate.toLocaleString("default", {
                              weekday: "short",
                            })}
                          </Text>
                          <Text as="span" fontSize="18px" lineHeight="100%">
                            {matchDate.toLocaleString("default", {
                              month: "short",
                            })}{" "}
                            {matchDate.toLocaleString("default", {
                              year: "numeric",
                            })}
                          </Text>
                        </Flex>
                      </Center>
                      <Box
                        bgColor="rgb(1, 78, 134)"
                        h="100%"
                        flexGrow={1}
                        display="flex"
                        alignItems="center"
                        borderRadius="0px 5px 0px 0px"
                        bgImage="linear-gradient(
                70deg
                , rgb(255, 255, 255) 0px, rgb(255, 255, 255) 25px, transparent 25px)"
                      >
                        <Text as="p" pl={16} fontSize="1.3rem" color="white">
                          {matchDate.toLocaleTimeString("en-US")}
                        </Text>
                      </Box>
                    </Flex>
                    <Flex
                      key={e.msmedia_mediaeventid}
                      direction="column"
                      align="stretch"
                      p={6}
                      style={{ gap: "20px" }}
                    >
                      <Flex direction="column">
                        <Flex justify="space-around" align="flex-start">
                          <Text
                            as="span"
                            fontSize="1.1rem"
                            fontWeight="bold"
                            w="300px"
                            textAlign="center"
                          >
                            {e.msmedia_HomeTeam.msmedia_name}
                          </Text>
                          <Flex
                            direction="column"
                            align="center"
                            style={{ gap: "20px" }}
                          >
                            <Badge
                              colorScheme={
                                e.msmedia_hometeamscore &&
                                e.msmedia_visitingteamscore
                                  ? e.msmedia_hometeamscore >
                                    e.msmedia_visitingteamscore
                                    ? "green"
                                    : "red"
                                  : "blackAlpha"
                              }
                              fontSize="1.2rem"
                            >
                              {e.msmedia_hometeamscore &&
                              e.msmedia_visitingteamscore
                                ? `${e.msmedia_hometeamscore} - ${e.msmedia_visitingteamscore}`
                                : new Date(e.bsi_starttime).toLocaleTimeString(
                                    "en-US"
                                  )}
                            </Badge>
                            <Text as="span">League</Text>
                            <Text as="span">
                              {e.msmedia_PrimaryVenue.msmedia_name}
                            </Text>
                          </Flex>

                          <Text
                            as="span"
                            fontSize="1.1rem"
                            fontWeight="bold"
                            w="300px"
                            textAlign="center"
                          >
                            {e.msmedia_VisitingTeam.msmedia_name}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Box>
                );
              }
            })}
          </VStack>
        </Box>
        <Box display={isListView ? "none" : "block"}>
          <Calendar
            value={value}
            onActiveStartDateChange={(dateProps) => {
              setValue(() => dateProps.activeStartDate);
            }}
            prevLabel={
              "<" +
              nextMonth.toLocaleString("default", {
                month: "short",
                year: "numeric",
              })
            }
            prev2Label={null}
            nextLabel={
              prevMonth.toLocaleString("default", {
                month: "short",
                year: "numeric",
              }) + ">"
            }
            defaultView="month"
            next2Label={null}
            view="month"
            tileContent={({ date }) => {
              const nextDate = new Date(date);
              nextDate.setDate(date.getDate() + 1);

              const element = (
                <Box
                  maxW="100%"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  fontSize="0.8rem"
                >
                  {events.map((e) => {
                    const matchdate = new Date(e.bsi_starttime);

                    if (matchdate >= date && matchdate < nextDate) {
                      return (
                        <React.Fragment key={e.msmedia_mediaeventid}>
                          <Text
                            as="p"
                            whiteSpace="nowrap"
                            overflow="hidden"
                            textOverflow="ellipsis"
                          >
                            {e.msmedia_HomeTeam.msmedia_name} vs{" "}
                            {e.msmedia_VisitingTeam.msmedia_name}
                          </Text>
                          <Text
                            as="p"
                            color="rgb(214, 214, 214)"
                            fontSize="0.7rem"
                          >
                            {matchdate.toLocaleTimeString("en-US")}
                          </Text>
                        </React.Fragment>
                      );
                    }
                  })}
                </Box>
              );
              return element;
            }}
            onClickDay={(date) => {
              setMatchDate(() => date);
              onOpen();
            }}
            className={["detailed-calendar"]}
            formatMonthYear={(_, date) =>
              new Intl.DateTimeFormat("en-US", {
                month: "short",
                year: "numeric",
              }).format(date)
            }
          />
        </Box>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton bgColor="whiteAlpha" />
            <DrawerHeader display="flex" h="60px" p={0}>
              <Center alignItems="stretch" h="100%" py="5px" px="15px">
                <Text as="span" fontSize="50px" lineHeight="100%" mr={4}>
                  {matchDate.getDate()}
                </Text>
                <Flex flexDirection="column" justify="space-around" h="100%">
                  <Text as="span" fontSize="18px" lineHeight="100%">
                    {matchDate.toLocaleString("default", { weekday: "short" })}
                  </Text>
                  <Text as="span" fontSize="18px" lineHeight="100%">
                    {matchDate.toLocaleString("default", { month: "short" })}{" "}
                    {matchDate.toLocaleString("default", { year: "numeric" })}
                  </Text>
                </Flex>
              </Center>
              <Box
                bgColor="rgb(1, 78, 134)"
                h="100%"
                flexGrow={1}
                borderRadius="0px 0px 0px 0px"
                bgImage="linear-gradient(
                70deg
                , rgb(255, 255, 255) 0px, rgb(255, 255, 255) 25px, transparent 25px)"
              ></Box>
            </DrawerHeader>

            <DrawerBody>
              <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={4}
                align="stretch"
              >
                {events.map((m) => {
                  const matchdate = new Date(m.bsi_starttime);
                  if (matchdate >= matchDate && matchdate < nextMatchDate) {
                    return (
                      <Flex
                        key={m.msmedia_mediaeventid}
                        direction="column"
                        align="stretch"
                        p={6}
                        style={{ gap: "20px" }}
                      >
                        <Flex direction="column">
                          <Flex justify="space-around" align="flex-start">
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
                              style={{ gap: "20px" }}
                            >
                              <Badge
                                colorScheme={
                                  m.msmedia_hometeamscore &&
                                  m.msmedia_visitingteamscore
                                    ? m.msmedia_hometeamscore >
                                      m.msmedia_visitingteamscore
                                      ? "green"
                                      : "red"
                                    : "blackAlpha"
                                }
                                fontSize="1.2rem"
                              >
                                {m.msmedia_hometeamscore &&
                                m.msmedia_visitingteamscore
                                  ? `${m.msmedia_hometeamscore} - ${m.msmedia_visitingteamscore}`
                                  : new Date(
                                      m.bsi_starttime
                                    ).toLocaleTimeString("en-US")}
                              </Badge>
                              <Text as="span">League</Text>
                              <Text as="span">
                                {m.msmedia_PrimaryVenue.msmedia_name}
                              </Text>
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
                    );
                  }
                })}
              </VStack>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Close
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
    </AnchorSection>
  );
};

export default CalendarSection;
