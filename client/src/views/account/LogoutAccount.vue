<script setup>

import {useRouter} from "vue-router";

const router = useRouter()
function removeItem(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

async function removeCookie() {
  await removeItem("token");
  router.push('/fr/account')
}

removeCookie()
</script>

<template></template>