export const formatArabicDate = (isoString: string) => {
  const date = new Date(isoString);

  return date.toLocaleString("ar", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    numberingSystem: "arab",
  });
};
