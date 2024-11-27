export const formatDuration = (duration: number | undefined) => {
  if (!duration) return "00:00";
  const minutes = Math.floor(duration / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export const formatNumber = (num: number) => {
  if (num > 999999) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num > 999) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
