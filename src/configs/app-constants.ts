import { ThemeColor } from "src/@core/layouts/types";
import { LangType } from "src/types/lang";

export const LANG_CONST_ARRAY: LangType[] = [
  {
    label: "Afaan Oromoo",
    id: "om",
    default: true,
  },
  {
    label: "English",
    id: "en",
    default: false,
  },
  {
    label: "አማርኛ",
    id: "am",
    default: false,
  },
];
export const ITEMS_LISTING_TYPE = {
  grid: { label: "Grid", value: "grid" },
  masonry: { label: "Masonry", value: "masonry" },
  list: { label: "List", value: "list" },
  table: { label: "Table", value: "table" },
};
export const availableColors: ThemeColor[] = [
  "primary",
  "secondary",
  "success",
  "error",
  "warning",
  "info",
];

export const gridSpacing = 3;
export const acadamicLevels: string[] = [
  "1-12",
  "Certificate",
  "Diplome Degree",
  "Bachilor Degree",
  "Masters Degree",
  "PHD Degree",
  "others",
];
export const professionalStatus: string[] = [
  "Student",
  "Housewife",
  "Proffesional",
  "Refired",
  "Job Seeker",
];
export const relegionList: string[] = [
  "Chirtian Family",
  "Orthodox Christianity",
  "Islam",
  "Cultural belief",
  "Catholic",
  "Only Jesus",
  "Jehovah Witness",
];
export const churhcServicesList: string[] = [
  "የማስተማር አገልግሎት",
  "የአዋቂዎች ሰንበት",
  "የልጆች ሰንበት",
  "የደህንነት እና የጥምቀት",
  "የስብከት አገልግሎት",
  "የጋብቻና ምክር አገልግሎት",
  "የልጆች አገልግሎት",
  "የወጣቶች አገልግሎት",
  "የታዳጊ ወጣቶች አገልግሎት",
  "የእህቶች አገልግሎት",
  "የቤት ህብረት ማስተባበር",
  "የጉብኝት አገልግሎት",
  "ዲያቆንነት አገልግሎት",
  "መስተንግዶ አገልግሎት",
  "ጽዳት አና ውበት",
  "የሙዚቃ ድምጽ ቁጥጥር",
  "ርህራሄ ድጋፍ አገልግሎት",
  "መረጃ ና ሚድያ",
  "የፈውስ አገልግሎት",
  "የሂሳብ ስራ ኦዲት",
  "የፀሎት አገልግሎት",
  "የወንጌል ስርጭት",
  "የልማት አግልግሎት",
  "ኪነ ጥበብ",
  "የሽምግልና አግልግሎት",
  "የዝማሬ አገልግሎት",
  "የአምልኮ መሪነት",
  "ይወንጌል ስርጭት",
];
export const appModulesNames = ["member", "admin", "team","school"];
