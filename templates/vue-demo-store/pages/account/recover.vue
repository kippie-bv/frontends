<script lang="ts">
export default {
  name: "RecoverPassword",
};
const { t } = useI18n()

useBreadcrumbs([
  {
    name: t('breadcrumbs.accountOverview'),
    path: "/account",
  },
  {
    
    name: t('breadcrumbs.recoverPassword'),
    path: "/account/recover",
  },
]);
</script>

<template>
  <div class="recover-wrapper">
    <AccountRecoverPassword>
      <template #action>
        <div class="text-center space-y-2">
          <p class="py-2 px-4 text-lg text-brand-primary">
            {{$t('recoveryPassword.label')}}
          </p>
          <NuxtLink
            to="/register"
            class="text-sm font-medium px-4 text-gray-600 focus:outline-none underline"
          >
             {{ $t('recoveryPassword.register') }}
          </NuxtLink>
          <NuxtLink
            to="/login"
            class="flex justify-center align-center text-sm font-medium text-gray-600 py-2 px-4 focus:outline-none underline"
          >
           {{ $t('recoveryPassword.orLogin') }}
          </NuxtLink>
        </div>
      </template>
    </AccountRecoverPassword>
  </div>
</template>
