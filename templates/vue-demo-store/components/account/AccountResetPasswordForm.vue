<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, sameAs } from "@vuelidate/validators";
import { confirmPasswordReset } from "@shopware-pwa/api-client";
import { ClientApiError } from "@shopware-pwa/types";

const { apiInstance } = useShopwareContext();

const state = reactive({
  password: {
    newPassword: "",
    newPasswordConfirm: "",
  },
  error: "",
});

const rules = computed(() => ({
  password: {
    newPassword: {
      required,
      minLength: minLength(8),
    },
    newPasswordConfirm: {
      required,
      newPasswordConfirm: sameAs(state.password.newPassword),
    },
  },
}));

const $v = useVuelidate(rules, state);

const invokeReset = async (): Promise<void> => {
  const route = useRoute();
  const hashQuery = route.query.hash?.toString() || "";

  try {
    const isFormCorrect = await $v.value.$validate();

    if (!isFormCorrect) {
      return;
    } else {
      await confirmPasswordReset(
        {
          newPassword: state.password.newPasswordConfirm,
          hash: hashQuery,
        },
        apiInstance
      );
    }
  } catch (err) {
    const error = err as ClientApiError;
    state.error = error.messages[0].detail;
  }
};
</script>

<template>
  <div
    class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {{$t('resetPassword.header')}}
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="invokeReset">
        <div
          v-if="state.error"
          class="text-red-600 focus:ring-brand-primary border-gray-300 rounded"
        >
          {{ state.error }}
        </div>

        <div class="-space-y-px">
          <div>
            <label for="new-password" class="sr-only">{{$t('resetPassword.form.newPassword')}}</label>
            <input
              id="new-password"
              v-model="state.password.newPassword"
              name="new-password"
              type="password"
              autocomplete="new-password"
              required
              class="appearance-none rounded-none shadow-sm relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm"
              :placeholder="$t('form.newPasswordPlaceholder')"
            />
            <span
              v-if="$v.password.newPassword.$error"
              class="text-red-600 focus:ring-brand-primary border-gray-300 rounded"
            >
              {{ $v.password.newPassword.$errors[0].$message }}
            </span>
          </div>
          <div>
            <label for="confirm-password" class="sr-only"
              >{{ $t('resetPassword.form.repeatPassword') }}</label
            >
            <input
              id="confirm-password"
              v-model="state.password.newPasswordConfirm"
              name="confirm-password"
              type="password"
              autocomplete="repeat-password"
              required
              class="appearance-none rounded-none shadow-sm relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm"
              :placeholder="$t('form.repeatPasswordPlaceholder')"
            />
            <span
              v-if="$v.password.newPasswordConfirm.$error"
              class="text-red-600 focus:ring-brand-primary border-gray-300 rounded"
            >
              {{ $v.password.newPasswordConfirm.$errors[0].$message }}
            </span>
          </div>
        </div>

        <div>
          <button
            class="group relative w-full flex justify-center py-2 px-4 mb-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-primary"
            type="submit"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <div class="w-5 h-5 i-carbon-locked" />
            </span>
            {{ $t('resetPassword.form.button') }}
          
          </button>
          <slot name="action" />
        </div>
      </form>
    </div>
  </div>
</template>
