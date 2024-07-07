<template>
  <div class="language-selector">
    <button @click="changeLanguage('en')">English</button>
    <button @click="changeLanguage('hu')">Magyar</button>
  </div>
</template>

<script>
export default {
  methods: {
    changeLanguage(lang) {
      console.log('belep')
      this.$i18n.locale = lang;
    }
  }
};
</script>

<style scoped>
.language-selector {
  position: fixed;
  top: 10px;
  right: 10px;
}

button {
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>