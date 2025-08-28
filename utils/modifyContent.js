export default (html) => {
  const { baseURL } = useRuntimeConfig().public;

  const imgRegex = /<img [^>]*src="([^"]*)"/g;
  const aTagRegex = /<a([^>]*)>/g;

  let updatedHtml = html;
  let match;

  while ((match = imgRegex.exec(html)) !== null) {
    const src = match[1];
    if (src.startsWith("/"))
      updatedHtml = updatedHtml.replace(src, `/_ipx/f_webp/${baseURL}${src}`);
  }
  updatedHtml = updatedHtml.replace(aTagRegex, (match, p1) => {
    return p1.includes("class=")
      ? match.replace(/class="([^"]*)"/, 'class="$1 link-underline"')
      : `<a${p1} class="link-underline">`;
  });

  updatedHtml = updatedHtml.replaceAll(
    /<oembed url="([^"]+)"><\/oembed>/g,
    (match, p1) => {
      const youtubeLink = getYoutubeLink(p1);
      return `<iframe src="${youtubeLink}" class="w-full aspect-[16/9]" frameborder="0" allowfullscreen></iframe>`;
    }
  );

  return updatedHtml;
};
