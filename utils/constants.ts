import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaRegFileExcel,
  FaRegFilePdf,
  FaRegFilePowerpoint,
  FaRegFileWord,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { IconType } from "react-icons";

export const dynamicsSocialPlatformMap: { [key: number]: IconType } = {
  606600000: FaLinkedinIn,
  606600001: FaInstagram,
  606600002: FaYoutube,
  606600003: FaFacebookF,
  606600004: FaTwitter,
  606600005: FaPinterest,
  606600006: FaWhatsapp,
};

export const fileExtensionMap: { [key: string]: IconType } = {
  pdf: FaRegFilePdf,
  pptx: FaRegFilePowerpoint,
  xlsx: FaRegFileExcel,
  docx: FaRegFileWord,
};
