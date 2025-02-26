<script setup lang="ts">
import { BoxLayout, DisplayMode } from "@shopware-pwa/composables-next";
import {
  getProductName,
  getProductThumbnailUrl,
  getProductRoute,
  getProductFromPrice,
} from "@shopware-pwa/helpers-next";
import {
  ClientApiError,
  Product,
  PropertyGroupOption,
} from "@shopware-pwa/types";

const { pushSuccess, pushError } = useNotifications();

const props = withDefaults(
  defineProps<{
    product: Product;
    layoutType?: BoxLayout;
    displayMode?: DisplayMode;
  }>(),
  {
    layoutType: "standard",
    displayMode: "standard",
  }
);
const { product } = toRefs(props);
const { addToCart, isInCart, count } = useAddToCart(product);

const { addToWishlist, removeFromWishlist, isInWishlist } =
  useProductWishlist(product);

const toggleWishlistProduct = async () => {
  if (!isInWishlist.value) {
    try {
      await addToWishlist();
      return pushSuccess(
        t(`product.messages.addedToWishlist`, {
          p: props.product?.translated?.name,
        })
      );
    } catch (error) {
      const e = error as ClientApiError;
      const reason = e?.messages?.[0]?.detail
        ? `Reason: ${e?.messages?.[0]?.detail}`
        : "";
      return pushError(
        `${props.product?.translated?.name} cannot be added to wishlist.\n${reason}`,
        {
          timeout: 5000,
        }
      );
    }
  }
  removeFromWishlist();
};

const addToCartProxy = async () => {
  await addToCart();
  pushSuccess(
    t(`cart.messages.addedToCart`, { p: props.product?.translated?.name })
  );
};

const fromPrice = getProductFromPrice(props.product);

const imageElement = ref(null);
const { height } = useElementSize(imageElement);

const DEFAULT_THUMBNAIL_SIZE = 10;
function roundUp(num: number) {
  return num ? Math.ceil(num / 100) * 100 : DEFAULT_THUMBNAIL_SIZE;
}

const srcPath = computed(() => {
  return `${getProductThumbnailUrl(product.value)}?&height=${roundUp(
    height.value
  )}&fit=crop`;
});
</script>

<template>
  <div
    class="sw-product-card group relative max-w-full inline-block max-w-sm bg-white border border-gray-200 rounded-md shadow transform transition duration-300 hover:scale-101"
    data-testid="product-box"
  >
    <div
      :class="[
        'w-full rounded-md overflow-hidden hover:opacity-75',
        layoutType === 'image' ? 'h-80' : 'h-60',
      ]"
    >
      <RouterLink :to="getProductRoute(product)" class="overflow-hidden">
        <img
          ref="imageElement"
          :src="srcPath"
          :alt="getProductName({ product }) || ''"
          class="transform transition duration-400 hover:scale-120"
          :class="{
            'w-full h-full': true,
            'object-cover':
              displayMode === 'cover' ||
              (displayMode === 'standard' && layoutType === 'image'),
            'object-contain': displayMode === 'contain',
            'object-scale-down':
              displayMode === 'standard' && layoutType !== 'image',
          }"
          data-testid="product-box-img"
        />
      </RouterLink>
    </div>
    <button
      aria-label="Add to wishlist"
      type="button"
      class="absolute top-2 right-2 hover:animate-count-infinite hover:animate-heart-beat"
      data-testid="product-box-toggle-wishlist-button"
      @click="toggleWishlistProduct"
    >
      <client-only>
        <div
          v-if="isInWishlist"
          class="h-7 w-7 i-carbon-favorite-filled c-red-500"
          data-testid="product-box-wishlist-icon-in"
        ></div>
        <div
          v-else
          class="h-7 w-7 i-carbon-favorite"
          data-testid="product-box-wishlist-icon-not-in"
        ></div>
        <template #placeholder>
          <div class="h-7 w-7 i-carbon-favorite"></div>
        </template>
      </client-only>
    </button>
    <div class="min-h-20px px-2">
      <span
        v-for="option in product?.options"
        :key="option.id"
        class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
      >
        {{ (option as PropertyGroupOption).group.name }}:
        {{ (option as PropertyGroupOption).name }}
      </span>
    </div>
    <div class="px-4 pb-4">
      <RouterLink
        class="line-clamp-2"
        :to="getProductRoute(product)"
        data-testid="product-box-product-name-link"
      >
        <h5
          class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white min-h-60px"
        >
          {{ getProductName({ product }) }}
        </h5>
      </RouterLink>
      <div class="flex items-center justify-between">
        <div class="">
          <SharedListingProductPrice
            :product="product"
            class="ml-auto"
            data-testid="product-box-product-price"
          />
        </div>

        <button
          v-if="!fromPrice"
          type="button"
          class="justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transform transition duration-400 md:hover:scale-120 flex"
          :class="{
            'text-white bg-blue-500 hover:bg-blue-600': !isInCart,
            'text-gray-500 bg-gray-100': isInCart,
          }"
          data-testid="add-to-cart-button"
          @click="addToCartProxy"
        >
          {{ $t("product.addToCart") }}
          <div v-if="isInCart" class="flex ml-2">
            <div class="w-5 h-5 i-carbon-shopping-bag text-gray-600" />
            {{ count }}
          </div>
        </button>
        <RouterLink
          v-else
          :to="getProductRoute(product)"
          class="justify-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transform transition duration-400 hover:scale-120"
        >
          <span data-testid="product-box-product-show-details"> Details </span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
