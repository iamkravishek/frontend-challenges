import { useEffect, useState } from 'react';
import './App.css';
import Toast from './Toast';

function App() {
  const [notification, setNotification] = useState([]);
  useEffect(()=>{
    // console.log(notification);
  },[notification]);

  function showToast(text){
  const toast = setTimeout(() => {}, 0);
 
  let message;
  if (text === "success") {
    message = "Success";
  } else if (text === "warning") {
    message = "Warning";
  } else if (text === "info") {
    message = "Info";
  } else {
    message = "Error";
  }

  setNotification((prev) => [
    ...prev,
    {
      toastID: toast,
      toastMessage: message,
      toastType: text,
    },
  ]);

  setTimeout(() => {
    removeToast(toast);
  }, 1000);
  }

  function removeToast(toastRemoveId){
    setNotification((prev) =>
      prev.filter((item) => item.toastID !== toastRemoveId)
    );
  }


  return (
    <div className="App">
      <main
      className='parent-container'
      >
        <h1>Toast Notification System</h1>
        <div 
        className="btn-container"   
        >
          <button type="button" onClick={()=>showToast("success")}>Succes</button>
          <button type="button" onClick={()=>showToast("warning")}>Warning</button>
          <button type='button' onClick={()=>showToast("info")}>Info</button>
          <button type='button' onClick={()=>showToast("error")}>Error</button>
        </div>
      </main>
      <Toast notification={notification} removeToast={removeToast}/>
    </div>
  );
}

export default App;
