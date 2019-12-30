export const getISONow = () => new Date(Date.now()).toISOString();

export const getUserId = user => {
  try {
    return JSON.parse(user).id;
  } catch {
    return user.id;
  }
};

export const getPercentageOfDutiesCompleted = landDuties => {
  const { length } = landDuties;
  const done = landDuties.reduce(
    (acc, ld) => (ld.activeCompletedDuty ? acc + 1 : acc),
    0
  );
  return (done / length) * 100;
};

export const getProgressColor = percentage => {
  if (percentage < 25) return "#c94c4c";
  if (percentage < 50) return "#eea29a";
  if (percentage < 75) return "#86af49";
  return "#405d27";
};

export default null;
