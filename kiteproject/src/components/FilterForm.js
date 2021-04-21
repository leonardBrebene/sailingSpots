import React from 'react'
import {useState} from 'react'
import './UseFilterForm.css'

const FilterForm = ({onFilter}) => {
  const [country, setCountry] = useState('...')
  const [windProb,setWindProb]=useState(0)
  
const onSubmit=(e)=>{
  e.preventDefault();
  onFilter({country,windProb});
  
}

  return(
    <form onSubmit={country==='...'?(setCountry(''),onSubmit):onSubmit}>
      <section>
        <label className='label-field'>Country</label>
        <input className='input-field' type="text" value={country} onClick={()=>setCountry('')} onChange={(e) => {
          setCountry(e.target.value);
        }}/>
      </section>

      <section>
        <label className='label-field'>Wind Probability </label>
        <input className='input-field' type="text" value={windProb} onChange={(e) => {
          setWindProb(e.target.value);
        }} />
      </section>
      <button style={{ backgroundColor: 'blue', color:'aliceblue',borderColor: 'blue', left:'30%',position:'relative',margin:'10px'}}>Filter</button>

    </form>
  )
 
}
export default FilterForm;
