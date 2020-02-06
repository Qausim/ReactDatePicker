const getDatePartsPosition = format => {
  const sep = format.match(/[/-]/g)[0];
  const splitted = format.toLowerCase().split(sep);
  const dayPos = splitted.indexOf("dd");
  const monthPos = splitted.indexOf("mm");
  const yearPos = splitted.indexOf("yyyy");

  return { dayPos, monthPos, yearPos, sep };
};

export const formatDateToString = (date, format) => {
  const { dayPos, monthPos, yearPos, sep } = getDatePartsPosition(format);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const preformatArray = [];
  preformatArray[dayPos] = day;
  preformatArray[monthPos] = month;
  preformatArray[yearPos] = year;

  return preformatArray.join(sep);
};

export const formatStringToDate = (dateString, format) => {
  const { dayPos, monthPos, yearPos, sep } = getDatePartsPosition(format);
  const splitted = dateString.split(sep);
  return new Date(
    `${splitted[monthPos]}/${splitted[dayPos]}/${splitted[yearPos]}`
  );
};
