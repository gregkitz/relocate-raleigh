/**
 * `useJsApiLoader` from @react-google-maps/api uses a single global Loader.
 * All components must pass the same `id` (and matching options), or prerender/build fails.
 */
export const SHARED_GOOGLE_MAPS_LOADER_ID = "relocate-raleigh-maps";
