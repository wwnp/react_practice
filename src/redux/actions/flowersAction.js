import axios from 'axios'
import { delay } from '../../pure/pure'
import { START_LOADING,FETCH_FLOWERS_SUCCESS } from './actionTypes'
export function fetchFlowers() {
  return async dispatch => {
    dispatch({ type: START_LOADING})
    try {
      const response = await axios.get('https://react-quiz-ce9f7-default-rtdb.europe-west1.firebasedatabase.app/storage.json')
      const { data } = response
      const flowerGroup_name = Object.entries(data)[0][0]
      const flowerGroup_value = Object.entries(data)[0][1]
      const flowers = []
      Object.keys(flowerGroup_value).forEach(flowerName => {
        const flower = flowerGroup_value[flowerName]
        const { name, img, price } = flower
        flowers.push(
          { name, img, price, flowerName, flowerGroup_name },
        )
      })
      await delay(700)
      dispatch({ type: FETCH_FLOWERS_SUCCESS, flowers: flowers })
    } catch (error) {
      dispatch({ type: 'ERROR', error: error })
    }
  }
}