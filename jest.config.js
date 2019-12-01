module.exports = {
  roots: ["<rootDir>/test"],
  testMatch: ["**/?(*.)+(spec|test).+(ts|tsx)"],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest"
  },
  //Install enzyme-adapter-react-16, enzyme, @types/enzyme, @types/enzyme-adapter-react-16
  //Needed for Enzyme, React and <rootDir>/jest.setup.ts
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.ts"
  }
};
