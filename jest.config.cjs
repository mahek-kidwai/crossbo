/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          module: "commonjs",
          esModuleInterop: true,
          resolveJsonModule: true,
          isolatedModules: true
        }
      }
    ]
  },
  moduleFileExtensions: ["ts", "tsx", "js", "json"]
};
