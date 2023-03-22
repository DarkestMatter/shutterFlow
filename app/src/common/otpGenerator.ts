export const otpGenerator = () => {
  return Math.floor(Math.floor(100000 + Math.random() * 900000));
};
