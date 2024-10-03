export const generateUserId = () => {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = "user-" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("userId", userId);
  }
  return userId;
};
