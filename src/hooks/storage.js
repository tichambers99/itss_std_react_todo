import { useState, useEffect } from 'react';
import db from '../lib/firebase.js';

const STORAGE_KEY = 'itss-todo';

function useStorage() {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    //const data = localStorage.getItem(STORAGE_KEY);
    
    const data = [];
    
    db.collection("todos").onSnapshot(snapshot=>{
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

  const putItems = items => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    setItems  (items);
  };

  const clearItems = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    setItems([]);
    
  };

  return [items, putItems, clearItems];
}

export default useStorage;