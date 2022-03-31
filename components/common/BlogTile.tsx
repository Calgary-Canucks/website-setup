import { Badge, Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import Image from "next/image";
import * as React from "react";
import NextLink from "next/link";
import { DynamicsBlog } from "../../types/dynamics-365/common/types";

interface IBlogTileProps {
  blogTitle: string;
  blogAuthors: DynamicsBlog["bsi_Blog_bsi_BlogAuthor_bsi_BlogAuthor"];
  blogTags: DynamicsBlog["bsi_BlogCategory_bsi_Blog_bsi_Blog"];
  blogSlug: string;
  publishDate: Date;
  blogCoverText: string;
  blogCoverImageUrl: string;
  blogCoverImageAltText: string;
  size?: "mini" | "xl" | "md";
  active?: boolean;
  userClicked?: boolean;
}

const BlogTile: React.FunctionComponent<IBlogTileProps> = (props) => {
  if (props.size === "mini") {
    return (
      <article style={{ position: "relative", height: "90%" }}>
        <Flex
          direction="column"
          p={3}
          style={{ gap: "20px" }}
          bgColor={props.active ? "rgb(248,248,248)" : "transparent"}
          height="100%"
          borderRadius={3}
          boxShadow={
            props.active ? "rgb(0 0 0 / 20%) 0px 3px 10px 0px" : "none"
          }
        >
          <Flex justify="space-between" align="center">
            <Badge colorScheme="blue" fontSize="0.7rem">
              NEWS
            </Badge>
            <Text as="span" suppressHydrationWarning fontSize="0.7rem">
              {props.publishDate.toLocaleDateString()}
            </Text>
          </Flex>
          <Text as="h5" fontSize="0.9rem">
            {props.blogTitle}
          </Text>
        </Flex>
        <Box
          position="absolute"
          w={props.active ? "100%" : "0"}
          transition={
            props.active && !props.userClicked ? "all ease 5s" : "none"
          }
          h="5px"
          bgColor="navy"
          left="0"
          bottom="-20px"
          borderRadius="500px"
        ></Box>
      </article>
    );
  }
  if (props.size === "xl") {
    return (
      <article style={{ height: "100%" }}>
        <Flex h="100%" flexDirection={{ base: "column-reverse", md: "row" }}>
          <Flex
            direction="column"
            justify="space-between"
            align={{ base: "center", md: "flex-start" }}
            style={{ gap: "20px" }}
            w={{ base: "100%", md: "50%" }}
            h="100%"
            p={16}
          >
            <Badge
              colorScheme="blue"
              fontSize="1.3rem"
              display={{ base: "none", md: "inline" }}
            >
              NEWS
            </Badge>
            <Box>
              <NextLink href="#" passHref>
                <Text
                  as="a"
                  fontSize="2.2rem"
                  fontWeight="bold"
                  textAlign={{ base: "center", md: "start" }}
                >
                  {props.blogTitle}
                </Text>
              </NextLink>
              <Text as="p" textAlign={{ base: "center", md: "start" }}>
                {props.blogCoverText}
              </Text>
            </Box>
            <Button as="a" colorScheme="blue" size="lg">
              READ ARTICLE
            </Button>
          </Flex>
          <Box
            w={{ base: "100%", md: "50%" }}
            py={{ base: 20, md: 8 }}
            px={{ base: 8, md: 28 }}
          >
            <Image
              src={props.blogCoverImageUrl}
              alt={props.blogCoverImageAltText}
              height="450px"
              width="600px"
              // boxShadow={"rgb(0 0 0 / 20%) 0px 3px 10px 0px"}
              // borderRadius="5px"
            />
          </Box>
        </Flex>
      </article>
    );
  }
  return (
    <article>
      <Flex direction="column" width="100%" style={{ gap: "15px" }} p={6}>
        <NextLink href={`/blogs/${props.blogSlug}`}>
          <Image
            src={props.blogCoverImageUrl}
            alt={props.blogCoverImageAltText}
            width="800px"
            height="500px"
            objectFit="fill"
          />
        </NextLink>
        <Flex justify="space-between">
          <Flex align="center">
            {props.blogAuthors.map((b) => (
              <NextLink
                href={`/blogs/author/${b.bsi_slug}/page/1`}
                passHref
                key={b.bsi_slug}
              >
                <Link mr={3}>{b.bsi_name}</Link>
              </NextLink>
            ))}
          </Flex>
          <Flex align="center">
            {props.blogTags.map((b) => (
              <Badge colorScheme="teal" ml={2} key={b.bsi_slug}>
                <NextLink href={`/blogs/category/${b.bsi_slug}/page/1`}>
                  {b.bsi_name}
                </NextLink>
              </Badge>
            ))}
          </Flex>
        </Flex>
        <Text as="small" suppressHydrationWarning>
          {props.publishDate.toLocaleDateString()}
        </Text>
        <NextLink href={`/blogs/${props.blogSlug}`}>
          <Link fontSize="1.7rem" fontWeight="bold">
            {props.blogTitle}
          </Link>
        </NextLink>

        <Text as="p">{props.blogCoverText}</Text>
        <NextLink href={`/blogs/${props.blogSlug}`} passHref>
          <Link fontSize="0.8rem">READ MORE &gt;&gt;</Link>
        </NextLink>
      </Flex>
    </article>
  );
};

export default BlogTile;
