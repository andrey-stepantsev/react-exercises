export const getTime = (timeFrom: number): string => {
  const ms = Date.now() - timeFrom;
  return convertTime(ms);
};

export const convertTime = (ms: number): string => {
  const secTotal = Math.floor(ms / 1000);
  const min = Math.floor(secTotal / 60);
  const sec = secTotal - min * 60;
  return (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
};
