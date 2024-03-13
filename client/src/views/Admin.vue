<script setup>
import NavbarAdmin from "@/components/NavbarAdmin.vue";
</script>
<template>
   <NavbarAdmin></NavbarAdmin>
   <div class="flat_header"></div>
   <div class="contener">
   <div class="contenu">
   <h1>Page Admin</h1>
   <p>Bienvenu sur la partie administrateur du quizz question pour un buisson </p> 
   </div>
    </div>
</template>
<style>
.flat_header {
  height: 90vh;
  background: url('../assets/image/foret.jpg') no-repeat center center/cover;
}
.contenu {
  background-color: #ffffff;
  display: flex;
  box-shadow: -1px 13px 20px 0px #bababa;
  border-radius: 10px;
  padding: 40px;
  gap: 60px;
  margin-top: -100px;
  margin-bottom: 40px;
  width: 50%;
}
.contener {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>