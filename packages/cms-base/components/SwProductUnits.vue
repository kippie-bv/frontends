<script setup lang="ts">
import { Product } from "@shopware-pwa/types";
import deepMerge from "../helpers/deepMerge";
import getTranslations from "../helpers/getTranslations";
import SwSharedPrice from "./SwSharedPrice.vue";

const props = withDefaults(
  defineProps<{
    product: Product;
    showContent?: boolean;
  }>(),
  {
    showContent: true,
  }
);

type Translations = {
  product: {
    content: string;
  };
};

let translations: Translations = {
  product: {
    content: "Content",
  },
};

const globalTranslations = getTranslations();
translations = deepMerge(translations, globalTranslations) as Translations;

const purchaseUnit = computed(() => props.product?.purchaseUnit);
const unitName = computed(() => props.product?.unit?.translated?.name);
const referencePrice = computed(
  () => props.product?.calculatedPrice?.referencePrice?.price
);
const referenceUnit = computed(
  () => props.product?.calculatedPrice?.referencePrice?.referenceUnit
);
const referenceUnitName = computed(
  () => props.product?.calculatedPrice?.referencePrice?.unitName
);
</script>

<template>
  <div v-if="purchaseUnit" class="flex text-gray-500 justify-end gap-1">
    <template v-if="props.showContent">
      {{ translations.product.content }}: {{ purchaseUnit }} {{ unitName }}
    </template>
    <template v-if="referencePrice">
      (<SwSharedPrice :value="referencePrice" /> / {{ referenceUnit }}
      {{ referenceUnitName }} )
    </template>
  </div>
</template>
