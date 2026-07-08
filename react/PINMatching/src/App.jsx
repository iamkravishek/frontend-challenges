import { useState, useEffect } from 'react';
import './App.css'

const SECRET_PIN = '12345';
const MAX_GUESS = 5;

function App() {
  const [form, setForm] = useState({ userInput: '' });
  const [guessList, setGuessList] = useState([]);



  const handleform = (e) => {
    setForm((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
      }));
  }

  const submitForm = (e) => {
    e.preventDefault();
    if (e.target.value?.length < 5) return;
    if(guessList?.length < 5){
      // console.log(e.target.value, form.userInput);
      setGuessList((prev)=>{
         return [...prev, form.userInput];
      });
    }
  }

  useEffect(() => {

  console.log(guessList);

}, [guessList]);

  return (
    <section >
      <h1>PIN MATCHING</h1>
      {
        Array.from({ length: MAX_GUESS }).map((_, rowindex) => {
          return (
            <div
              key={rowindex}
              style={{
                height: '20px',
                width: '160px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'spece-between',
                backgroundColor: "#fff",
                color: '#fff',
                border: '1px solid green',
                margin:'0.5rem auto'
              }}
            >
              {
                Array.from({ length: MAX_GUESS })
                  .map((_, colindex) => {
                    return (
                      <p
                        key={colindex}
                        style={{
                          height: '30px',
                          width: '30px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'spece-between',
                          backgroundColor: !guessList[rowindex] ? 'white' : SECRET_PIN.charAt(colindex)=== guessList[rowindex]?.[colindex] ? 'Green' : 'Red' ,
                          color: '#000',
                          border: '1px solid black'
                        }}
                      >
                        {guessList[rowindex]?.[colindex]}
                      </p>
                    )
                  })
              }
            </div>
          )
        })
      }
      <div className='form'>
        <form onSubmit={submitForm}>
          <div>
            <input
              type="text"
              id="userInput"
              name="userInput"
              value={form.userInput}
              onChange={handleform}
            />
          </div>
          <button
            type='submit'
            disabled={form.userInput.length !== 5 || guessList?.length === 5 || guessList.includes(SECRET_PIN)}
          >Submit</button>

        </form>
      </div>
    <p>
      {guessList.includes(SECRET_PIN)
        ? "Match Won"
        : guessList.length === MAX_GUESS
        ? "Match Lost"
        : `${MAX_GUESS - guessList.length} Attempts Remaining`}
    </p>
    </section>
  )
}

export default App
