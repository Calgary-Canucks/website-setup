import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import Calendar, { YearView } from "react-calendar";

interface ICalendarSectionProps {
  events: any[];
}

const CalendarSection: React.FunctionComponent<ICalendarSectionProps> = ({
  events,
}) => {
  const [value, setValue] = useState(new Date());
  const date1 = new Date();
  date1.setMonth(value.getMonth() + 1);
  const date2 = new Date();
  date2.setMonth(value.getMonth() - 1);

  return (
    <Box bgColor="rgb(241,241,241)">
      <Calendar
        defaultValue={value}
        view="year"
        onActiveStartDateChange={(dateProps) => {
          setValue(() => dateProps.activeStartDate);
        }}
      />
      <Calendar
        value={value}
        onActiveStartDateChange={(dateProps) => {
          setValue(() => dateProps.activeStartDate);
        }}
        prevLabel={
          "<" +
          date2.toLocaleString("default", { month: "long", year: "numeric" })
        }
        prev2Label={null}
        nextLabel={
          date1.toLocaleString("default", { month: "long", year: "numeric" }) +
          ">"
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
                      <Text as="p" color="rgb(214, 214, 214)" fontSize="0.7rem">
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
        onClickDay={(date) => console.log(date)}
        className={["detailed-calendar"]}
      />
    </Box>
  );
};

export default CalendarSection;
