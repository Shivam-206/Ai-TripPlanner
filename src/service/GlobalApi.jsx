import { apiImageRequest } from "./api";

const photoCache = new Map();

export function GetPlacePhoto(query) {
  const normalizedQuery = query?.trim().replace(/\s+/g, " ");
  if (!normalizedQuery) {
    return Promise.resolve(null);
  }

  const cacheKey = normalizedQuery.toLowerCase();
  const cachedPhoto = photoCache.get(cacheKey);
  if (cachedPhoto) {
    return cachedPhoto;
  }

  const photoRequest = apiImageRequest(
    `/api/places/photo?query=${encodeURIComponent(normalizedQuery)}`
  )
    .then((blob) => URL.createObjectURL(blob))
    .catch((error) => {
      photoCache.delete(cacheKey);
      throw error;
    });

  photoCache.set(cacheKey, photoRequest);
  return photoRequest;
}
  