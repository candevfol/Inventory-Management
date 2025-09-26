## Inventory Management (Node.js + Express + Mongoose)

A minimal inventory service with products CRUD and stock safeguards, built with Express, Mongoose, and express-validator.

### Quick setup

You can use the convenience script:
```bash
chmod +x ./setup.sh
./setup.sh
```
This installs dependencies and runs the test suite in one step.
Alternatively,

1) Install dependencies
```bash
npm install
```
2) Environment variables
Create a `.env` file in the project root with:
```bash
PORT=3000
DB_URL="mongodb://localhost:27017/inventory"
```
3) Run the server
```bash
npm run dev
```
Server starts on `http://localhost:3000`.
4) Run tests
```bash
npm test
```

### API routes
Base path: `/api/products`

- POST `/create`
  - Body: `{ name: string, description: string, quantity: number, threshold?: number }`
  - Validates input; creates a product.

- GET `/:id`
  - Returns a product by Mongo ObjectId.

- DELETE `/:id`
  - Deletes a product by id.

- PATCH `/:id`
  - Body: `{ change: number }`
  - Adjusts quantity by `change` (positive or negative). Prevents quantity from going below 0.

- GET `/belowThreshold`
  - Lists products where `quantity < threshold`.

### Core functionalities
- Input validation via `express-validator` for product creation and updates
- Defensive update that blocks quantity from dropping below 0
- Fetch product by id with 404 handling for invalid/nonexistent ids
- Delete product by id
- Query products below their threshold using Mongo `$expr`

### Tests covered
Jest is configured to run in ESM mode with `jest.unstable_mockModule` for safe mocking.

- updateProduct - should return 400 if quantity goes below 0
  - Mocks validation as passing and returns an existing product with low stock so that `quantity + change < 0`; expects 400 with the proper message.

- updateProduct - should return 200 if quantity does not go below 0
  - Mocks validation as passing, returns an existing product with sufficient stock, and mocks `updateProductById` to return the updated product; expects 200 with success payload.

### Project structure
```
controller/          // Express controllers
model/               // Mongoose models
repository/          // Data access (Mongoose calls)
routes/              // Express routes
utils/               // DB connection, validators
test/                // Jest tests
index.js             // App bootstrap
jest.config.js       // Jest configuration
```

### Notes
- This app uses ESM (`"type": "module"`).
- Jest is run with `--experimental-vm-modules` to support ESM, as configured in `package.json`.

