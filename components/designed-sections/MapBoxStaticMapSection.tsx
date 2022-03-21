import { Box, Flex, Link, Select, Text } from "@chakra-ui/react";
import { DesignedSection, DynamicsVenue } from "../../utils/types";
import AnchorSection from "../AnchorSection";
import Image from "next/image";
import { useState } from "react";

interface IMapBoxStaticMapSectionProps extends DesignedSection {
  dynamicsVenues: DynamicsVenue[];
}

const MapBoxStaticMapSection: React.FunctionComponent<
  IMapBoxStaticMapSectionProps
> = ({ dynamicsPageSection, dynamicsVenues }) => {
  const [mapPoint, setMapPoint] = useState(
    dynamicsVenues[0].msmedia_mediavenueid
  );
  if (!dynamicsPageSection) {
    return null;
  }

  const currentVenue = dynamicsVenues.find(
    (v) => v.msmedia_mediavenueid === mapPoint
  );

  return (
    <AnchorSection
      sectionId={dynamicsPageSection.bsi_sectionid}
      key={dynamicsPageSection.bsi_pagesectionid}
      py={16}
      backgroundColor={
        dynamicsPageSection.bsi_backgroundcolor || "rgb(241,241,241)"
      }
    >
      <Flex
        maxW="80vw"
        mx="auto"
        borderRadius="5px"
        flexDirection={{ base: "column", lg: "row" }}
        boxShadow="rgb(0 0 0 / 5%) 0px 5px 10px 0px"
      >
        <Link
          href={`https://www.google.com/maps?z=12&t=m&q=${currentVenue?.msmedia_latitude},${currentVenue?.msmedia_longitude}`}
        >
          <Image
            width="1000px"
            height="600px"
            alt="Venue Location"
            src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/url-https%3A%2F%2Fdocs.mapbox.com%2Fapi%2Fimg%2Fcustom-marker.png(${
              currentVenue!.msmedia_latitude
            },${currentVenue!.msmedia_longitude})/${
              currentVenue!.msmedia_latitude
            },${
              currentVenue!.msmedia_longitude
            },15/1000x600?access_token=pk.eyJ1IjoiYmVuY29udmV5MSIsImEiOiJjanFxdTF4OTAwZXY0NDhwcmIyeDRkcDdhIn0.EM1eFhBXmXW5SiTq8kLCxQ`}
          />
        </Link>

        <Flex
          w={{ base: "80vw", lg: "30vw" }}
          bgColor="white"
          flexDirection="column"
          justifyContent="center"
          style={{ gap: "20px" }}
          p={8}
        >
          <Select
            onChange={(e) => setMapPoint(() => e.target.value)}
            bgColor="rgb(1, 78, 134)"
            borderColor="rgb(1, 78, 134)"
            color="white"
            fontSize="0.9rem"
          >
            {dynamicsVenues.map((v) => (
              <option
                key={v.msmedia_mediavenueid}
                value={v.msmedia_mediavenueid}
              >
                {v.msmedia_name}
              </option>
            ))}
          </Select>
          <Box>
            <Text as="p">{currentVenue?.msmedia_addressline1}</Text>
            <Text as="p">{currentVenue?.msmedia_addresscity}</Text>
            <Text as="p">{currentVenue?.msmedia_addressstateorprovince}</Text>
            <Text as="p">{currentVenue?.msmedia_addresspostalcode}</Text>
            <Text as="p">{currentVenue?.msmedia_addresscountry}</Text>
          </Box>
          <Link
            fontWeight="bold"
            color="rgb(1, 78, 134)"
            href={`https://www.google.com/maps?z=12&t=m&q=${currentVenue?.msmedia_latitude},${currentVenue?.msmedia_longitude}`}
          >
            VIEW ON GOOGLE MAP
          </Link>
        </Flex>
      </Flex>
    </AnchorSection>
  );
};

export default MapBoxStaticMapSection;
