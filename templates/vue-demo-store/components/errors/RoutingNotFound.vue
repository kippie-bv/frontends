<script setup lang="ts"></script>

<template>
  <section class="container mx-auto text-center my-20">
    <h1 class="text-4xl font-bold mb-3">{{ $t('pageNotFound.header')}}</h1>
    <p class="text-sm mb-3">
      {{ $t('pageNotFound.text') }}
    </p>
    <NuxtLink
      class="inline-flex justify-center items-center py-2 px-4 text-base font-medium text-center text-white bg-brand-primary rounded-lg hover:bg-gray-400"
      to="/"
    >
      {{$t('backToHomepage')}}
    </NuxtLink>
  </section>
</template>
