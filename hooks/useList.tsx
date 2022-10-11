import { collection, DocumentData, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { MediaItem } from '../typings';

function useList(uid: string | undefined) {
  const [list, setList] = useState<MediaItem[] | DocumentData[]>([]);

  useEffect(() => {
    if (!uid) return;

    return onSnapshot(collection(db, 'users', uid, 'myList'), (snapshot) => {
      setList(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, [db, uid]);

  return list;
}

export default useList;
