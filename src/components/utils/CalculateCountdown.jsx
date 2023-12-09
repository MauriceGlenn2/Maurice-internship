export default function calculateCountdown(item) {
  const currentTime = Date.now();
  const timeDifferenceMillisLeft = item.expiryDate - currentTime;

  if (timeDifferenceMillisLeft <= 0) {
    return "00h 00m 00s";
  }
  const seconds = Math.floor(timeDifferenceMillisLeft / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const secondsText = seconds % 60;
  const minutesText = minutes % 60;
  const hoursText = hours % 24;

  return `
      ${hoursText.toString().padStart(2, "0")}h 
      ${minutesText.toString().padStart(2, "0")}m 
      ${secondsText.toString().padStart(2, "0")}s`;
}

