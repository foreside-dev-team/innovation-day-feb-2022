module.exports = {
    testMatch: ["**/?(*.)+(spec|test).[t]s"],
      testPathIgnorePatterns: ['/node_modules/', 'dist','/build/'], // 
      setupFilesAfterEnv: ['ts-microservice/jest-setup.ts'],
      transform: {
          "^.+\\.ts?$": "ts-jest",
      },
  }