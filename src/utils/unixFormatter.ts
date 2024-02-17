export const convertUnix = (unixTimestamp: number) => {
  // Create a new Date object using the Unix timestamp multiplied by 1000 to convert from seconds to milliseconds
  const date = new Date(unixTimestamp * 1000);
  // Get individual components of the date (year, month, day, etc.)
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Create a formatted string
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  const dateOnly = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
  const timeZoneString = date.toLocaleTimeString("en-US", {
    timeZoneName: "long",
  });
  return { formattedDate, dateOnly, timeZoneString };
};
