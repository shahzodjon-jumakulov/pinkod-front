export const useVideos = () => useState(() => ({ news: [], lang: "" }));

export const usePinned = () => useState(() => ({ news: [], lang: "" }));

export const usePopular = () => useState(() => ({ news: [], lang: "" }));

export const useLatest = () => useState(() => ({ news: [], lang: "" }));

export const useCategories = () => useState(() => ({ categories: [], lang: "" }));

export const useAvailableLanguages = () => useState(() => []);

export const useShorts = () => useState(() => null);

export const useShortsModal = () => useState(() => false);
