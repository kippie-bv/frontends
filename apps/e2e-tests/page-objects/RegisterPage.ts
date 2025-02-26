import { expect, Locator, Page } from "@playwright/test";
import { faker } from "@faker-js/faker";

export class RegisterForm {
  // Define selectors
  readonly page: Page;
  readonly salutation: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly emailAdrdress: Locator;
  readonly password: Locator;
  readonly street: Locator;
  readonly zipcode: Locator;
  readonly city: Locator;
  readonly country: Locator;
  readonly submitButton: Locator;

  // Init selectors using constructor
  constructor(page: Page) {
    this.page = page;
    this.salutation = page.getByTestId("registration-salutation-select");
    this.firstName = page.getByTestId("registration-first-name-input");
    this.lastName = page.getByTestId("registration-last-name-input");
    this.emailAdrdress = page.getByTestId("registration-email-input");
    this.password = page.getByTestId("registration-password-input");
    this.street = page.getByTestId("registration-street-input");
    this.zipcode = page.getByTestId("registration-zipcode-input");
    this.city = page.getByTestId("registration-city-input");
    this.country = page.getByTestId("registration-country-select");
    this.submitButton = page.getByTestId("registration-submit-button");
  }

  // Define login page methods
  async fillCustomerData(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    await this.page.waitForLoadState();
    await this.salutation.selectOption({ label: "Mr." });
    await this.firstName.type(firstName);
    await this.lastName.type(lastName);
    await this.emailAdrdress.type(email);
    await this.password.type(password);
  }

  async fillAddressData(street: string, zipcode: string, city: string) {
    await this.street.type(street);
    await this.zipcode.type(zipcode);
    await this.city.type(city);
    await this.country.selectOption({ label: "Germany" });
  }

  async submitRegistraionForm() {
    await Promise.all([
      this.page.waitForLoadState(),
      await this.submitButton.click({ delay: 500 }),
    ]);
    await this.page.waitForSelector(
      "[data-testid='product-box-wishlist-icon-not-in']"
    );
  }

  async createUser() {
    await this.salutation.selectOption({ label: "Mr." });
    await this.firstName.type("e2e " + faker.person.firstName());
    await this.lastName.type("e2e " + faker.person.lastName());
    await this.emailAdrdress.type(faker.internet.exampleEmail());
    await this.password.type(faker.internet.password());
    await this.street.type(faker.location.street());
    await this.zipcode.type(faker.location.zipCode());
    await this.city.type(faker.location.city());
    await this.country.selectOption({ label: "Germany" });
    await this.submitButton.click();
    await this.page.waitForSelector(
      "[data-testid='product-box-wishlist-icon-not-in']"
    );
  }
}
