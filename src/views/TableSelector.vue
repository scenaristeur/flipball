<template>
  <b-form-select v-model="table" :options="options"></b-form-select>
</template>

<script>
export default {
  name: 'TableSelector',
  data(){
    return{
      table: null,
      options: [
        { value: null, text: 'Please select a table' },
        { value: 'flipball', text: 'Flipball' },
        { value: 'marble', text: 'Marble' },
        { value: 'modele', text: 'Modele' },
        { value: 'd', text: 'Create your own', disabled: true }
      ]
    }
  },
  watch:{
    table(){
      this.$store.commit('setTable', this.table)
      const event = new CustomEvent('tableChanged', { detail: this.table });
      window.dispatchEvent(event);
    }
  }
}
</script>

<style>

</style>
