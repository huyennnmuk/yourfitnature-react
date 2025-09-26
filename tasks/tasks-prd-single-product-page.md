## Relevant Files

- `app/shop/[slug]/page.tsx` - The dynamic page component for rendering a single product.
- `lib/getProducts.ts` - Utility file to be updated with a new function to fetch a single product by its slug.
- `app/components/ProductDetails.tsx` - A new component to display the main product information (name, images, price, description).
- `app/components/ProductDetails.test.tsx` - Unit tests for the `ProductDetails` component.
- `app/components/RelatedProducts.tsx` - A new component to display a list of related products.
- `app/components/RelatedProducts.test.tsx` - Unit tests for the `RelatedProducts` component.

### Notes

- Unit tests should be created for all new components.
- Use `npm test` to run tests.

## Tasks

- [x] 1.0 **Setup Data Fetching and Routing**
  - [x] 1.1 Create a new dynamic route at `app/shop/[slug]/page.tsx`.
  - [x] 1.2 In `lib/getProducts.ts`, implement a new function `getProductBySlug(slug: string)` that fetches a single product from the Sanity API.
  - [x] 1.3 In the `page.tsx` component, call the new function to fetch the product data based on the `slug` parameter.

- [x] 2.0 **Develop Product Details Component**
  - [x] 2.1 Create a new component `app/components/ProductDetails.tsx`.
  - [x] 2.2 The component should accept a `product` object as a prop.
  - [x] 2.3 Implement a gallery to display the product images.
  - [x] 2.4 Display the product name, price, and a formatted description.
  - [x] 2.5 Add a quantity selector and an "Add to Cart" button.
  - [x] 2.6 Create `app/components/ProductDetails.test.tsx` and write tests to ensure the component renders correctly.

- [x] 3.0 **Develop Related Products Component**
  - [x] 3.1 Create a new component `app/components/RelatedProducts.tsx`.
  - [x] 3.2 The component should fetch a list of related products (e.g., from the same category).
  - [x] 3.3 Display the related products in a visually appealing way (e.g., a carousel or grid).
  - [x] 3.4 Create `app/components/RelatedProducts.test.tsx` and write tests for the component.

- [x] 4.0 **Assemble and Finalize the Page**
  - [x] 4.1 In `app/shop/[slug]/page.tsx`, import and use the `ProductDetails` and `RelatedProducts` components.
  - [x] 4.2 Add dynamic metadata to the page for SEO (title, description).
  - [x] 4.3 Ensure the entire page is responsive and matches the site's design.
  - [x] 4.4 Manually test the page with different products to check for any issues.
