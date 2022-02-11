/**
 * @name generateBuffer
 * @description Generate a Buffer from a payload
 * @param {*} payload
 * @returns {String} Stringified payload
 */
export const generateBuffer = (payload: any) => {
  return Buffer.from(JSON.stringify(payload));
};

/**
 * @name parseBuffer
 * @description Parse a Buffer to string and Parse as JSON if possible
 * @param {*} payload
 */
export const parseBuffer = (payload: any) => {
  const data = payload.toString();
  // Try to parse as JSON
  try {
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
};
