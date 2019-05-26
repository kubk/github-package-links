export const waitForElement = (
  selector: string,
  callback: (element: Element) => void,
  attempt = 0
) => {
  if (attempt > 10) {
    return; // Too long, give up
  }
  const element = document.querySelector(selector);
  if (element) {
    callback(element);
  } else {
    setTimeout(() => {
      waitForElement(selector, callback, attempt + 1);
    }, 100);
  }
};
