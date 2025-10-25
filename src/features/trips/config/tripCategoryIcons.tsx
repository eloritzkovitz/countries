import type { JSX } from "react";
import {
  FaUser,
  FaHeart,
  FaUsers,
  FaClipboardList,
  FaBriefcase,
  FaGraduationCap,
  FaHandsHelping,
  FaPrayingHands,
  FaHiking,
  FaTree,
  FaCar,
  FaShip,
  FaGem,
  FaRing,
  FaSpa,
  FaMapMarkerAlt,
  FaUtensils,
  FaMusic,
  FaFutbol,
  FaShoppingBag,
  FaUmbrellaBeach,
  FaSkiing,
  FaSnowboarding,
  FaBolt,
  FaPaw,
  FaLandmark,
  FaBuilding,
  FaTheaterMasks,
  FaQuestion,
} from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdBackpack } from "react-icons/md";

// Map of trip categories to their corresponding icons
const TRIP_CATEGORY_ICONS: Record<string, JSX.Element> = {
  solo: <FaUser />,
  couple: <FaHeart />,
  family: <FaUsers />,
  group: <FaPeopleGroup />,
  organized: <FaClipboardList />,
  business: <FaBriefcase />,
  educational: <FaGraduationCap />,
  volunteering: <FaHandsHelping />,
  religious: <FaPrayingHands />,
  adventure: <FaHiking />,
  nature: <FaTree />,
  backpacking: <MdBackpack />,
  roadtrip: <FaCar />,
  cruise: <FaShip />,
  luxury: <FaGem />,
  honeymoon: <FaRing />,
  wellness: <FaSpa />,
  local: <FaMapMarkerAlt />,
  food: <FaUtensils />,
  festival: <FaMusic />,
  sports: <FaFutbol />,
  shopping: <FaShoppingBag />,
  beach: <FaUmbrellaBeach />,
  skiing: <FaSkiing />,
  snowboarding: <FaSnowboarding />,
  extreme: <FaBolt />,
  wildlife: <FaPaw />,
  historical: <FaLandmark />,
  architectural: <FaBuilding />,
  cultural: <FaTheaterMasks />,
  other: <FaQuestion />,
};

// Utility to map options with icons for dropdowns
export function mapCategoryOptionsWithIcons<T extends string>(
  options: { value: T; label: string }[]
): { value: T; label: JSX.Element }[] {
  return options.map((opt) => ({
    ...opt,
    label: (
      <span className="flex items-center gap-2">
        {TRIP_CATEGORY_ICONS[opt.value] ?? null}
        <span>
          {typeof opt.label === "string" ? opt.label : String(opt.label)}
        </span>
      </span>
    ),
  }));
}
