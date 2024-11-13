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
        // { value: null, text: 'Please select a table' },
        { value: 'flipball', text: 'Flipball' },
        { value: 'marble', text: 'Marble' , disabled:true},
        { value: 'modele', text: 'Modele' , disabled:true},
        { value: 'd', text: 'Create your own', disabled: true }
      ]
    }
  },
  // mounted(){
  //   this.table = this.options[1].value
  // },
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
