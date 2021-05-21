import { useState, useEffect } from 'react';
import db from '../lib/firebase.js';

const STORAGE_KEY = 'todos';

function useStorage() {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    //const data = localStorage.getItem(STORAGE_KEY);
    
    db.collection(STORAGE_KEY).onSnapshot(snapshot=>{
      setItems(snapshot.docs.map(doc=>({
        key: doc.id,
        text: doc.data().text,
        done: doc.data().done
      })))
    })
    // if (!data) {
    //   localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    // } else {
    //   setItems(JSON.parse(data));
    // }
  }, []);

  const addItems = async item => {
    await db.collection(STORAGE_KEY).add({
      text: item,
      done: false,
    })
    setItems(items);
  };
  
  const updateItems = async item => {
    const updateItems = db.collection(STORAGE_KEY).doc(item.key);
    await updateItems.update({
      done: !item.done,
    })
  };

  const clearItems =async () => {
    const allItems = await db.collection(STORAGE_KEY).get();
    const batch = db.batch();
    allItems.forEach(item=>{
      batch.delete(item.ref);
    })
    
    await batch.commit();
    
  };

  return [items, addItems, updateItems, clearItems];
}

export default useStorage;