export const waitForElement = (
  selector: string,
  attempt: number,
  callback: (element: Element) => void
) => {
  if (attempt > 10) {
    return; // Too long, give up
  }
  const element = document.querySelector(selector);
  if (element) {
    callback(element);
  } else {
    setTimeout(() => {
      waitForElement(selector, attempt + 1, callback);
    }, 100);
  }
};
