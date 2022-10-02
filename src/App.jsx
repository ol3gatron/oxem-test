import axios from 'axios';
import { useState } from 'react';
import InputSlider from './components/InputSlider';
import ClipLoader from "react-spinners/ClipLoader"
import Slider from '@mui/material/Slider';

function App() {

  const [formData, setFormData] = useState({
      carPrice: 3300000,
      initialFee: 13,
      leasingTerm: 60,
    }
  )

  const formValidate = (e) => {
    if (e.target.name === "carPrice" && !e.target.value) {
      return 1000000
    } else if (e.target.name === "carPrice") {
      return e.target.value
    } else if (e.target.name === "initialFee" && !e.target.value) {
      return 10
    } else if (e.target.name === "initialFee") {
      return e.target.value
    } else if (e.target.name === "leasingTerm" && !e.target.value) {
      return 1
    } else if (e.target.name === "leasingTerm") {
      return e.target.value
    }
  }

  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [e.target.name]: formValidate(e)
        }
    })
  }

  const monthlyPay = Math.ceil((formData.carPrice - formData.initialFee) * ((0.035 * Math.pow((1 + 0.035), formData.leasingTerm)) / (Math.pow((1 + 0.035), formData.leasingTerm) - 1)))

  const totalSum = formData.initialFee + formData.leasingTerm * monthlyPay

  const formIsValid = (formData.carPrice >= 1000000 && formData.carPrice <= 6000000) && (formData.initialFee >= 10 && formData.initialFee <= 60) && (formData.leasingTerm >= 1 && formData.leasingTerm <= 60)

  function handleSubmit(e) {
    e.preventDefault()

    setLoading(true)

    setTimeout(() => {
      axios.post("https://eoj3r7f3r4ef6v4.m.pipedream.net/", {
        ...formData,
        monthlyPay,
        totalSum
      }).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      setLoading(false)
      }, 2000)

  }

  return (
    <form className="App" onSubmit={handleSubmit}>
      <h1 className="app-title">Рассчитайте стоимость <br /> автомобиля в лизинг</h1>
      <div className="app-inputs">
        <InputSlider
          title={"Стоимость автомобиля"}
          min={1000000}
          max={6000000}
          name="carPrice"
          value={formData.carPrice}
          valueIn="₽"
          handleChange={handleChange}
        />
        <InputSlider
          title={"Первоначальный взнос"}
          min={10}
          max={60}
          handleChange={handleChange}
          name="initialFee"
          carPrice={formData.carPrice}
          value={formData.initialFee}
          valueIn="%"
        />
        <InputSlider
          title={"Срок лизинга"}
          min={1}
          max={60}
          name="leasingTerm"
          value={formData.leasingTerm}
          valueIn="мес."
          handleChange={handleChange}
        />
      </div>
      <div className="app-total">
        <div className="app-total--sum">
          <div className="input--title">
            Сумма договора лизинга
          </div>
          <div className="app-total--sum-value">
            {totalSum.toLocaleString()}₽
          </div>
        </div>
        <div className="app-total--monthly-pay">
          <div className="input--title">
            Ежемесячный платеж от
          </div>
          <div className="app-total--monthly-pay-value">
            {monthlyPay.toLocaleString()}₽
          </div>
        </div>
        {formIsValid
          ?
          <button disabled={loading}>{loading ? <ClipLoader color="#C4C4C4" /> : "Оставить заявку"}</button>
          :
          <button className='btn-disabled' disabled>Неверные данные</button>}
      </div>
    </form>
  )
}

export default App
