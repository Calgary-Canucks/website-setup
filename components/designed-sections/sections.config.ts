import { FunctionComponent } from "react";
import BusinessBanterSection from "./BusinessBanterSection";
import ClientFeatureSection from "./ClientFeatureSection";
import HeroSection from "./HeroSection";
import NewsSection from "./NewsSection";
import ProductSection from "./ProductSection";
import SuccessStoriesSection from "./SuccessStoriesSection";
import BlogsDisplaySection from "./BlogsDisplaySection";
import SingleBlogSection from "./SingleBlogSection";
import HighlightNewsSection from "./HighlightNewsSection";
import SponsorSection from "./SponsorSection";
import RecentMatchesSection from "./RecentMatchesSection";
import CalendarSection from "./CalendarSection";

const sections: { [key: string]: FunctionComponent<any> } = {
  BusinessBanterSection,
  ClientFeatureSection,
  HeroSection,
  NewsSection,
  ProductSection,
  SuccessStoriesSection,
  BlogsDisplaySection,
  SingleBlogSection,
  HighlightNewsSection,
  SponsorSection,
  RecentMatchesSection,
  CalendarSection,
};

export default sections;
