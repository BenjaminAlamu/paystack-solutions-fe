<template>
  <div
    class="min-h-screen flex flex-col justify-center w-full items-center bg-white text-gray-800 px-6 py-12"
  >
    <div
      class="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
    >
      <RouterLink to="/">
        <h1 class="text-4xl font-bold text-green-600 text-center mb-2 cursor-pointer">
          Grundy LLC
        </h1>
      </RouterLink>
      <h2 class="text-md font-bold text-center mb-6 text-gray-800">
        Login to your account
      </h2>

      <form @submit.prevent="register">

        <main class="w-full px-2 my-2">
          <GlInput
            name="email"
            v-model="form.email"
            placeholder="e.g test@benjamin.com"
            labelText="Email"
            :isInvalid="v$.email.$error"
            errorMessage="Email is a compulsory field and must be valid"
          />

          <GlInput
            name="password"
            v-model="form.password"
            placeholder="e.g ********"
            labelText="Password"
            :isInvalid="v$.password.$error"
            errorMessage="Password is a compulsory field and a minimum of 8 characters"
            hasIcon
            :type="showPassword ? 'text' : 'password'"
            @reveal="showPassword = !showPassword"
          >
            <template #eyeReveal="{ type, reveal }">
              <img
                @click="reveal"
                v-if="type === 'password'"
                class="absolute top-9 right-5 cursor-pointer"
                src="@/assets/icons/eye.svg"
              />
              <img
                @click="reveal"
                v-else
                class="absolute top-9 right-5 cursor-pointer"
                src="@/assets/icons/eye-slash.svg"
              />
            </template>
          </GlInput>
        </main>

        <button type="submit" class="btn-primary w-full">
          {{ isLoggingIn ? "Loading..." : " Login" }}
        </button>
      </form>

      <p class="mt-8 text-center text-sm text-gray-600">
        Don't have an account?
        <RouterLink
          to="/register"
          class="text-green-700 font-medium hover:underline"
          >Register</RouterLink
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import GlInput from "@/components/gl-input.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import type { loginUserType } from "@/types";
import { useLoginUser } from "@/hooks";
import type { AxiosError } from "axios";
import { toast } from "vue3-toastify";
import { useAuthState } from "@/store/auth";
import { useCartStore } from '@/store/cart'

const authRules = {
  email: { required, email },
  password: { required, minLength: minLength(8) },
};
const form = ref<loginUserType>({} as loginUserType);
const router = useRouter();

const { handleLoginUser, isLoggingIn } = useLoginUser();

const v$ = useVuelidate(authRules, form);
const showPassword = ref(false);
const auth = useAuthState();
const cart = useCartStore()

const register = async () => {
  const result = await v$.value.$validate();
  if (!result) return;
  handleLoginUser(form.value, {
    onSuccess(data) {
      auth.setToken(data.data.accessToken);
      auth.setUser(data.data.user);
      if(cart.items.length > 1){
        return router.push("/cart");
      }
      return router.push("/");
    },
    onError(err) {
      const error = err as unknown as AxiosError<any>;
      toast.error(error.response?.data?.message);
    },
  });
};
</script>
