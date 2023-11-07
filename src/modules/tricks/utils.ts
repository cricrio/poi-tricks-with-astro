export const getTrickIdsFromMain = () =>
  document.querySelector('main')?.dataset?.trickids?.split(',') ?? [];
