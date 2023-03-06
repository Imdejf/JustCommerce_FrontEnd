export const parseTimeToSeconds = (time: string) => {
  try {
    if (!time) {
      throw new Error('Time is required');
    }

    const [hours, minutes, seconds] = time.split(':');
    const secondsFromHours = parseInt(hours, 10) * 3600;
    const secondsFromMinutes = parseInt(minutes, 10) * 60;

    return secondsFromHours + secondsFromMinutes + parseInt(seconds, 10);
  } catch (error: any) {
    throw new Error('Invalid time format');
  }
};

export const parseSecondsToTime = (sec: number) => {
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec - hours * 3600) / 60);
  const seconds = sec - hours * 3600 - minutes * 60;

  return [hours, minutes, seconds].map((item) => String(item).padStart(2, '0')).join(':');
};
