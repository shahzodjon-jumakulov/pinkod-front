export default (text, classes) => {
  if (!text || !document) return 0;
  
  const el = document.createElement("span");
  el.className = classes;
  el.innerText = text;
  document.body.appendChild(el);
  const width = el.offsetWidth;
  document.body.removeChild(el);
  return width;
};
