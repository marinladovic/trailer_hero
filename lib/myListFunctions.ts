import { User } from 'firebase/auth';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import addMediaTypeToItem from '../utils/addMediaTypeToItem';
import { MediaItem } from '../typings';
import { toast } from 'react-hot-toast';

const toastStyle = {
  background: 'white',
  color: 'black',
  fontWeight: 'bold',
  fontSize: '16px',
  padding: '15px',
  borderRadius: '9999px',
  maxWidth: '1000px',
};

export async function addToList(item: MediaItem, user: User, type?: string) {
  if (type) {
    item = addMediaTypeToItem(item, type);
  }
  await setDoc(doc(db, 'users', user.uid, 'myList', item.id.toString()!), {
    ...item,
  });
  toast(`${item?.title || item?.original_name} has been added to My List`, {
    duration: 3000,
    style: toastStyle,
  });
}

export async function deleteFromList(item: MediaItem, user: User) {
  await deleteDoc(doc(db, 'users', user.uid, 'myList', item.id.toString()!));
  toast(`${item?.title || item?.original_name} has been removed from My List`, {
    duration: 3000,
    style: toastStyle,
  });
}
