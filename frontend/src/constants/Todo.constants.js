const editTimestamp = timestamp => {
  return new Date(timestamp).toLocaleString("en-GB", {
    timeZone: "Turkey"
  });
};

export default editTimestamp;
