<template>
  <b-form-select v-model="selected" :options="options"></b-form-select>
</template>

<script>
export default {
  name: 'TableSelector',
  data(){
    return{
      selected: null,
      options: [
        { value: null, text: 'Please select an option' },
        { value: 'test', text: 'test' },
        { value: 'marble', text: 'marble' },
        { value: 'modele', text: 'Modele' },
        { value: 'd', text: 'Create your own', disabled: true }
      ]
    }
  }
}
</script>

<style>

</style>
