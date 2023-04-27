export const parseLocalStorage = (key: string): string[] => {
  const object = localStorage.getItem(key);

  if (object) {
    return JSON.parse(object) as string[];
  }

  return new Array<string>();
};
