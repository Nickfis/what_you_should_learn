export const formatDate = (dateStr) => {
  // Create a Date object
  const date = new Date(dateStr);

  // Array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Determine the correct ordinal suffix
  let ordinalSuffix;
  switch (date.getDate()) {
    case 1:
    case 21:
    case 31:
      ordinalSuffix = "st";
      break;
    case 2:
    case 22:
      ordinalSuffix = "nd";
      break;
    case 3:
    case 23:
      ordinalSuffix = "rd";
      break;
    default:
      ordinalSuffix = "th";
  }

  // Format the date
  const formattedDate = `${date.getDate()}${ordinalSuffix} of ${
    monthNames[date.getMonth()]
  } ${date.getFullYear()}`;

  return formattedDate;
};
