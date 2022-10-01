import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const SliderInput = ({title, min, max, name, value, valueIn, carPrice, handleChange}) => {
  const initialFee = carPrice / 100 * value

  return (
    <div className="input">
      <div className="input--title">{title}</div>
      <div className="input--slider">
        <div className="car-price">
          {valueIn != "%"
            ?
            <>
            <p>{value.toLocaleString()}</p>
            <p>{valueIn}</p>
            </>
            :
            <>
            <p>{initialFee.toLocaleString()}</p>
            <div className='initial-fee'>{value}%</div>
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
            left: 30,
            color: "#FF9514",
            }}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
    </div>
  )
}
export default SliderInput