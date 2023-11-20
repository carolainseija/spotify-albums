export default function useNameInitial(displayName) {
  const hasTwoWords = displayName?.split(" ").length == 2;
  if (hasTwoWords) {
    return (
      displayName?.split(" ")[0].split("")[0] +
      displayName?.split(" ")[1].split("")[0]
    );
  } else {
    return displayName?.split(" ")[0].split("")[0];
  }
}
