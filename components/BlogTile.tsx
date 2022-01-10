import {
  Badge,
  Box,
  Button,
  Flex,
  Image,
  Link,
  LinkBox,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import NextLink from "next/link";
import { DynamicsBlog } from "../utils/types";

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
      <article style={{ position: "relative" }}>
        <Flex
          direction="column"
          p={3}
          style={{ gap: "20px" }}
          bgColor={props.active ? "rgb(248,248,248)" : "transparent"}
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
        <Flex h="100%">
          <Flex
            direction="column"
            justify="space-between"
            align="flex-start"
            w="50%"
            h="100%"
            p={16}
          >
            <Badge colorScheme="blue" fontSize="1.3rem">
              NEWS
            </Badge>
            <Box>
              <NextLink href="#" passHref>
                <Text as="a" fontSize="2.2rem" fontWeight="bold">
                  {props.blogTitle}
                </Text>
              </NextLink>
              <Text as="p">{props.blogCoverText}</Text>
            </Box>

            <NextLink href="#" passHref>
              <Button as="a" colorScheme="blue" size="lg">
                READ ARTICLE
              </Button>
            </NextLink>
          </Flex>
          <Box w="50%" py={8} px={28}>
            <NextLink href="#">
              <Image
                src={`${props.blogCoverImageUrl}?fm=jpg&fl=progressive`}
                alt={props.blogCoverImageAltText}
                height="100%"
                width="auto"
                boxShadow={"rgb(0 0 0 / 20%) 0px 3px 10px 0px"}
                borderRadius="5px"
              />
            </NextLink>
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
            src={`${props.blogCoverImageUrl}?fm=jpg&fl=progressive`}
            alt={props.blogCoverImageAltText}
            width="100%"
            objectFit="contain"
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
