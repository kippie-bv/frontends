<script lang="ts">
export default {
  name: "CheckoutPage",
};
</script>
<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, requiredIf } from "@vuelidate/validators";
import { ClientApiError, ShopwareError } from "@shopware-pwa/types";

definePageMeta({
  layout: "checkout",
});

const { push } = useRouter();
const { getCountries } = useCountries();
const { getSalutations } = useSalutations();
const { pushInfo } = useNotifications();
const { t } = useI18n();
const {
  paymentMethods,
  shippingMethods,
  getPaymentMethods,
  getShippingMethods,
  createOrder,
} = useCheckout();
const { register, logout, isLoggedIn, isGuestSession, user } = useUser();
const {
  refreshSessionContext,
  selectedShippingMethod: shippingMethod,
  selectedPaymentMethod: paymentMethod,
  setShippingMethod,
  setPaymentMethod,
  activeShippingAddress,
  setActiveShippingAddress,
  activeBillingAddress,
  setActiveBillingAddress,
} = useSessionContext();
const { cart, cartItems, subtotal, totalPrice, shippingTotal, isVirtualCart } =
  useCart();
const { customerAddresses, loadCustomerAddresses } = useAddress();
const isLoading = reactive<{ [key: string]: boolean }>({});

const selectedShippingMethod = computed({
  get(): string {
    return shippingMethod.value?.id || "";
  },
  async set(shippingMethodId: string) {
    isLoading[shippingMethodId] = true;
    await setShippingMethod({ id: shippingMethodId });
    isLoading[shippingMethodId] = false;
  },
});
const selectedPaymentMethod = computed({
  get(): string {
    return paymentMethod.value?.id || "";
  },
  async set(paymentMethodId: string) {
    isLoading[paymentMethodId] = true;
    await setPaymentMethod({ id: paymentMethodId });
    isLoading[paymentMethodId] = false;
  },
});

const selectedShippingAddress = computed({
  get(): string {
    return activeShippingAddress.value?.id || "";
  },
  async set(shippingAddressId: string) {
    isLoading[`shipping-${shippingAddressId}`] = true;
    await setActiveShippingAddress({ id: shippingAddressId });
    if (shippingAddressId === selectedBillingAddress.value)
      state.customShipping = false;
    isLoading[`shipping-${shippingAddressId}`] = false;
  },
});

const selectedBillingAddress = computed({
  get(): string {
    return activeBillingAddress.value?.id || "";
  },
  async set(billingAddressId: string) {
    isLoading[`billing-${billingAddressId}`] = true;
    await setActiveBillingAddress({ id: billingAddressId });
    if (billingAddressId === selectedShippingAddress.value)
      state.customShipping = false;
    isLoading[`billing-${billingAddressId}`] = false;
  },
});

const isCartLoading = computed(() => {
  return !cart.value;
});

const isCheckoutAvailable = computed(() => {
  return cartItems.value.length > 0;
});

const isUserSession = computed(() => isLoggedIn.value || isGuestSession.value);

const state = reactive({
  salutationId: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  guest: false,
  billingAddress: {
    street: "",
    zipcode: "",
    city: "",
    countryId: "",
  },
  customShipping: false,
});

const terms = reactive({
  tos: false,
  revocation: false,
});

const termsBox = ref();

const rules = computed(() => ({
  salutationId: {
    required,
  },
  firstName: {
    required,
    minLength: minLength(3),
  },
  lastName: {
    required,
    minLength: minLength(3),
  },
  email: {
    required,
    email,
  },
  password: {
    required: requiredIf(() => {
      return !state.guest;
    }),
    minLength: minLength(8),
  },
  billingAddress: {
    street: {
      required,
      minLength: minLength(3),
    },
    zipcode: {
      required,
    },
    city: {
      required,
    },
    countryId: {
      required,
    },
  },
}));

const $v = useVuelidate(rules, state);

