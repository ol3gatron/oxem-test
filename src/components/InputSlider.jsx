import Slider from '@mui/material/Slider';

const InputSlider = ({title, min, max, name, value, valueIn, carPrice, handleChange}) => {

  const initialFee = carPrice / 100 * value

  return (
    <div className="app-inputs--input">
      <div className="input--title">{title}</div>
      <div className="input--slider">
        <div className="car-price">
          {valueIn != "%"
            ?
            <>
              <input
                type="number"
                value={value ? value : min}
                className='car-price--input'
                min={min}
                max={max}
                name={name}
                onChange={(e) => handleChange(e)}
              />
              <p className="car-price--value-in">{valueIn}</p>
            </>
            :
            <>
            <p className='car-price--value'>{initialFee.toLocaleString()}</p>
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
            sx={{
              position: "absolute",
              width: "80%",
              bottom: -13,
              left: 40,
              color: "#FF9514",
            }}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
    </div>
  )
}
export default InputSlider