import moment from 'moment';

export const useDurations = (timeLeft: number) => {
  const leftDuration = moment.duration(timeLeft, 'milliseconds');
  const timeLeftDays = leftDuration.days();
  const timeLeftHours = leftDuration.hours();
  const timeLeftMinutes = leftDuration.minutes();
  const timeLeftSeconds = leftDuration.seconds();

  return { timeLeftDays, timeLeftHours, timeLeftMinutes, timeLeftSeconds };
};
