function jsonData(message, data) {
  if (data) return { message: message, data: data };
  return { message: message };
}
export default jsonData;
