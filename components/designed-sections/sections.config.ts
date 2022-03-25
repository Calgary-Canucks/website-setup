import { FunctionComponent } from "react";
import BusinessBanterSection from "./BusinessBanterSection";
import ClientFeatureSection from "./ClientFeatureSection";
import HeroSection from "./HeroSection";
import NewsSection from "./NewsSection";
import ProductSection from "./ProductSection";
import SuccessStoriesSection from "./SuccessStoriesSection";
import BlogsDisplaySection from "./BlogsDisplaySection";
import HighlightNewsSection from "./HighlightNewsSection";
import SponsorSection from "./SponsorSection";
import RecentMatchesSection from "./RecentMatchesSection";
import CalendarSection from "./CalendarSection";
import TeamsInfoSection from "./TeamsInfoSection";
import ContactPersonnelSection from "./ContactPersonnelSection";
import MapBoxStaticMapSection from "./MapBoxStaticMapSection";
import DownloadsSection from "./DownloadsSection";

const sections: { [key: string]: FunctionComponent<any> } = {
  BusinessBanterSection,
  ClientFeatureSection,
  HeroSection,
  NewsSection,
  ProductSection,
  SuccessStoriesSection,
  BlogsDisplaySection,
  HighlightNewsSection,
  SponsorSection,
  RecentMatchesSection,
  CalendarSection,
  TeamsInfoSection,
  ContactPersonnelSection,
  MapBoxStaticMapSection,
  DownloadsSection,
};

export default sections;
