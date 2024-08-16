export const exitCB = (callback) => {
  sessionStorage.removeItem("data");
  callback();
};
