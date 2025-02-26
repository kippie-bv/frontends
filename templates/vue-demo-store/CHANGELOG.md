# vue-demo-store

## 0.7.0

### Minor Changes

- [#95](https://github.com/shopware/frontends/pull/95) [`ef73e1f3`](https://github.com/shopware/frontends/commit/ef73e1f31e287d96a9f2c3ed9310cfc0c22556ee) Thanks [@BrocksiNet](https://github.com/BrocksiNet)! - Redirect user from login and register page to account in demo-store if they are already logged in (only client side).

- [#168](https://github.com/shopware/frontends/pull/168) [`eddcfcca`](https://github.com/shopware/frontends/commit/eddcfcca8e00530147e77bd1122fc9e6828fbf57) Thanks [@mkucmus](https://github.com/mkucmus)! - Display cart item total price instead of unit price

- [#107](https://github.com/shopware/frontends/pull/107) [`58bd8d6a`](https://github.com/shopware/frontends/commit/58bd8d6ad8dc0f35c702deb910cf05a4db9e5911) Thanks [@mdanilowicz](https://github.com/mdanilowicz)! - Remove Nitro preset initialisation

- [#124](https://github.com/shopware/frontends/pull/124) [`8e30002d`](https://github.com/shopware/frontends/commit/8e30002d0c93cce6485e7e476386d55f755fc44b) Thanks [@mdanilowicz](https://github.com/mdanilowicz)! - Add i18n module and translations

- [#169](https://github.com/shopware/frontends/pull/169) [`7c43afbb`](https://github.com/shopware/frontends/commit/7c43afbbac108e8943b599ab8562f3ced462234b) Thanks [@patzick](https://github.com/patzick)! - Added template composable `useModal` which `SharedModal` component refactor.
  New modal system is using Vue's Teleport feature to render modals outside of the root component and keeping component context in the modal.

- [#155](https://github.com/shopware/frontends/pull/155) [`b53ac01c`](https://github.com/shopware/frontends/commit/b53ac01c72ddff1f484ccd75cca49b1ff1d44676) Thanks [@mdanilowicz](https://github.com/mdanilowicz)! - Block editing data when fetching an update - my account

- [#180](https://github.com/shopware/frontends/pull/180) [`f1bd80b4`](https://github.com/shopware/frontends/commit/f1bd80b4082e2a23e94cfe4485f14715f125441a) Thanks [@patzick](https://github.com/patzick)! - Images for CMS elements and Product cart are now optimised for displayed size. This is decreasing weight of the whole page. Also small thumbnail of the image is shown.

- [#180](https://github.com/shopware/frontends/pull/180) [`f1bd80b4`](https://github.com/shopware/frontends/commit/f1bd80b4082e2a23e94cfe4485f14715f125441a) Thanks [@patzick](https://github.com/patzick)! - Product Card design has changed.

- [#194](https://github.com/shopware/frontends/pull/194) [`81f45335`](https://github.com/shopware/frontends/commit/81f4533513b2ee538111159f8e37cd7bd1db9f1e) Thanks [@patzick](https://github.com/patzick)! - Updated links to use new `getCategoryRoute` and `getProductRoute`. Resolve mechanism is now omiting additional `/seo-url` api request and makes internal navigation much faster. Special thanks to [@niklaswolf](https://github.com/niklaswolf) for inspiration and cooperation on that feature!

- [#187](https://github.com/shopware/frontends/pull/187) [`7fe30878`](https://github.com/shopware/frontends/commit/7fe3087844007d12dc26d9c6817ecd12eb431b9b) Thanks [@mdanilowicz](https://github.com/mdanilowicz)! - Add shipping methods description and icon

### Patch Changes

- [#169](https://github.com/shopware/frontends/pull/169) [`7c43afbb`](https://github.com/shopware/frontends/commit/7c43afbbac108e8943b599ab8562f3ced462234b) Thanks [@patzick](https://github.com/patzick)! - Added transitions for modals and sidemenus appearance.

- [#172](https://github.com/shopware/frontends/pull/172) [`4b323a14`](https://github.com/shopware/frontends/commit/4b323a14f3cb7b8c76f53133e43a64fc56d27c3a) Thanks [@patzick](https://github.com/patzick)! - Proper SSR context for requests. Logged in client have hydrated data on reload.

- [#143](https://github.com/shopware/frontends/pull/143) [`ffde908c`](https://github.com/shopware/frontends/commit/ffde908c4d5c0b48311f16e6da62bb0cb4f844d8) Thanks [@patzick](https://github.com/patzick)! - payment method name displayed properly in checkout

- [#200](https://github.com/shopware/frontends/pull/200) [`329b0aec`](https://github.com/shopware/frontends/commit/329b0aec74c85683f4b69c3cc94ef398f797cf8b) Thanks [@mkucmus](https://github.com/mkucmus)! - Remove unnecessary dependencies

- [#138](https://github.com/shopware/frontends/pull/138) [`62cb5b0c`](https://github.com/shopware/frontends/commit/62cb5b0c2ad568593383cf2b78510a1bab36a1be) Thanks [@mkucmus](https://github.com/mkucmus)! - Refresh token before login

- [#101](https://github.com/shopware/frontends/pull/101) [`58932a83`](https://github.com/shopware/frontends/commit/58932a83106f7c415e68c4c1555180ff844ec151) Thanks [@mkucmus](https://github.com/mkucmus)! - Show regulation price on PDP and listing

- [#108](https://github.com/shopware/frontends/pull/108) [`15c7915d`](https://github.com/shopware/frontends/commit/15c7915db1c648d030469f257fbfceed77f5dacd) Thanks [@patzick](https://github.com/patzick)! - `og:site_name` value is now by default set to page title

- Updated dependencies [[`53f81c32`](https://github.com/shopware/frontends/commit/53f81c32b50c1658ee5758820085580cceea8161), [`47221193`](https://github.com/shopware/frontends/commit/472211939db34c8c81e957bd3e91a765056c088c), [`8e30002d`](https://github.com/shopware/frontends/commit/8e30002d0c93cce6485e7e476386d55f755fc44b), [`58932a83`](https://github.com/shopware/frontends/commit/58932a83106f7c415e68c4c1555180ff844ec151), [`4b323a14`](https://github.com/shopware/frontends/commit/4b323a14f3cb7b8c76f53133e43a64fc56d27c3a), [`58932a83`](https://github.com/shopware/frontends/commit/58932a83106f7c415e68c4c1555180ff844ec151), [`6320ca6f`](https://github.com/shopware/frontends/commit/6320ca6f00771b9f7d0a736c6438ca80ae60f33f), [`a1edcd18`](https://github.com/shopware/frontends/commit/a1edcd18f3665b9ecdc32f7d33902d9c394b4fb6), [`81f45335`](https://github.com/shopware/frontends/commit/81f4533513b2ee538111159f8e37cd7bd1db9f1e), [`ed35e37d`](https://github.com/shopware/frontends/commit/ed35e37dbedf43aef3ab34dde54230e912f8fa35), [`f1bd80b4`](https://github.com/shopware/frontends/commit/f1bd80b4082e2a23e94cfe4485f14715f125441a), [`f1bd80b4`](https://github.com/shopware/frontends/commit/f1bd80b4082e2a23e94cfe4485f14715f125441a), [`a367dba6`](https://github.com/shopware/frontends/commit/a367dba68ab73f9ed2213236c696718c222565bc), [`329b0aec`](https://github.com/shopware/frontends/commit/329b0aec74c85683f4b69c3cc94ef398f797cf8b)]:
  - @shopware-pwa/types@0.5.2
  - @shopware-pwa/cms-base@0.5.0
  - @shopware-pwa/nuxt3-module@0.3.2
  - @shopware-pwa/helpers-next@0.2.0

## 0.6.0

### Minor Changes

- [#72](https://github.com/shopware/frontends/pull/72) [`e13d3d9a`](https://github.com/shopware/frontends/commit/e13d3d9adde759e97ca7fa9b7a782b7991428679) Thanks [@patzick](https://github.com/patzick)! - Add a confirmation instruction box to the newsletter subscription panel

- [`dab0f839`](https://github.com/shopware/frontends/commit/dab0f839eeebe6bb9999cdd0ec11925d935b08b9) Thanks [@mdanilowicz](https://github.com/mdanilowicz)! - Add digital product to the order history list

- [`a0ed2c8a`](https://github.com/shopware/frontends/commit/a0ed2c8ad2373e74b43d879c73f667ae829bb1f3) Thanks [@mdanilowicz](https://github.com/mdanilowicz)! - Add basic checkout terms and conditions

- [`240eae89`](https://github.com/shopware/frontends/commit/240eae89daf685dff1b76914d263ee08f9e44b41) Thanks [@mdanilowicz](https://github.com/mdanilowicz)! - Add documents to the order summary

- [#71](https://github.com/shopware/frontends/pull/71) [`e71cc788`](https://github.com/shopware/frontends/commit/e71cc788c375c19ec449b820c0813b83503ef067) Thanks [@patzick](https://github.com/patzick)! - Add merged sitemap

- [`da14d573`](https://github.com/shopware/frontends/commit/da14d57327ab66e022dde775ce8ce2f2fc416f3a) Thanks [@mdanilowicz](https://github.com/mdanilowicz)! - Add data-testid for a AccountAddressCard

- [`30493417`](https://github.com/shopware/frontends/commit/30493417ad5b97ee1f0553f68357a23446b85522) Thanks [@mdanilowicz](https://github.com/mdanilowicz)! - Hide the shipping address and shipping method for a digital cart (checkout, success page)

### Patch Changes

- [`e951d93a`](https://github.com/shopware/frontends/commit/e951d93ae8c085cd50d6b63317b982982a77ab42) Thanks [@patzick](https://github.com/patzick)! - Replaced `RouterLink` with `NuxtLink` for prefetch performance gain

- [`6038bb1a`](https://github.com/shopware/frontends/commit/6038bb1a9d0535161bdbdfa6159ed21f729c9305) Thanks [@mdanilowicz](https://github.com/mdanilowicz)! - Fix order status in the orders list

- [`e2718c7d`](https://github.com/shopware/frontends/commit/e2718c7d20fac95c57436166083d6e5f599937c2) Thanks [@mkucmus](https://github.com/mkucmus)! - Use image thumbnails in specific cases

- [`7805daf4`](https://github.com/shopware/frontends/commit/7805daf4c0519e78bfa8cf1a9ae6011e75537244) Thanks [@mkucmus](https://github.com/mkucmus)! - Notification on failed action within wishlist

- [#86](https://github.com/shopware/frontends/pull/86) [`909ffcde`](https://github.com/shopware/frontends/commit/909ffcde24d5ae873d814027be0920a9e5976c72) Thanks [@mkucmus](https://github.com/mkucmus)! - Use correct URLs and target for navigation links

- [`f394092b`](https://github.com/shopware/frontends/commit/f394092b7796c9757c41a0721a41020d9a5ab3ef) Thanks [@mdanilowicz](https://github.com/mdanilowicz)! - Fix my account menu (mobile)

- [`e50702db`](https://github.com/shopware/frontends/commit/e50702db725086a97f182a7213eaf03c913cd870) Thanks [@mdanilowicz](https://github.com/mdanilowicz)! - Checkout logout redirect and breadcrumbs style adjustments

- [`5cf30847`](https://github.com/shopware/frontends/commit/5cf308478a822c15706c2c096f4341d50b3b8af6) Thanks [@mdanilowicz](https://github.com/mdanilowicz)! - Checkout style adjustments

- [`42d29bb4`](https://github.com/shopware/frontends/commit/42d29bb4beb739d12c934183c83ce7e50a171576) Thanks [@mdanilowicz](https://github.com/mdanilowicz)! - Replace button links with NuxtLink

- [`1fca0eae`](https://github.com/shopware/frontends/commit/1fca0eae50d9d628954f66e4401389ac5b815152) Thanks [@mdanilowicz](https://github.com/mdanilowicz)! - Order details style adjustments

- [#79](https://github.com/shopware/frontends/pull/79) [`b2fde982`](https://github.com/shopware/frontends/commit/b2fde98223ad49a791d01803349ee5664743c714) Thanks [@patzick](https://github.com/patzick)! - upgraded Nuxt to 3.3.2

- [#90](https://github.com/shopware/frontends/pull/90) [`d394ca0c`](https://github.com/shopware/frontends/commit/d394ca0cade39e40102f5e67995cc60b73e8a8a1) Thanks [@mkucmus](https://github.com/mkucmus)! - Production build example for node-ssr and docker env

- [`aff245cb`](https://github.com/shopware/frontends/commit/aff245cb43ac2b69772ffd08e3250c52decf31f4) Thanks [@elkmod](https://github.com/elkmod)! - Added devtools integration to nuxt-module

- Updated dependencies [[`e2718c7d`](https://github.com/shopware/frontends/commit/e2718c7d20fac95c57436166083d6e5f599937c2), [`9c7a0f28`](https://github.com/shopware/frontends/commit/9c7a0f280c20ccbafca0e3063533820e21050bee), [`09e49987`](https://github.com/shopware/frontends/commit/09e499877efe6f7ccccf6fc166a07d806a68a136), [`5008dcbf`](https://github.com/shopware/frontends/commit/5008dcbf065fc54a3f51517460e409556f370adf), [`7805daf4`](https://github.com/shopware/frontends/commit/7805daf4c0519e78bfa8cf1a9ae6011e75537244), [`50e74be5`](https://github.com/shopware/frontends/commit/50e74be52034d1947e273985f778e986f077db44), [`0eaf57e1`](https://github.com/shopware/frontends/commit/0eaf57e17a1d8ee454533c33f7528b72021aed4b), [`d358854c`](https://github.com/shopware/frontends/commit/d358854c632447228e719efdf639c428cf6ba804), [`dab0f839`](https://github.com/shopware/frontends/commit/dab0f839eeebe6bb9999cdd0ec11925d935b08b9), [`e50702db`](https://github.com/shopware/frontends/commit/e50702db725086a97f182a7213eaf03c913cd870), [`e71cc788`](https://github.com/shopware/frontends/commit/e71cc788c375c19ec449b820c0813b83503ef067), [`ec030631`](https://github.com/shopware/frontends/commit/ec0306312fa42451f5f4a98c3e8985b70496fd37), [`e2718c7d`](https://github.com/shopware/frontends/commit/e2718c7d20fac95c57436166083d6e5f599937c2), [`da2f6897`](https://github.com/shopware/frontends/commit/da2f6897e6839fbeb3ba7eae1eac376f423f2f99), [`e54e494a`](https://github.com/shopware/frontends/commit/e54e494aefa4d9418c0daf7e3b805b3b17d18c15), [`9c7a0f28`](https://github.com/shopware/frontends/commit/9c7a0f280c20ccbafca0e3063533820e21050bee), [`3a90d299`](https://github.com/shopware/frontends/commit/3a90d299279b451e391a946dafecc857fe1f67fc), [`2f64a718`](https://github.com/shopware/frontends/commit/2f64a71824594ffcc4e5d59f8d5e30cd627893db), [`5008dcbf`](https://github.com/shopware/frontends/commit/5008dcbf065fc54a3f51517460e409556f370adf), [`da2f6897`](https://github.com/shopware/frontends/commit/da2f6897e6839fbeb3ba7eae1eac376f423f2f99), [`b2fde982`](https://github.com/shopware/frontends/commit/b2fde98223ad49a791d01803349ee5664743c714), [`0eaf57e1`](https://github.com/shopware/frontends/commit/0eaf57e17a1d8ee454533c33f7528b72021aed4b), [`30493417`](https://github.com/shopware/frontends/commit/30493417ad5b97ee1f0553f68357a23446b85522), [`909ffcde`](https://github.com/shopware/frontends/commit/909ffcde24d5ae873d814027be0920a9e5976c72), [`a15a3083`](https://github.com/shopware/frontends/commit/a15a308359497bb9d483bebe040d717114946ff0), [`e13d3d9a`](https://github.com/shopware/frontends/commit/e13d3d9adde759e97ca7fa9b7a782b7991428679), [`909ffcde`](https://github.com/shopware/frontends/commit/909ffcde24d5ae873d814027be0920a9e5976c72), [`aff245cb`](https://github.com/shopware/frontends/commit/aff245cb43ac2b69772ffd08e3250c52decf31f4), [`a15a3083`](https://github.com/shopware/frontends/commit/a15a308359497bb9d483bebe040d717114946ff0), [`d358854c`](https://github.com/shopware/frontends/commit/d358854c632447228e719efdf639c428cf6ba804), [`e71cc788`](https://github.com/shopware/frontends/commit/e71cc788c375c19ec449b820c0813b83503ef067)]:
  - @shopware-pwa/helpers-next@0.1.25
  - @shopware-pwa/cms-base@0.4.1
  - @shopware-pwa/nuxt3-module@0.3.0
  - @shopware-pwa/types@0.5.0
  - @shopware-pwa/composables-next@0.7.0
  - @shopware-pwa/api-client@0.3.0

## 0.5.0

### Minor Changes

- [`313e0810`](https://github.com/shopware/frontends/commit/313e0810014611a0429b76b51747536630f24627) Thanks [@mdanilowicz](https://github.com/mdanilowicz)! - Add breadcrumbs support

### Patch Changes

- [`ece79b02`](https://github.com/shopware/frontends/commit/ece79b021c25499ac9ac4d54b707f27f9e25eb68) Thanks [@patzick](https://github.com/patzick)! - Removed old `_debounce` usage, we should use `useDebounceFn` from Vueuse

- [`680b4b77`](https://github.com/shopware/frontends/commit/680b4b778859f5f2fdf2325ce349f5534d3b965f) Thanks [@patzick](https://github.com/patzick)! - bump dependencies

- [`81b9323e`](https://github.com/shopware/frontends/commit/81b9323e8fac5401709a81dd20288b18faed7692) Thanks [@mdanilowicz](https://github.com/mdanilowicz)! - Separate guest user form the logged in user on the checkout page

- Updated dependencies [[`244d0dca`](https://github.com/shopware/frontends/commit/244d0dcaadf2435e1895675e373c608631e94566), [`ece79b02`](https://github.com/shopware/frontends/commit/ece79b021c25499ac9ac4d54b707f27f9e25eb68), [`680b4b77`](https://github.com/shopware/frontends/commit/680b4b778859f5f2fdf2325ce349f5534d3b965f), [`313e0810`](https://github.com/shopware/frontends/commit/313e0810014611a0429b76b51747536630f24627), [`7aa2c640`](https://github.com/shopware/frontends/commit/7aa2c640203e24b6abb5b8fe0eff6d7b72e6b08d)]:
  - @shopware-pwa/types@0.4.0
  - @shopware-pwa/cms-base@0.4.0
  - @shopware-pwa/nuxt3-module@0.2.1
  - @shopware-pwa/composables-next@0.6.0
  - @shopware-pwa/api-client@0.2.3
  - @shopware-pwa/helpers-next@0.1.24

## 0.4.0

### Minor Changes

- [`c300b89b`](https://github.com/shopware/frontends/commit/c300b89b80cf3476e8023db1796cec972db519f8) Thanks [@patzick](https://github.com/patzick)! - Changed `useCart` in now a shared composable, so there is only one instance.

- [`0855add8`](https://github.com/shopware/frontends/commit/0855add83ca04e816caed65a0538c1dbf624bb0d) Thanks [@mdanilowicz](https://github.com/mdanilowicz)! - Add the URL query navigation to the product listing

- [`b2e4dcad`](https://github.com/shopware/frontends/commit/b2e4dcadf822355d7ca9b485beaa5b5a54f7bf18) Thanks [@mdanilowicz](https://github.com/mdanilowicz)! - Add the possibility of removing address from the my account page

- [`b0291676`](https://github.com/shopware/frontends/commit/b02916767be123277f87c0e6b0feb48e7e8830c6) Thanks [@mdanilowicz](https://github.com/mdanilowicz)! - Add page not found component

### Patch Changes

- [`2080cc40`](https://github.com/shopware/frontends/commit/2080cc401dd02f91da3061dc7b6688784f1b1b6b) Thanks [@mdanilowicz](https://github.com/mdanilowicz)! - Display error on the registration page if occurs

- [`31fd5c8d`](https://github.com/shopware/frontends/commit/31fd5c8d72db8f5a703d50e35855690c5e202131) Thanks [@mkucmus](https://github.com/mkucmus)! - Adds a possibility to checkout as a guest

- [`3bda2153`](https://github.com/shopware/frontends/commit/3bda2153130b32501db0a9fe8270c374afcf4682) Thanks [@niklaswolf](https://github.com/niklaswolf)! - added optional chaining in LayoutTopNavigation.vue

- [`4d5b04b5`](https://github.com/shopware/frontends/commit/4d5b04b5fa09910b0c02bc59b33534772da66eeb) Thanks [@patzick](https://github.com/patzick)! - Fixed quantity changes in sidecart

- [`39d2d11c`](https://github.com/shopware/frontends/commit/39d2d11c922f5de9eb5d5c25225b6b93edd8ebcb) Thanks [@mkucmus](https://github.com/mkucmus)! - Payment related processes and documentation

- [`887894f2`](https://github.com/shopware/frontends/commit/887894f26dd047a7254c3f7a6850f0cee008d86e) Thanks [@mdanilowicz](https://github.com/mdanilowicz)! - Checkout registration form adjustments

- [`c903476c`](https://github.com/shopware/frontends/commit/c903476cb16cb1eac37ac2e081c503243f6bc191) Thanks [@patzick](https://github.com/patzick)! - fixed iconify carbon set on stackblitz env

- [`63a71b7d`](https://github.com/shopware/frontends/commit/63a71b7d1171d89d36b8f61cc2672a32b6cc9d3f) Thanks [@mdanilowicz](https://github.com/mdanilowicz)! - Fix currency on the init request

- [`21d8331a`](https://github.com/shopware/frontends/commit/21d8331aff13cef7ed041c60376504b2f324c1f5) Thanks [@mkucmus](https://github.com/mkucmus)! - Move checkout-related methods to useCheckout composable

- [`deaf9d1b`](https://github.com/shopware/frontends/commit/deaf9d1b60f5b32862e6e1bbf25e1a45c5361cdc) Thanks [@benjamin-ott](https://github.com/benjamin-ott)! - use translated name property for listing filter label

- Updated dependencies [[`21acce67`](https://github.com/shopware/frontends/commit/21acce67d05a2f1fcc1441174f7b4159b0b5b5d0), [`57d720ab`](https://github.com/shopware/frontends/commit/57d720ab6c8f605de605dbbe9de53d4ce43347e5), [`6c045a44`](https://github.com/shopware/frontends/commit/6c045a44242dad42571df6ce82c564e07031d373), [`073073b6`](https://github.com/shopware/frontends/commit/073073b627a444050e969ebf33933b1a27a2fa3f), [`29deb04f`](https://github.com/shopware/frontends/commit/29deb04fd1a871cb28f1fe3af3c007ae21de999f), [`ccf4ed47`](https://github.com/shopware/frontends/commit/ccf4ed47e6bb46d1fcab7c1418a677fe575331b4), [`0a8f4ea1`](https://github.com/shopware/frontends/commit/0a8f4ea1a95cd684178ae412687575bf735894a7), [`4d5b04b5`](https://github.com/shopware/frontends/commit/4d5b04b5fa09910b0c02bc59b33534772da66eeb), [`77a0bbcd`](https://github.com/shopware/frontends/commit/77a0bbcd8a5ce830219e2c04c0c99d08e6c4f4f2), [`c300b89b`](https://github.com/shopware/frontends/commit/c300b89b80cf3476e8023db1796cec972db519f8), [`0855add8`](https://github.com/shopware/frontends/commit/0855add83ca04e816caed65a0538c1dbf624bb0d), [`6c045a44`](https://github.com/shopware/frontends/commit/6c045a44242dad42571df6ce82c564e07031d373), [`39d2d11c`](https://github.com/shopware/frontends/commit/39d2d11c922f5de9eb5d5c25225b6b93edd8ebcb), [`4fc1cd83`](https://github.com/shopware/frontends/commit/4fc1cd833a9ebca73536b2be45cfec35f6a27dfc), [`f364da48`](https://github.com/shopware/frontends/commit/f364da4881b2c172947e394fcd8e23ddc3689a51), [`21d8331a`](https://github.com/shopware/frontends/commit/21d8331aff13cef7ed041c60376504b2f324c1f5), [`deaf9d1b`](https://github.com/shopware/frontends/commit/deaf9d1b60f5b32862e6e1bbf25e1a45c5361cdc)]:
  - @shopware-pwa/cms-base@0.3.0
  - @shopware-pwa/composables-next@0.5.0
  - @shopware-pwa/types@0.3.0
  - @shopware-pwa/api-client@0.2.2
  - @shopware-pwa/helpers-next@0.1.23
  - @shopware-pwa/nuxt3-module@0.2.0

## 0.3.0

### Minor Changes

- [`e21d67b`](https://github.com/shopware/frontends/commit/e21d67bc142076e93630139232ea39a07b51ebfb) Thanks [@patzick](https://github.com/patzick)! - improved session context to be better handled on SSR

- [`fed1335`](https://github.com/shopware/frontends/commit/fed1335afe8fb8054cad72c34eb79ce66be3bf05) Thanks [@mdanilowicz](https://github.com/mdanilowicz)! - Moving data rendering to CSR

- [`e21d67b`](https://github.com/shopware/frontends/commit/e21d67bc142076e93630139232ea39a07b51ebfb) Thanks [@patzick](https://github.com/patzick)! - added to template `useAuthGuard` which redirects to homepage if user is not logged in. You can adjust it to your desired behaviour.

### Patch Changes

- [`6693d2f`](https://github.com/shopware/frontends/commit/6693d2f4bf27eeaf80875f66d5700c1b113ae3fa) Thanks [@mdanilowicz](https://github.com/mdanilowicz)! - Fix loading addresses on the checkout only when the user is logged in

- [`d37cb27`](https://github.com/shopware/frontends/commit/d37cb27626e4b9d890516649b25dd9c93a94a366) Thanks [@mdanilowicz](https://github.com/mdanilowicz)! - Add a dashboard link to the menu

- Updated dependencies [[`7310ca6`](https://github.com/shopware/frontends/commit/7310ca64506ca5418d3ec2ef80f5c7d0fe4b779c), [`412a3bd`](https://github.com/shopware/frontends/commit/412a3bde4a3d12b54ef3af2d9b8f030c7a605885), [`7ec2875`](https://github.com/shopware/frontends/commit/7ec2875f51e46e6b80756b848594011dd471e01e), [`412a3bd`](https://github.com/shopware/frontends/commit/412a3bde4a3d12b54ef3af2d9b8f030c7a605885), [`e21d67b`](https://github.com/shopware/frontends/commit/e21d67bc142076e93630139232ea39a07b51ebfb), [`e21d67b`](https://github.com/shopware/frontends/commit/e21d67bc142076e93630139232ea39a07b51ebfb), [`e21d67b`](https://github.com/shopware/frontends/commit/e21d67bc142076e93630139232ea39a07b51ebfb)]:
  - @shopware-pwa/composables-next@0.4.0
  - @shopware-pwa/cms-base@0.2.1
  - @shopware-pwa/types@0.2.0
  - @shopware-pwa/nuxt3-module@0.1.24
  - @shopware-pwa/api-client@0.2.1
  - @shopware-pwa/helpers-next@0.1.22

## 0.2.0

### Minor Changes

- [`68b95b0`](https://github.com/shopware/frontends/commit/68b95b06f71b0e9b08da7c0936eee28311f178a8) Thanks [@mkucmus](https://github.com/mkucmus)! - listing filters hydration and top navigation submenu access

- [`c0b9cc3`](https://github.com/shopware/frontends/commit/c0b9cc35fdb588ef5e580dc7e19fa4414ba64d04) Thanks [@mkucmus](https://github.com/mkucmus)! - Price displaying strategy

- [`b3f711c`](https://github.com/shopware/frontends/commit/b3f711ccb230025c0567b0a06a292bf9255a4992) Thanks [@mdanilowicz](https://github.com/mdanilowicz)! - add dashboard to the My account page

### Patch Changes

- [`f492a6a`](https://github.com/shopware/frontends/commit/f492a6a76b0c6a9a9ad210a1993de75af82f0052) Thanks [@mdanilowicz](https://github.com/mdanilowicz)! - Fix logout

- [`29b677e`](https://github.com/shopware/frontends/commit/29b677e4ff59656f8a457ee4c8ab35e36cd06953) Thanks [@patzick](https://github.com/patzick)! - bump dependencies

- [`802abb1`](https://github.com/shopware/frontends/commit/802abb1b47cb9b2ba1dac267c7ce42bc32dce5f8) Thanks [@mdanilowicz](https://github.com/mdanilowicz)! - Add new data-testid attributes

- [`31a12b5`](https://github.com/shopware/frontends/commit/31a12b5259f567493fb12d8af62b2b63ada8079a) Thanks [@mdanilowicz](https://github.com/mdanilowicz)! - Wishlist icon style adjustments

- Updated dependencies [[`68b95b0`](https://github.com/shopware/frontends/commit/68b95b06f71b0e9b08da7c0936eee28311f178a8), [`b3f711c`](https://github.com/shopware/frontends/commit/b3f711ccb230025c0567b0a06a292bf9255a4992), [`9cd4078`](https://github.com/shopware/frontends/commit/9cd4078433c5644d2153a8a1212b9076a8d37347), [`29b677e`](https://github.com/shopware/frontends/commit/29b677e4ff59656f8a457ee4c8ab35e36cd06953), [`c0b9cc3`](https://github.com/shopware/frontends/commit/c0b9cc35fdb588ef5e580dc7e19fa4414ba64d04), [`802abb1`](https://github.com/shopware/frontends/commit/802abb1b47cb9b2ba1dac267c7ce42bc32dce5f8), [`d7da2c1`](https://github.com/shopware/frontends/commit/d7da2c11b6cbef23a83d0ffdb95d7e382795b7f3)]:
  - @shopware-pwa/cms-base@0.2.0
  - @shopware-pwa/api-client@0.2.0
  - @shopware-pwa/composables-next@0.3.0
  - @shopware-pwa/helpers-next@0.1.21
  - @shopware-pwa/nuxt3-module@0.1.23

## 0.1.1

### Patch Changes

- [`ef791ee`](https://github.com/shopware/frontends/commit/ef791eec6c6abbb9f591759676fea1f4cb66e096) Thanks [@BrocksiNet](https://github.com/BrocksiNet)! - Use text compression for assets

- Updated dependencies []:
  - @shopware-pwa/composables-next@0.2.1
  - @shopware-pwa/cms-base@0.1.22
  - @shopware-pwa/nuxt3-module@0.1.22

## 0.1.0

### Minor Changes

- [`16ee1d5`](https://github.com/shopware/frontends/commit/16ee1d52f76dc62ac5931dfd2ef0c428096db960) Thanks [@mdanilowicz](https://github.com/mdanilowicz)! - set default user addresses

### Patch Changes

- Updated dependencies [[`16ee1d5`](https://github.com/shopware/frontends/commit/16ee1d52f76dc62ac5931dfd2ef0c428096db960)]:
  - @shopware-pwa/composables-next@0.2.0
  - @shopware-pwa/cms-base@0.1.21
  - @shopware-pwa/nuxt3-module@0.1.21

## 0.0.2

### Patch Changes

- Updated dependencies [fa7e48f]
  - @shopware-pwa/api-client@0.1.20
  - @shopware-pwa/composables-next@0.1.20
  - @shopware-pwa/cms-base@0.1.20
  - @shopware-pwa/helpers-next@0.1.20
  - @shopware-pwa/nuxt3-module@0.1.20
  - @shopware-pwa/types@0.1.20
