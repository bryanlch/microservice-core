export const formatLog = (
  message: string,
  params: Record<string, any>,
): string => {
  return message.replace(/{(\w+)}/g, (match, key) => {
    return typeof params[key] !== 'undefined' ? params[key] : match;
  });
};
