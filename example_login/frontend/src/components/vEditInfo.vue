<template>
  <div >
    <p class="text-4xl mt-5">Tên:</p>
    <div class="mt-2">
      <input
        v-model="useInfo.info.name"
        class="text-blue-600  w-3/5 text-3xl font-bold bg-slate-50/5 border-b-2 border-black"
      />
    </div>
    <p class="text-4xl mt-5">ngày sinh:</p>
    <div class="mt-5 w-1/5">
      <vue-tailwind-datepicker
        as-single
        :formatter="formatter"
        v-model="useInfo.info.date"
        :placeholder="useInfo.info.date || 'chưa thêm ngày sinh'"
        
      />
    </div>

    <div class="mt-10">
      <p class="text-4xl">Giới thiệu:</p>
      <textarea
        cols='40'
        v-model="useInfo.info.introduce"
        class="mt-3 text-xl h-[200px]  w-3/5 bg-slate-50/5 border-black border-opacity-0"
      ></textarea>
      <div class="w-3/5 border-b-2 border-black"></div>
    </div>

    <div class="flex justify-end mt-10 mr-10 text-2xl">
      <div v-show="!useAlertStore.loading" class="flex justify-center pt-10">
        <button
          @click="update()"
          class="my-20 p-3 text-2xl text-center shadow-violet-700 shadow-md w-72 h-16 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
        >
          Lưu
        </button>
      </div>

      <div v-show="useAlertStore.loading" class="flex justify-center pt-10">
        <div
          class="my-20 p-3 text-2xl text-center shadow-violet-700 shadow-md w-72 h-16 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
        >
          <i class="fa-solid fa-spinner animate-spin px-4"></i>
          Lưu
        </div>
      </div>

      <div class="flex justify-center pt-10 ml-10">
        <button
          @click="cancel()"
          class="my-20 p-3 text-2xl text-center shadow-violet-700 shadow-md w-72 h-16 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300"
        >
          Hủy
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import { infoStore } from "../stores/info.store";
import { alertStore } from "../stores/alert.store";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const useInfo = infoStore();
const useAlertStore = alertStore();
const formatter = ref({
  date: "DD/MM/YYYY",
  Month: "MM",
});

async function update() {
  try {
    useAlertStore.loading = true;
    await useInfo.updateInfo();
    const redirectPath = route.query.redirect || {
      name: "profile",
    };
    router.push(redirectPath);
  } catch (error) {}
}

function cancel() {
  useInfo.getInfo();
  useAlertStore.loading = false;
  const redirectPath = route.query.redirect || {
    name: "profile",
  };
  router.push(redirectPath);
}
</script>

<style></style>
