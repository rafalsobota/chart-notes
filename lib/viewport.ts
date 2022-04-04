// https://stackoverflow.com/questions/123999/how-can-i-tell-if-a-dom-element-is-visible-in-the-current-viewport
const isElementInViewport = (el: HTMLElement) => {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

export function scrollIntoView(el: HTMLElement) {
  if (!isElementInViewport(el)) {
    el.scrollIntoView({
      block: "end",
      behavior: 'smooth',
    });
  }
}
