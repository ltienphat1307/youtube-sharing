export const removeSpecialCharacters = (str: string, replaceTo?: string) => {
  return str.replace(/[^\sa-zA-Z0-9\.\-_]/g, replaceTo || "");
};
