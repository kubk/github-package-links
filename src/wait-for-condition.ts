export const waitForCondition = <T>(
  condition: () => NonNullable<T> | undefined | null,
  callback: (element: NonNullable<T>) => void,
  attempt = 0
) => {
  if (attempt > 10) {
    return; // Too long, give up
  }
  const result = condition();
  if (result) {
    callback(result);
  } else {
    setTimeout(() => {
      waitForCondition(condition, callback, attempt + 1);
    }, 100);
  }
};
