import Filter from "bad-words";

const filter = new Filter({ regex: /\*|\.|$/gi });

export const checkInappropriate = (orjText) => {
  try {
    const sanitizedText = filter.clean(orjText);
    if (orjText !== sanitizedText) return true;
    else return false;
  } catch (error) {
    return false;
  }
};
