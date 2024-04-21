<script setup>
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const street = ref('')
const houseNumber = ref('')
const addition = ref('')
const postalCode = ref('')
const city = ref('')
const price = ref('')
const size = ref('')
const garage = ref('')
const bedrooms = ref('')
const bathrooms = ref('')
const constructionDate = ref('')
const description = ref('')
const formError = ref('')
const isFormValid = ref(false)

const submitForm = () => {
  if (
    !street.value ||
    !houseNumber.value ||
    !postalCode.value ||
    !city.value ||
    !price.value ||
    !size.value ||
    (garage.value !== 'yes' && garage.value !== 'no') ||
    !bedrooms.value ||
    !bathrooms.value ||
    !constructionDate.value ||
    !description.value
  ) {
    formError.value = 'Please fill in all the required fields'
  }

  console.log(street.value)

  // Additional validation logic can be added here

  if (isFormValid.value) {
    // Submit the data to the API or perform other actions

    // Redirect to detail page
    router.push(`/${listingId.value}`)
  }
}

const listingId = ref('12345') // Placeholder for the listing ID, should be replaced with the actual ID generated after posting

// Watch for changes in form fields to determine form validity
watchEffect(() => {
  isFormValid.value =
    street.value &&
    houseNumber.value &&
    postalCode.value &&
    city.value &&
    price.value &&
    size.value &&
    (garage.value === 'yes' || garage.value !== 'no') &&
    bedrooms.value &&
    bathrooms.value &&
    constructionDate.value &&
    description.value
})
</script>

<template>
  <div class="create-form">
    <div class="edit-form-separator">
      <button class="back-button-mobile" @click="$router.go(-1)">
        <img src="@/assets/icons/ic_back_grey@3x.png" alt="back icon" />
      </button>
      <h1>Create new listing</h1>
    </div>
    <form @submit.prevent="submitForm">
      <div>
        <input
          type="text"
          id="street"
          v-model="street"
          required
          placeholder="Enter the street name"
        />
        <label for="street">Street name</label>
      </div>
      <div class="separator">
        <div>
          <input
            type="number"
            id="houseNumber"
            v-model="houseNumber"
            required
            placeholder="Enter house number"
          />
          <label for="House number">House number</label>
        </div>
        <div>
          <input type="number" id="addition" v-model="addition" placeholder="e.g. A" />
          <label for="Addition">Addition</label>
        </div>
      </div>
      <div>
        <input
          type="text"
          id="postalCode"
          v-model="postalCode"
          required
          placeholder="e.g. 1000 AA"
        />
        <label for="postalCode">Postal code</label>
      </div>
      <div>
        <input type="text" id="city" v-model="city" required placeholder="e.g. Utrecht" />
        <label for="city">City</label>
      </div>
      <div>
        <input type="file" id="images" accept="image/png, image/jpeg" multiple required />
        <label for="images">Upload picture (PNG or JPG)</label>
      </div>
      <div>
        <input type="text" id="price" v-model="price" required placeholder="e.g. €150.000" />
        <label for="price">Price</label>
      </div>
      <div class="separator">
        <div>
          <input type="text" id="size" v-model="size" required placeholder="e.g. 60 m2" />
          <label for="Size">Size</label>
        </div>
        <div>
          <select id="hasGarage" v-model="garage" required>
            <option value="undefined" disabled>Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <label for="hasGarage">Garage</label>
          <img class="caret" src="@/assets/icons/chevron-up-chevron-down.svg" alt="dropdown icon" />
        </div>
      </div>
      <div class="separator">
        <div>
          <input
            type="number"
            id="bedrooms"
            v-model="bedrooms"
            required
            placeholder="Enter amount"
          />
          <label for="Bedrooms">Bedrooms</label>
        </div>
        <div>
          <input
            type="number"
            id="bathrooms"
            v-model="bathrooms"
            required
            placeholder="Enter amount"
          />
          <label for="bathrooms">Bathrooms</label>
        </div>
      </div>
      <div>
        <input
          type="text"
          id="constructionDate"
          v-model="constructionDate"
          required
          placeholder="e.g. 1990"
        />
        <label for="constructionDate">Construction Date</label>
      </div>
      <div>
        <textarea
          id="description"
          v-model="description"
          required
          placeholder="Enter description"
        ></textarea>
        <label for="description">Description</label>
      </div>
      <button type="submit">Post</button>
      <p v-if="formError" class="error-message">{{ formError }}</p>
    </form>
  </div>
</template>
