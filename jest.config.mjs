import nextJest from 'next/jest'

const createJestConfig = nextJest({
  // Next.js uygulamasının yolu
  dir: './',
})

// Jest için özel yapılandırma
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // CSS modülleri için mock
    '^.+\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Dosya importları için mock
    '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    // Path aliases
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
  ],
}

// createJestConfig, next/jest tarafından sağlanan tüm varsayılan değerleri alır
// ve özel yapılandırmamızla birleştirir
export default createJestConfig(customJestConfig) 