const placeOrder = async () => {
  placeOrderTriggered.value = true;

  if (!termsSelected.value) {
    termsBox.value.scrollIntoView();
    return;
  }

  isLoading["placeOrder"] = true;
  const order = await createOrder();
  isLoading["placeOrder"] = false;
  return push("/checkout/success/" + order.id);
};

const termsSelected = computed(() => {
  return terms.tos && (isVirtualCart.value ? terms.revocation : true);
});
const placeOrderTriggered = ref(false);

onMounted(async () => {
  await refreshSessionContext();

  isLoading["shippingAddress"] = true;
  isLoading["shippingMethods"] = true;
  isLoading["paymentMethods"] = true;

  Promise.any([
    isLoggedIn.value ? loadCustomerAddresses() : null,
    !isVirtualCart.value ? getShippingMethods() : null,
    getPaymentMethods(),
  ]).finally(() => {
    isLoading["shippingAddress"] = false;
    isLoading["shippingMethods"] = false;
    isLoading["paymentMethods"] = false;
  });
});

const registerErrors = ref<ShopwareError[]>([]);
const invokeSubmit = async () => {
  $v.value.$touch();
  registerErrors.value = [];
  const valid = await $v.value.$validate();
  if (valid) {
    try {
      const response = await register(state);
      if (!response.active) {
        pushInfo(t("checkout.messages.checkoutSignInSuccess"));
        await push("/");
      }
    } catch (error) {
      const e = error as ClientApiError;
      registerErrors.value = e.messages;
    }
  }
};
async function invokeLogout() {
  await logout();
  await push("/");
}

const loginModalController = useModal();
const addAddressModalController = useModal();
</script>

