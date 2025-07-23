// server/tests/setup.js

import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

// Increase timeout for MongoDB Memory Server startup
jest.setTimeout(30000);

let mongoServer;

/**
 * Connect to in-memory MongoDB before all tests
 */
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

/**
 * Clean all collections after each test
 */
afterEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

/**
 * Disconnect and stop in-memory MongoDB after all tests
 */
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
