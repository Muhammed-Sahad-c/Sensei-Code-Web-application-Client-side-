import millify from "millify";

export const roundedCount = (count) => {
  return millify(count, {
    precision: 1,
    lowercase: true,
  });
};
