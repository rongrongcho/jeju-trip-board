export function createNaverSearchUrl(placeTitle: string) {
  const query = placeTitle.includes('제주') ? placeTitle : `${placeTitle} 제주`;
  return `https://search.naver.com/search.naver?query=${encodeURIComponent(query)}`;
}
