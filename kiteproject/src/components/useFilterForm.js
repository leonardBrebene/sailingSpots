import React from 'react'
import {useState,useEffect} from 'react'
import useFetch from './useFetch'
import './UseFilterForm.css'

const useFilterForm = () => {
  let url = "https://606cae1c603ded0017502834.mockapi.io/spot"
  const { data,initialData, isPending, error, setData } = useFetch(url);
  const [country, setCountry] = useState('')
  const [windProb,setWindProb]=useState('')
  
  useEffect(() => {
    if(initialData!=null)
    setData(initialData.filter((locations) => {
      return locations.country.toLowerCase().includes(country.toLowerCase())&&locations.probability>=windProb;
    }))

  //   setData(prevState => prevState.filter(item => {
  //     if (item.country.toLowerCase().includes(country.toLowerCase())&&item.probability>=windProb) {
  //         return {
  //             ...item,
  //         }
  //     } console.log('am intrat')
  //     return item
  // }))
 
  }, [country,windProb,setData,initialData])


  const formular =
    <form onSubmit={() => console.log('subited')}>
      <section>
        <label className='label-field'>Country</label>
        <input className='input-field' type="text" value={country} onChange={(e) => {
          setCountry(e.target.value);
        }}/>
      </section>

      <section>
        <label className='label-field'>Wind Probability</label>
        <input className='input-field' type="text" value={windProb} onChange={(e) => {
          setWindProb(e.target.value);
        }} />
      </section>
     
    </form>

  return { data,setData, isPending, error, formular }
}
export default useFilterForm;
