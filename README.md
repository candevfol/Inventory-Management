## Inventory Management (Node.js + Express + MongoDB)

A lightweight service to create, read, update, and delete products while enforcing stock safety rules. It uses Express for routing, Mongoose for data persistence, and express-validator for request validation. The service includes focused tests for critical stock update behavior.

### Features
- Prevents product quantity from dropping below zero on updates
- Retrieve a product by id with clear 404 responses for invalid/nonexistent ids
- Delete a product by id
- List products whose `quantity` is below their `threshold`
- Robust request validation for create and update operations

### Setup(Local)

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
PORT
DB_URL
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

### Tests covered

- updateProduct - should return 400 if quantity goes below 0

- updateProduct - should return 200 if quantity does not go below 0