<template>
  <div class="m-10">
    <SharedModal :controller="loginModalController">
      <AccountLoginForm
        @close="loginModalController.close"
        @success="loginModalController.close"
      />
    </SharedModal>
    <SharedModal :controller="addAddressModalController">
      <AccountAddressForm />
    </SharedModal>
    <div
      v-if="isCheckoutAvailable || isCartLoading"
      class="checkout-inner"
      :class="{
        'opacity-20': isCartLoading,
      }"
    >
      <div class="md:grid md:grid-cols-2 md:gap-6">
        <div class="md:col-span-1">
          <div class="grid gap-4 shadow px-4 py-5 bg-white sm:p-6 mb-8">
            <div>
              <h3 class="text-lg font-medium text-gray-900 m-0">
                {{ $t("checkout.personalInformationLabel") }}
              </h3>
              <div class="text-sm text-gray-600">
                {{ $t("checkout.personalInformationInfo") }}
              </div>
            </div>
            <form
              v-if="!isUserSession"
              id="checkout-billing-address"
              class="grid gap-8"
              name="checkout-billing-address"
              method="post"
              @submit.prevent="invokeSubmit"
            >
              <div
                v-if="registerErrors.length"
                class="bg-red-200 border-l-4 border-red-500 text-red-700 p-4"
                role="alert"
              >
                <p class="font-bold">Error!!!</p>
                <ul>
                  <li v-for="error in registerErrors" :key="error.detail">
                    {{ error.detail }}
                  </li>
                </ul>
              </div>
              <div class="text-sm">
                {{ $t("checkout.register") }} {{ $t("checkout.or") }}
                <a
                  href="#"
                  class="whitespace-nowrap font-medium text-brand-primary hover:text-brand-dark"
                  data-testid="checkout-sign-in-link"
                  @click="loginModalController.open"
                >
                  {{ $t("checkout.signIn") }}
                </a>
                <p class="text-gray-500">{{ $t("checkout.signInToOrder") }}</p>
              </div>
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6">
                  <label
                    for="salutation"
                    class="block text-sm font-medium text-gray-700"
                    >{{ $t("form.salutation") }}</label
                  >
                  <select
                    id="salutation"
                    v-model="state.salutationId"
                    required
                    name="salutation"
                    autocomplete="salutation-name"
                    class="mt-1 block w-full p-2.5 border border-gray-300 text-gray-900 text-sm rounded-md shadow-sm focus:ring-brand-light focus:border-brand-light"
                    data-testid="checkout-pi-salutation-select"
                    @blur="$v.salutationId.$touch()"
                  >
                    <option disabled selected value="">
                      {{ $t("form.chooseSalutation") }}
                    </option>
                    <option
                      v-for="salutation in getSalutations"
                      :key="salutation.id"
                      :value="salutation.id"
                    >
                      {{ salutation.displayName }}
                    </option>
                  </select>
                  <span
                    v-if="$v.salutationId.$error"
                    class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300"
                  >
                    {{ $v.salutationId.$errors[0].$message }}
                  </span>
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="first-name"
                    class="block text-sm font-medium text-gray-700"
                    >{{ $t("form.firstName") }}</label
                  >
                  <input
                    id="first-name"
                    v-model="state.firstName"
                    type="text"
                    required
                    name="first-name"
                    :placeholder="$t('form.firstNamePlaceholder')"
                    class="mt-1 block w-full p-2.5 border border-gray-300 text-gray-900 text-sm rounded-md shadow-sm focus:ring-brand-light focus:border-brand-light"
                    data-testid="checkout-pi-first-name-input"
                    @blur="$v.firstName.$touch()"
                  />
                  <span
                    v-if="$v.firstName.$error"
                    class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300"
                  >
                    {{ $v.firstName.$errors[0].$message }}
                  </span>
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="last-name"
                    class="block text-sm font-medium text-gray-700"
                    >{{ $t("form.lastName") }}</label
                  >
                  <input
                    id="last-name"
                    v-model="state.lastName"
                    type="text"
                    required
                    name="last-name"
                    :placeholder="$t('form.lastNamePlaceholder')"
                    class="mt-1 block w-full p-2.5 border border-gray-300 text-gray-900 text-sm rounded-md shadow-sm focus:ring-brand-light focus:border-brand-light"
                    data-testid="checkout-pi-last-name-input"
                    @blur="$v.lastName.$touch()"
                  />
                  <span
                    v-if="$v.lastName.$error"
                    class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300"
                  >
                    {{ $v.lastName.$errors[0].$message }}
                  </span>
                </div>

                <div class="col-span-6">
                  <div class="flex items-center">
                    <input
                      id="create-account"
                      v-model="state.guest"
                      type="checkbox"
                      data-testid="checkout-create-account-checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="create-account"
                      class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >{{ $t("checkout.notCreateAccount") }}</label
                    >
                  </div>
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="email-address"
                    class="block text-sm font-medium text-gray-700"
                    >{{ $t("form.email") }}</label
                  >
                  <input
                    id="email-address"
                    v-model="state.email"
                    type="email"
                    required
                    name="email-address"
                    :placeholder="$t('form.emailPlaceholder')"
                    autocomplete="off"
                    class="mt-1 block w-full p-2.5 border border-gray-300 text-gray-900 text-sm rounded-md shadow-sm focus:ring-brand-light focus:border-brand-light"
                    data-testid="checkout-pi-email-input"
                    @blur="$v.email.$touch()"
                  />
                  <span
                    v-if="$v.email.$error"
                    class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300"
                  >
                    {{ $v.email.$errors[0].$message }}
                  </span>
                </div>
                <div class="col-span-6 sm:col-span-3">
                  <div v-if="!state.guest">
                    <label
                      for="password"
                      class="block text-sm font-medium text-gray-700"
                      >{{ $t("form.password") }}</label
                    >
                    <input
                      id="password"
                      v-model="state.password"
                      autocomplete="off"
                      type="password"
                      name="password"
                      :placeholder="$t('form.passwordPlaceholder')"
                      class="mt-1 block w-full p-2.5 border border-gray-300 text-gray-900 text-sm rounded-md shadow-sm focus:ring-brand-light focus:border-brand-light"
                      @blur="$v.password.$touch()"
                    />
                    <span
                      v-if="$v.password.$error"
                      class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300"
                    >
                      {{ $v.password.$errors[0].$message }}
                    </span>
                  </div>
                </div>

                <div class="col-span-6">
                  <label
                    for="street-address"
                    class="block text-sm font-medium text-gray-700"
                    >{{ $t("form.streetAddress") }}</label
                  >
                  <input
                    id="street-address"
                    v-model="state.billingAddress.street"
                    type="text"
                    required
                    name="street-address"
                    :placeholder="$t('form.streetPlaceholder')"
                    autocomplete="street-address"
                    class="mt-1 block w-full p-2.5 border border-gray-300 text-gray-900 text-sm rounded-md shadow-sm focus:ring-brand-light focus:border-brand-light"
                    data-testid="checkout-pi-street-address-input"
                    @blur="$v.billingAddress.street.$touch()"
                  />
                  <span
                    v-if="$v.billingAddress.street.$error"
                    class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300"
                  >
                    {{ $v.billingAddress.street.$errors[0].$message }}
                  </span>
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="postal-code"
                    class="block text-sm font-medium text-gray-700"
                    >{{ $t("form.postalCode") }}</label
                  >
                  <input
                    id="postal-code"
                    v-model="state.billingAddress.zipcode"
                    type="text"
                    required
                    name="postal-code"
                    :placeholder="$t('form.postalCodePlaceholder')"
                    autocomplete="postal-code"
                    class="mt-1 block w-full p-2.5 border border-gray-300 text-gray-900 text-sm rounded-md shadow-sm focus:ring-brand-light focus:border-brand-light"
                    data-testid="checkout-pi-zip-code-input"
                    @blur="$v.billingAddress.zipcode.$touch()"
                  />
                  <span
                    v-if="$v.billingAddress.zipcode.$error"
                    class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300"
                  >
                    {{ $v.billingAddress.zipcode.$errors[0].$message }}
                  </span>
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="city"
                    class="block text-sm font-medium text-gray-700"
                    >{{ $t("form.city") }}</label
                  >
                  <input
                    id="city"
                    v-model="state.billingAddress.city"
                    type="text"
                    required
                    name="city"
                    :placeholder="$t('form.cityPlaceholder')"
                    autocomplete="address-level2"
                    class="mt-1 block w-full p-2.5 border border-gray-300 text-gray-900 text-sm rounded-md shadow-sm focus:ring-brand-light focus:border-brand-light"
                    data-testid="checkout-pi-city-input"
                    @blur="$v.billingAddress.city.$touch()"
                  />
                  <span
                    v-if="$v.billingAddress.city.$error"
                    class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300"
                  >
                    {{ $v.billingAddress.city.$errors[0].$message }}
                  </span>
                </div>

                <div class="col-span-6">
                  <label
                    for="country"
                    class="block text-sm font-medium text-gray-700"
                    >{{ $t("form.country") }}</label
                  >
                  <select
                    id="country"
                    v-model="state.billingAddress.countryId"
                    required
                    name="country"
                    autocomplete="country-name"
                    class="mt-1 block w-full p-2.5 border border-gray-300 text-gray-900 text-sm rounded-md shadow-sm focus:ring-brand-light focus:border-brand-light"
                    data-testid="checkout-pi-country-input"
                    @blur="$v.billingAddress.countryId.$touch()"
                  >
                    <option disabled selected value="">
                      {{ $t("form.chooseCountry") }}
                    </option>
                    <option
                      v-for="country in getCountries"
                      :key="country.id"
                      :value="country.id"
                    >
                      {{ country.name }}
                    </option>
                  </select>
                  <span
                    v-if="$v.billingAddress.countryId.$error"
                    class="pt-1 text-sm text-red-600 focus:ring-brand-primary border-gray-300"
                  >
                    {{ $v.billingAddress.countryId.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <button
                type="submit"
                class="flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-primary"
                data-testid="checkout-pi-submit-button"
              >
                {{ $t("form.save") }}
              </button>
            </form>
            <div v-else>
              {{ $t("checkout.loggedInAs") }} {{ user?.firstName }}
              <span
                v-if="isGuestSession"
                class="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
                >{{ $t("checkout.guest") }}</span
              >! {{ $t("checkout.logOut") }}
              <a
                href="#"
                class="text-brand-primary hover:text-brand-dark"
                data-testid="checkout-logout"
                @click="invokeLogout"
                >{{ $t("checkout.here") }}</a
              >.
            </div>
          </div>
          <fieldset
            v-if="!isVirtualCart"
            class="grid gap-4 shadow px-4 py-5 bg-white sm:p-6 mb-8"
          >
            <legend class="pt-5">
              <h3 class="text-lg font-medium text-gray-900 m-0">
                {{ $t("checkout.shippingMethodLabel") }}
              </h3>
              <div class="text-sm text-gray-600">
                {{ $t("checkout.selectPaymentMethod") }}
              </div>
            </legend>
            <div v-if="isLoading['shippingMethods']" class="w-60 h-24">
              <div
                class="flex animate-pulse flex-row items-top pt-4 h-full space-x-5"
              >
                <div class="w-4 bg-gray-300 h-4 mt-1 rounded-full" />
                <div class="flex flex-col space-y-3">
                  <div class="w-36 bg-gray-300 h-6 rounded-md" />
                  <div class="w-24 bg-gray-300 h-6 rounded-md" />
                </div>
              </div>
            </div>
            <div
              v-for="singleShippingMethod in shippingMethods"
              v-else
              :key="singleShippingMethod.id"
              class="flex items-center w-full"
            >
              <input
                :id="singleShippingMethod.id"
                v-model="selectedShippingMethod"
                :value="singleShippingMethod.id"
                name="shipping-method"
                type="radio"
                class="focus:ring-brand-primary h-4 w-4 border-gray-300"
                :data-testid="`checkout-shipping-method-${singleShippingMethod.id}`"
              />
              <label
                :for="singleShippingMethod.id"
                :class="{ 'animate-pulse': isLoading[singleShippingMethod.id] }"
                class="ml-2 block text-sm font-medium text-gray-700 w-full"
              >
                <div class="flex justify-between">
                  <div>
                    {{ singleShippingMethod.translated?.name }}
                    <span
                      v-if="singleShippingMethod.translated?.description"
                      class="italic text-sm text-gray-500 block"
                    >
                      {{ singleShippingMethod.translated.description }}</span
                    >
                  </div>
                  <div v-if="singleShippingMethod.media?.url">
                    <img
                      :src="singleShippingMethod.media.url"
                      alt="payment-image"
                    />
                  </div>
                </div>
              </label>
            </div>
          </fieldset>
          <fieldset class="grid gap-4 shadow px-4 py-5 bg-white sm:p-6">
            <legend class="pt-5">
              <h3 class="text-lg font-medium text-gray-900 m-0">
                {{ $t("checkout.paymentMethodLabel") }}
              </h3>
              <div class="text-sm text-gray-600">
                {{ $t("checkout.selectPaymentMethod") }}
              </div>
            </legend>
            <div v-if="isLoading['paymentMethods']" class="w-60 h-24">
              <div
                class="flex animate-pulse flex-row items-top pt-4 h-full space-x-5"
              >
                <div class="w-4 bg-gray-300 h-4 mt-1 rounded-full" />
                <div class="flex flex-col space-y-3">
                  <div class="w-36 bg-gray-300 h-6 rounded-md" />
                  <div class="w-24 bg-gray-300 h-6 rounded-md" />
                </div>
              </div>
            </div>
            <div
              v-for="singlePaymentMethod in paymentMethods"
              v-else
              :key="singlePaymentMethod.id"
              class="flex items-center"
            >
              <input
                :id="singlePaymentMethod.id"
                v-model="selectedPaymentMethod"
                :value="singlePaymentMethod.id"
                name="payment-method"
                type="radio"
                class="focus:ring-brand-primary h-4 w-4 border-gray-300"
                :data-testid="`checkout-payment-method-${singlePaymentMethod.id}`"
              />
              <label
                :for="singlePaymentMethod.id"
                :class="{ 'animate-pulse': isLoading[singlePaymentMethod.id] }"
                class="ml-2 block text-sm font-medium text-gray-700"
              >
                {{ singlePaymentMethod.translated?.name }}
              </label>
            </div>
          </fieldset>
          <fieldset
            v-if="isLoggedIn"
            class="grid gap-4 shadow px-4 py-5 bg-white sm:p-6"
          >
            <legend class="pt-5">
              <h3 class="text-lg font-medium text-gray-900 m-0">
                {{ $t("checkout.billingAddressLabel") }}
              </h3>
              <div class="text-sm text-gray-600">
                {{ $t("checkout.selectBillingAddress") }}
              </div>
            </legend>
            <div v-if="isLoading['paymentMethods']" class="w-60 h-24">
              <div
                class="flex animate-pulse flex-row items-top pt-4 h-full space-x-5"
              >
                <div class="w-4 bg-gray-300 h-4 mt-1 rounded-full" />
                <div class="flex flex-col space-y-3">
                  <div class="w-36 bg-gray-300 h-6 rounded-md" />
                  <div class="w-24 bg-gray-300 h-6 rounded-md" />
                </div>
              </div>
            </div>
            <div
              v-for="address in customerAddresses"
              v-else
              :key="address.id"
              class="flex mb-3"
            >
              <input
                :id="`billing-${address.id}`"
                v-model="selectedBillingAddress"
                :value="address.id"
                name="billing-address"
                type="radio"
                class="focus:ring-brand-primary h-4 w-4 border-gray-300"
                :data-testid="`checkout-billing-address-${address.id}`"
              />
              <label
                :for="`billing-${address.id}`"
                :class="{ 'animate-pulse': isLoading[`billing-${address.id}`] }"
                class="ml-2 field-label"
              >
                <AccountAddressCard
                  :key="address.id"
                  :address="address"
                  :countries="getCountries"
                  :salutations="getSalutations"
                  :can-set-default="false"
                />
              </label>
            </div>
            <button
              type="button"
              class="flex font-medium text-brand-dark"
              @click="addAddressModalController.open"
            >
              {{ $t("checkout.addNewBillingAddress") }}
            </button>
            <template v-if="!isVirtualCart">
              <label for="customShipping" class="field-label">
                <input
                  id="customShipping"
                  v-model="state.customShipping"
                  name="privacy"
                  type="checkbox"
                  class="mt-1 focus:ring-indigo-500 h-4 w-4 border text-indigo-600 rounded"
                />
                {{ $t("checkout.differentBillingAddress") }}
              </label>
              <div v-if="state.customShipping">
                <div
                  v-for="address in customerAddresses"
                  :key="address.id"
                  class="flex mb-3"
                >
                  <input
                    :id="`shipping-${address.id}`"
                    v-model="selectedShippingAddress"
                    :value="address.id"
                    name="shipping-address"
                    type="radio"
                    class="focus:ring-brand-primary h-4 w-4 border-gray-300"
                    :data-testid="`checkout-shipping-address-${address.id}`"
                  />
                  <label
                    :for="`shipping-${address.id}`"
                    :class="{
                      'animate-pulse': isLoading[`shipping-${address.id}`],
                    }"
                    class="ml-2 field-label"
                  >
                    <AccountAddressCard
                      :key="address.id"
                      :address="address"
                      :countries="getCountries"
                      :salutations="getSalutations"
                      :can-set-default="false"
                    />
                  </label>
                </div>
                <button
                  type="button"
                  class="flex font-medium text-brand-dark"
                  @click="addAddressModalController.open"
                >
                  {{ $t("checkout.addNewShippingAddress") }}
                </button>
              </div>
            </template>
          </fieldset>

          <fieldset
            ref="termsBox"
            class="grid gap-4 shadow px-4 py-5 bg-white sm:p-6"
            data-testid="checkout-terms-box"
          >
            <legend class="pt-5">
              <h3 class="text-lg font-medium text-gray-900 m-0">
                {{ $t("checkout.termsAdnConditions") }}
              </h3>
            </legend>
            <div class="flex items-center" data-testid="checkout-t&c-tos">
              <input
                id="tos"
                v-model="terms.tos"
                :value="terms.tos"
                name="tos"
                type="checkbox"
                class="focus:ring-brand-primary h-4 w-4 border-gray-300 shrink-0"
                data-testid="checkout-t&c-checkbox-tos"
              />
              <label
                for="tos"
                class="ml-2 block text-sm font-medium text-gray-700"
                :class="{ 'text-red': !termsSelected && placeOrderTriggered }"
              >
                {{ $t("checkout.termsAdnConditionsLabel") }}
              </label>
            </div>

            <div
              v-if="isVirtualCart"
              class="flex items-center"
              data-testid="checkout-t&c-revocation"
            >
              <input
                id="revocation"
                v-model="terms.revocation"
                :value="terms.revocation"
                name="revocation"
                type="checkbox"
                class="focus:ring-brand-primary h-4 w-4 border-gray-300 shrink-0"
                data-testid="checkout-t&c-checkbox-revocation"
              />
              <label
                for="revocation"
                class="ml-2 block text-sm font-medium text-gray-700"
                :class="{ 'text-red': !termsSelected && placeOrderTriggered }"
              >
                {{ $t("checkout.digitalTerms") }}
              </label>
            </div>
          </fieldset>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-1">
          <div class="grid gap-4 shadow px-4 py-5 bg-white sm:p-6">
            <div>
              <h3 class="text-lg font-medium text-gray-900 m-0">
                {{ $t("checkout.orderSummary") }}
              </h3>
              <p class="text-sm text-gray-600">
                {{ $t("checkout.orderSummaryLabel") }}
              </p>
            </div>
            <ul role="list" class="-my-4 divide-y divide-gray-200 pl-0">
              <li
                v-for="cartItem in cartItems"
                :key="cartItem.id"
                class="flex py-6"
              >
                <CheckoutCartItem :cart-item="cartItem" />
              </li>
            </ul>

            <div class="flex justify-between text-sm text-gray-500">
              <p>{{ $t("checkout.subtotal") }}</p>
              <SharedPrice
                :value="subtotal"
                class="text-gray-900 font-medium"
                data-testid="cart-subtotal"
              />
            </div>

            <div
              class="flex pb-4 border-b justify-between text-sm text-gray-500"
            >
              <p>{{ $t("checkout.shippingEstimate") }}</p>
              <SharedPrice
                :value="shippingTotal"
                class="text-gray-900 font-medium"
                data-testid="cart-subtotal"
              />
            </div>

            <div class="flex justify-between text-gray-900 font-medium">
              <p>{{ $t("checkout.orderTotal") }}l</p>
              <SharedPrice :value="totalPrice" data-testid="cart-subtotal" />
            </div>

            <div class="mt-4">
              <div class="text-right">
                <span v-if="!isUserSession" class="text-sm text-gray-600">{{
                  $t("checkout.loginRequired")
                }}</span>
                <button
                  :disabled="!isUserSession"
                  type="button"
                  :class="{
                    grayscale: !isUserSession,
                    'opacity-50 cursor-not-allowed hover:bg-brand-primary':
                      !isUserSession,
                    'animate-pulse': isLoading['placeOrder'],
                  }"
                  class="w-full flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white bg-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  data-testid="checkout-place-order-button"
                  @click="placeOrder"
                >
                  {{ $t("checkout.placeOrder") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <h1 class="m-10 text-2xl font-medium text-gray-900">
        {{ $t("cart.emptyCartLabel") }}
      </h1>
      <NuxtLink
        class="inline-flex justify-center py-2 px-4 my-8 border border-transparent text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-light"
        to="/"
        data-testid="checkout-go-home-link"
      >
        {{ $t("checkout.goToHomepage") }}
      </NuxtLink>
    </div>
  </div>
</template>
