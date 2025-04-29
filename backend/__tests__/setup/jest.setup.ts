import mongoose from 'mongoose';                            // Import mongoose for DB connection (DB 연결을 위한 mongoose 임포트)
import { MongoMemoryServer } from 'mongodb-memory-server';  // Import MongoMemoryServer for in-memory DB (인메모리 DB 서버용 MongoMemoryServer 임포트)

let mongod: MongoMemoryServer;                              // Holds the in-memory MongoDB instance (인메모리 MongoDB 인스턴스 저장용)

// beforeAll: Start in-memory MongoDB and connect Mongoose
beforeAll(async () => {
  mongod = await MongoMemoryServer.create();                // Create in-memory MongoDB instance (인메모리 MongoDB 인스턴스 생성)
  const uri = mongod.getUri();                              // Get the connection URI (연결 URI 가져오기)
  await mongoose.connect(uri, { dbName: 'jest' });          // Connect mongoose to the in-memory DB (메모리 DB에 mongoose 연결)
});

// afterEach: Clear all data from DB after each test
afterEach(async () => {
  const collections = mongoose.connection.collections;      // Get all collections (모든 컬렉션 조회)
  for (const key in collections) {
    await collections[key].deleteMany({});                  // Delete all documents in each collection (각 컬렉션의 모든 문서 삭제)
  }
});

// afterAll: Disconnect and stop the in-memory DB after all tests
afterAll(async () => {
  await mongoose.disconnect();                              // Disconnect mongoose (mongoose 연결 해제)
  await mongod.stop();                                      // Stop in-memory MongoDB server (메모리 DB 서버 중지)
});