import { Flex, FlexProps, Image, Link } from "@chakra-ui/react";
import { motion } from "framer-motion";
import * as React from "react";
import { DynamicsPageSection } from "../../types/dynamics-365/common/types";
import AnchorSection from "../../components/common/AnchorSection";

interface ISponsorSectionProps {
  dynamicsPageSection: DynamicsPageSection;
}

const MotionFlex = motion<FlexProps>(Flex);

const SponsorSection: React.FunctionComponent<ISponsorSectionProps> = ({
  dynamicsPageSection,
}) => {
  return (
    <AnchorSection
      sectionId={dynamicsPageSection.bsi_sectionid || "success-stories"}
      key={dynamicsPageSection.bsi_pagesectionid}
      backgroundColor={dynamicsPageSection.bsi_backgroundcolor || "white"}
    >
      <Flex align="center" w="100%" overflow="hidden" h="30vh">
        <Flex w="2980px" justify="space-between">
          <MotionFlex
            w="980px"
            px="10px"
            justify="space-between"
            align="center"
            animate={{
              translateX: ["0%", "-100%", "200%", "100%", "0%"],
              transition: {
                duration: 60,
                ease: "linear",
                times: [0, 1 / 3, 1 / 3, 2 / 3, 1],
                repeat: Infinity,
              },
            }}
          >
            {dynamicsPageSection.bsi_PageSection_bsi_ImageAsset_bsi_ImageA.map(
              (i) => (
                <Link key={i.bsi_cdnurl} href="#">
                  <Image
                    w="150px"
                    px="10px"
                    objectFit="contain"
                    alt={i.bsi_name}
                    src={i.bsi_cdnurl}
                    transition="all ease 0.5s"
                    filter="grayscale(100%)"
                    opacity={0.4}
                    _hover={{ filter: "grayscale(0%)", opacity: 1 }}
                  />
                </Link>
              )
            )}
          </MotionFlex>
          <MotionFlex
            justify="space-between"
            w="980px"
            px="10px"
            align="center"
            animate={{
              translateX: ["0%", "-100%", "-200%", "100%", "0%"],
              transition: {
                duration: 60,
                ease: "linear",
                times: [0, 1 / 3, 2 / 3, 2 / 3, 1],
                repeat: Infinity,
              },
            }}
          >
            {dynamicsPageSection.bsi_PageSection_bsi_ImageAsset_bsi_ImageA.map(
              (i) => (
                <Link key={i.bsi_cdnurl} href="#">
                  <Image
                    w="150px"
                    px="10px"
                    objectFit="contain"
                    alt={i.bsi_name}
                    src={i.bsi_cdnurl}
                    transition="all ease 0.5s"
                    filter="grayscale(100%)"
                    opacity={0.4}
                    _hover={{ filter: "grayscale(0%)", opacity: 1 }}
                  />
                </Link>
              )
            )}
          </MotionFlex>
          <MotionFlex
            justify="space-between"
            w="980px"
            px="10px"
            align="center"
            animate={{
              translateX: ["0%", "-100%", "-200%", "-300%", "0"],
              transition: {
                duration: 60,
                ease: "linear",
                times: [0, 1 / 3, 2 / 3, 1, 1],
                repeat: Infinity,
              },
            }}
          >
            {dynamicsPageSection.bsi_PageSection_bsi_ImageAsset_bsi_ImageA.map(
              (i) => (
                <Link key={i.bsi_cdnurl} href="#">
                  <Image
                    w="150px"
                    px="10px"
                    objectFit="contain"
                    alt={i.bsi_name}
                    src={i.bsi_cdnurl}
                    transition="all ease 0.5s"
                    filter="grayscale(100%)"
                    opacity={0.4}
                    _hover={{ filter: "grayscale(0%)", opacity: 1 }}
                  />
                </Link>
              )
            )}
          </MotionFlex>
        </Flex>
      </Flex>
    </AnchorSection>
  );
};

export default SponsorSection;
