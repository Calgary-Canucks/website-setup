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
  Input,
  StackDivider,
  Switch,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import Calendar, { YearView } from "react-calendar";
import { DynamicsPageSection } from "../../utils/types";
import AnchorSection from "../AnchorSection";

interface ICalendarSectionProps {
  events: any[];
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
    >
      <Box bgColor="rgb(241,241,241)" pb={32}>
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

        <Calendar
          defaultValue={value}
          view={isListView ? "month" : "year"}
          onActiveStartDateChange={(dateProps) => {
            setValue(() => dateProps.activeStartDate);
          }}
          className={["year-only"]}
        />
        <Box h="20vh" bgColor="rgb(241,241,241)"></Box>
        {!events.find((e) => {
          const matchDate = new Date(e.bsi_matchtime);
          return matchDate >= firstDayOfMonth && matchDate <= lastDayOfMonth;
        }) && (
          <Center pb={32}>
            <Text as="h2">No match history found for this period.</Text>
          </Center>
        )}
        <Box display={isListView ? "block" : "none"}>
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={8}
            align="stretch"
          >
            {events.map((e) => {
              const matchDate = new Date(e.bsi_matchtime);
              if (matchDate >= firstDayOfMonth && matchDate <= lastDayOfMonth) {
                return (
                  <Box
                    key={e.bsi_matchid}
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
                        borderRadius="0px 5px 0px 0px"
                        bgImage="linear-gradient(
                70deg
                , rgb(255, 255, 255) 0px, rgb(255, 255, 255) 25px, transparent 25px)"
                      ></Box>
                    </Flex>
                    <Flex
                      key={e.bsi_matchid}
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
                            {e.bsi_TeamOne.bsi_name}
                          </Text>
                          <Flex
                            direction="column"
                            align="center"
                            style={{ gap: "20px" }}
                          >
                            <Badge
                              colorScheme={
                                e.bsi_teamonescore && e.bsi_teamtwoscore
                                  ? e.bsi_teamonescore > e.bsi_teamtwoscore
                                    ? "green"
                                    : "red"
                                  : "blackAlpha"
                              }
                              fontSize="1.2rem"
                            >
                              {e.bsi_teamonescore && e.bsi_teamtwoscore
                                ? `${e.bsi_teamonescore} - ${e.bsi_teamtwoscore}`
                                : new Date(e.bsi_matchtime).toLocaleTimeString(
                                    "en-US"
                                  )}
                            </Badge>
                            <Text as="span">League</Text>
                            <Text as="span">{e.bsi_Venue.bsi_name}</Text>
                          </Flex>

                          <Text
                            as="span"
                            fontSize="1.1rem"
                            fontWeight="bold"
                            w="300px"
                            textAlign="center"
                          >
                            {e.bsi_TeamTwo.bsi_name}
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
                    const matchdate = new Date(e.bsi_matchtime);

                    if (matchdate >= date && matchdate < nextDate) {
                      return (
                        <React.Fragment key={e.bsi_matchid}>
                          <Text
                            as="p"
                            whiteSpace="nowrap"
                            overflow="hidden"
                            textOverflow="ellipsis"
                          >
                            {e.bsi_TeamOne.bsi_name} vs {e.bsi_TeamTwo.bsi_name}
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
                  const matchdate = new Date(m.bsi_matchtime);
                  if (matchdate >= matchDate && matchdate < nextMatchDate) {
                    return (
                      <Flex
                        key={m.bsi_matchid}
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
                              {m.bsi_TeamOne.bsi_name}
                            </Text>
                            <Flex
                              direction="column"
                              align="center"
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
                              >
                                {m.bsi_teamonescore && m.bsi_teamtwoscore
                                  ? `${m.bsi_teamonescore} - ${m.bsi_teamtwoscore}`
                                  : new Date(
                                      m.bsi_matchtime
                                    ).toLocaleTimeString("en-US")}
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
