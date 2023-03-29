export default function (selector) {
  const targets = document.querySelectorAll(selector);
  return targets.length > 0 ? targets[targets.length - 1] : null;
}
