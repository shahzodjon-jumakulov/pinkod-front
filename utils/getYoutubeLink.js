export default function (url, onlyId = false) {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(shorts\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);

  if (onlyId) {
    return match && match[8].length > 0 ? match[8] : null;
  }
  
  if (match && match[8].length > 0) {
    return `https://youtube.com/embed/${match[8]}?rel=0&modestbranding=1`;
  }
  
  return null;
}
