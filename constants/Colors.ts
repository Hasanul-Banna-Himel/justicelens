const colors = {
  aj_dark_primary: "#404040",
  aj_dark_secondary: "#303030",

  aj_parrot_primary: "#f4ffac",
  aj_parrot_secondary: "#fcfffa",

  aj_light: "#ffffff",

  aj_green_primary: "#37402b",
  aj_green_secondary: "#e9ece5",

  aj_cream: "#f2f0eb",

  aj_gray: "#9b9b9bff",
  aj_gray_light: "#e2e2e2ff",
};

export const Colors = {
  light: {
    text: colors.aj_green_primary,
    background: colors.aj_cream,
    background_substitute: colors.aj_parrot_secondary,
    tint: colors.aj_green_primary,
    icon: colors.aj_green_secondary,
    tabIconDefault: colors.aj_green_secondary,
    tabIconSelected: colors.aj_green_primary,
    primary: colors.aj_green_primary,
    secondary: colors.aj_dark_secondary,
    gray: colors.aj_gray,
    gray_light: colors.aj_gray_light,
  },
  dark: {
    text: colors.aj_light,
    background: colors.aj_dark_primary,
    background_substitute: colors.aj_dark_secondary,
    tint: colors.aj_parrot_primary,
    icon: colors.aj_parrot_secondary,
    tabIconDefault: colors.aj_parrot_secondary,
    tabIconSelected: colors.aj_parrot_primary,
    primary: colors.aj_parrot_primary,
    secondary: colors.aj_green_secondary,
    gray: colors.aj_gray_light,
    gray_light: colors.aj_gray,
  },
};
