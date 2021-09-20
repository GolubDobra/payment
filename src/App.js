import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import './index.css';
import api from './utils/api';

function App() {
  const numOfCard = '0000 0000 0000 0000';
  const date = 'MM/YY';
  const cvc = 'CVC';
  const name = 'IVAN IVANOV';
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('');
  const curRef = useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    handleSaveCard({
      pan: curRef.current.value,
    });
  }

  const handleSaveCard = (card) => {
    api
      .saveCard(card.pan)
      .then((input) => {
        setInput(input.result.pid);
      })
      .catch((err) => console.log(err));
    // .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    api
      .getStatus(input)
      .then((input) => {
        setStatus(input);
      })
      .catch((err) => console.log(err));
    // .finally(() => setIsLoading(false));
  }, [input]);

  return (
    <div className="payment">
      <h1 className="payment__title">Оплата банковской картой</h1>
      <form className="payment__form">
        <div className="input">
          <span className="payment__lable">Номер карты</span>
          <input
            ref={curRef}
            className="paymant__input"
            id="pan"
            name="pan"
            type="text"
            // onInput={(e) => setInput(e.target.value)}
            placeholder={numOfCard}
            minLength="13"
            maxLength="19"
            pattern="[0-9]*"
            inputMode="numeric"
            required
            autoFocus
          />
        </div>
        <div className="input payment__input-lable">
          <div className="inline-input">
            <span className="payment__lable">Месяц/Год</span>
            <input
              className="paymant__input inline-input__date"
              id="expire"
              name="expire"
              type="text"
              placeholder={date}
              minLength="4"
              maxLength="4"
              pattern="[0-9]*"
              inputMode="numeric"
              required
            />
          </div>
          <div className="inline-input">
            <span className="payment__lable inline-lable__code">Код</span>
            <input
              className="paymant__input inline-input__code"
              id="cvc"
              name="cvc"
              type="password"
              placeholder={cvc}
              minLength="3"
              maxLength="3"
              pattern="[0-9]*"
              inputMode="numeric"
              required
            />
          </div>
        </div>
        <div className="input">
          <span className="payment__lable">Владелец карты</span>
          <input
            className="paymant__input"
            id="cardholder"
            name="cardholder"
            type="text"
            placeholder={name}
            pattern="[A-Za-z]"
            required
          />
        </div>
      </form>
      <form onSubmit={handleSubmit}>
        <button className="paymant__button-submit" type="submit">
          Оплатить
        </button>
      </form>
    </div>
  );
}

export default App;
