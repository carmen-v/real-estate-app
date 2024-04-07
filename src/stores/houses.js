import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useHouseStore = defineStore('houses', () => {
  const houses = ref([])
  const fetchHouses = () => {
    const myHeaders = new Headers()
    myHeaders.append('X-Api-Key', '5Vkh7UIXBcZ9x8RmaMl4TSqdEzW3FJOg')

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }

    fetch('https://api.intern.d-tt.nl/api/houses', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        houses.value = data
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
  fetchHouses()

  const sortByPrice = () => {
    houses.value.sort((a, b) => a.price - b.price)
  }
  const sortBySize = () => {
    houses.value.sort((a, b) => b.size - a.size)
  }
  const deleteHouse = (id) => {
    houses.value = houses.value.filter((house) => house.id !== id)
  }
  const editHouse = (id) => {
    houses.value = houses.value.map((house) => {
      if (house.id === id) {
        house.madeByMe = !house.madeByMe
      }
      return house
    })
  }
  return { houses, fetchHouses, sortByPrice, sortBySize, deleteHouse, editHouse }
})
