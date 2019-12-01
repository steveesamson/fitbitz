const sessionKey = "535510n";

const getSession = () => {
  const sess = sessionStorage.getItem(sessionKey);
  return sess ? JSON.parse(sess) : null;
};
const saveSession = (data: any) => {
  sessionStorage.setItem(sessionKey, JSON.stringify(data));
};
const clearSession = () => sessionStorage.clear();
export { getSession, saveSession, clearSession };
