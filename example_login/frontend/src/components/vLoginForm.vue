<template>
  <div>
    <Form
      @submit="handleLogin"
      :validation-schema="FormSchema"
      class="flex justify-center my-20 bg-gradient-to-l from-sky-100 to-sky-500/50 min-w-max max-w-xl rounded-3xl p-10 mx-auto text-lg"
    >
      <div>
        <div class="p-2">
          <div for="username">Tài khoản:</div>
          <Field name="username" type="text" class="rounded-md bg-gray-800/10" />
          <div class="text-red-900">
            <ErrorMessage name="username" class="error-feedback" />
          </div>
        </div>

        <div class="p-2">
          <div for="password">Mật khẩu</div>
          <Field name="password" type="password" class="rounded-md bg-gray-800/10" />
          <div class="text-red-900">
            <ErrorMessage name="password" class="error-feedback" />
          </div>
        </div>

        <div v-show="!useAlertStore.loading" class="flex justify-center pt-10">
          <button
            class="bg-teal-500 rounded-lg p-2 shadow-md w-44 hover:scale-125 duration-300"
          >
            Đăng nhập
          </button>
        </div>

        <div v-show="useAlertStore.loading" class="flex justify-center pt-10">
          <div class="bg-teal-500/50 rounded-lg p-2 shadow-md w-44 duration-300">
            <i class="fa-solid fa-spinner animate-spin px-4"></i>
            Đăng nhập
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>

<script setup>
import * as Yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { authStore } from "@/stores/auth.store";
import { alertStore } from "@/stores/alert.store";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const userAuthStore = authStore();
const useAlertStore = alertStore();

const FormSchema = Yup.object().shape({
  username: Yup.string()
    .required("Tên phải có giá trị.")
    .min(2, "Tên phải ít nhất 2 ký tự.")
    .max(50, "Tên có nhiều nhất 50 ký tự."),
  password: Yup.string()
    .required("mật khẩu phải có giá trị.")
    .min(2, "mật phải ít nhất 8 ký tự."),
});

async function handleLogin(user) {
  useAlertStore.loading = true;
  try {
    await userAuthStore.login(user);
    const redirectPath = route.query.redirect || {
      name: "trang2",
    };
    router.push(redirectPath);
    useAlertStore.loading = false;
  } catch (err) {
    useAlertStore.loading = false;
    useAlertStore.setError("sai tài khoản hoặc mật khẩu");
  }
}
</script>
