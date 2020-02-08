export const getCategoryId = (categoryIdWithSlug: string): number => {
  const categoryIdWithSlugSplit: string[] = categoryIdWithSlug.split(',');

  return categoryIdWithSlugSplit.length === 2 ? +categoryIdWithSlugSplit[0] : null;
};
