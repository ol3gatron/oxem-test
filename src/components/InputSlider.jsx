import Slider from '@mui/material/Slider';

const InputSlider = ({title, min, max, name, value, valueIn, carPrice, handleChange}) => {

  const initialFee = carPrice / 100 * value
  const initialFeeRounded = Math.ceil(initialFee)

  return (
    <div className="app-inputs--input">
      <div className="input--title">{title}</div>
      <div className="input--inputs">
        {valueIn != "%"
          ?
          <>
            <input
              type="number"
              className='inputs--num-input'
              value={value ? value : min}
              min={min}
              max={max}
              name={name}
              onChange={(e) => handleChange(e)}
              maxLength={10}
            />
            <p className="car-price--value-in">{valueIn}</p>
          </>
          :
          <>
            <input
              type="number"
              className='inputs--num-input'
              value={initialFeeRounded}
              min={min}
              max={max}
              name={name}
              maxLength={10}
              disabled
            />
            <div className='car-price--initial-fee'>
              <input
                type="number"
                value={value}
                min={min}
                max={max}
                name={name}
                onChange={(e) => handleChange(e)}
                className='initial-fee--input'
              />
                <p className='initial-fee--percent-sign'>%</p>
            </div>
          </>
        }
          <Slider
              size="small"
              value={value}
              aria-label="large"
              valueLabelDisplay="off"
              min={min}
              max={max}
              name={name}
              onChange={(e) => handleChange(e)}
              sx={{
                color: "#FF9514",
                position: "absolute",
                marginTop: "55px",
                width: "80%",
              }}
            />
        </div>
    </div>
  )
}
export default InputSlider