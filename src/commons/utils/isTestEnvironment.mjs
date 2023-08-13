export default () => {
  return !["prod", "hml", "dev"].includes(process.env.STAGE);
};
