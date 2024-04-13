<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";

const props = defineProps(['showform', 'getData'])
const emit = defineEmits(['refresh', ])
const {t, locale} = useI18n()

const theme = ref('')
const theme_en =ref()
const imageData = ref()

function addtheme() {
  if (!theme.value || !theme_en.value || !imageData.value) {
    return ;
  }
  axios.post('http://apiplateform.karibsen.fr/api/themes', {
    nomThemes: theme.value,
    enThemes: theme_en.value,
    image: imageData.value
  })
      .then(() => {
        emit('refresh');
        emit('update:showform', false);
        
      })
    theme.value = ''
    theme_en.value = ''
    imageData.value = ''
    props.showform = !props.showform
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Vérifier la taille de l'image
  if (file.size > 500 * 1024) {
    alert("L'image ne doit pas dépasser 500ko.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    imageData.value = e.target.result;
  };
  reader.readAsDataURL(file);
}
</script>

<template>
  <div v-if="showform">
    <div id="formulaire_question">
      <div class="form-box">
        <form class="form" @submit.prevent>
          <button @click="showform = !showform" class="button_close">
            <span class="X"></span>
            <span class="Y"></span>
          </button>
          <span class="title">{{ t('add_theme_form.add_theme') }}</span>
          <span class="subtitle">{{ t('add_theme_form.fill_form_to_add_theme') }}</span>
          <div class="form-container">
            <input class="form_input" type="text" v-model="theme" :placeholder="t('add_theme_form.theme_placeholder')" name="theme" required>
            <input class="form_input" type="text" v-model="theme_en" :placeholder="t('add_theme_form.theme_en_placeholder')" name="theme_en" required>
            <input class="form_input" type="file" accept="image/png" @change="handleImageUpload" name="image" required>
          </div>
          <button type="submit" class="button_add" @click="addtheme">
            <span class="button__text">{{ t('add_theme_form.add_button') }}</span>
            <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg">
              <line y2="19" y1="5" x2="12" x1="12"></line>
              <line y2="12" y1="12" x2="19" x1="5"></line>
            </svg></span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
