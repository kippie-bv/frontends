<script setup lang="ts">
const { isLoggedIn, logout, user } = useUser();

const loginModalController = useModal();

const isAccountMenuOpen = ref(false);

async function invokeLogout() {
  await logout();
  isAccountMenuOpen.value = false;
}
</script>
<template>
  <div class="md:w-auto">
    <div class="my-account-area">
      <div v-show="!isLoggedIn">
        <button
          class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
          data-testid="header-sign-in-link"
          @click="loginModalController.open"
        >
          {{ $t('account.menu.signIn') }}
        </button>
      </div>
      <SharedModal :controller="loginModalController">
        <AccountLoginForm
          @close="loginModalController.close"
          @success="loginModalController.close"
        />
      </SharedModal>
      <div v-if="isLoggedIn">
        <div
          class="inset-y-2 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <div
            class="w-7 h-7 i-carbon-user text-gray-600 hover:text-brand-primary sm:hidden hover:text-brand-primary"
            @click="isAccountMenuOpen = !isAccountMenuOpen"
          />
          <button
            type="button"
            class="text-sm text-gray-700 focus:outline-none hidden sm:block"
            data-testid="account-menu-hello-button"
            @click="isAccountMenuOpen = !isAccountMenuOpen"
          >
            {{ $t('account.menu.hello') }}, {{ user?.firstName }}!
          </button>

          <!-- Profile dropdown -->
          <div class="relative">
            <div>
              <button
                id="user-menu-button"
                type="button"
                class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-expanded="false"
                aria-haspopup="true"
                @click="isAccountMenuOpen = !isAccountMenuOpen"
              >
                <span class="sr-only">{{ $t('account.menu.openMenu') }}</span>
              </button>
            </div>
            <Transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                :class="[isAccountMenuOpen ? 'block' : 'hidden']"
                class="z-20 origin-top-right absolute right-0 top-2 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1"
              >
                <NuxtLink
                  id="user-menu-item-1"
                  to="/account"
                  data-testid="header-my-account-link"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  tabindex="-1"
                >
                  {{ $t('account.menu.myAccount') }}
                </NuxtLink>
                <button
                  id="user-menu-item-2"
                  data-testid="header-sing-out-link"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  role="menuitem"
                  tabindex="-2"
                  @click="invokeLogout"
                >
                 {{ $t('account.menu.signOut') }}
                </button>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
    <!-- <a
    href="#"
    class="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
  >
    Sign up
  </a> -->
  </div>
</template>
