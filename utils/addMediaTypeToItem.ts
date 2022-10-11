import { MediaItem } from '../typings';

/** create a deep copy of the media item and add a media_type property */
function addMediaTypeToItem(item: MediaItem, type: string): MediaItem {
  const copy = JSON.parse(JSON.stringify(item)) as typeof item;
  copy.media_type = type;
  return copy;
}

export default addMediaTypeToItem;
