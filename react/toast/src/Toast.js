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
          >
             <p>
                {`${item?.toastMessage} ${item?.toastID}`} 
             </p>
             <button type='button' onClick={()=> removeToast(item.toastID)}>X</button>
          </div>
            )
         })}
        </section>
    )
}