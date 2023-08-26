export function generateMonogram(name: string): string {
  const words = name.split(" ");

  if (words.length === 1) {
    // Only one name is provided
    return words[0].charAt(0).toUpperCase();
  }

  // Return the first letter of the first name and the first letter of the last name
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}

export function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
}
