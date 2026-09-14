import './Toast.css';
export default function Toast({notification, removeToast}){
    return (
        <section
        className="toast-box"
          
        >
         {notification.map((item, idx)=>{
         return (
          <div 
          className={`toast-item ${item.toastType}`}
          id={item.toastID}
          key={idx}
          role="alert"
          aria-live="assertive"
          >
             <p>
                {`${item?.toastMessage} ${item?.toastID}`} 
             </p>
             <button type='button' aria-label={`Close ${item.toastType} notification`} onClick={()=> removeToast(item.toastID)}>X</button>
          </div>
            )
         })}
        </section>
    )
}