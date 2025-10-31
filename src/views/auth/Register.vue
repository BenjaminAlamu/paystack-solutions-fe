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
        Create Your Account
      </h2>

      <form @submit.prevent="register">

        <main class="w-full px-2 my-2">
          <GlInput
            name="firstName"
            v-model="form.firstName"
            placeholder="e.g Benjamin"
            labelText="First Name"
            :isInvalid="v$.firstName.$error"
            errorMessage="First name is Required"
          />

          <GlInput
            name="lastName"
            v-model="form.lastName"
            placeholder="e.g Alamu"
            labelText="Last Name"
            :isInvalid="v$.lastName.$error"
            errorMessage="Last name is Required"
          />

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
          {{ isCreatingUserAccount ? "Loading..." : " Register as User" }}
        </button>
      </form>

      <p class="mt-8 text-center text-sm text-gray-600">
        Already have an account?
        <RouterLink
          to="/login"
          class="text-green-700 font-medium hover:underline"
          >Login</RouterLink
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
import type { newUserType } from "@/types";
import { useRegisterUser } from "@/hooks";
import type { AxiosError } from "axios";
import { toast } from "vue3-toastify";
import { useAuthState } from "@/store/auth";
import { useCartStore } from '@/store/cart'

const authRules = {
  email: { required, email },
  firstName: { required },
  lastName: { required },
  password: { required, minLength: minLength(8) },
};
const form = ref<newUserType>({} as newUserType);
const router = useRouter();

const { handleCreateUserAccount, isCreatingUserAccount } = useRegisterUser();

const v$ = useVuelidate(authRules, form);
const showPassword = ref(false);
const auth = useAuthState();
const cart = useCartStore()

const register = async () => {
  const result = await v$.value.$validate();
  if (!result) return;
  handleCreateUserAccount(form.value, {
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

