export default (data, keys) =>
  data.map((row) => ({
    row: keys.map((key) => row[key]),
    percentage: row.percentage,
  }));
