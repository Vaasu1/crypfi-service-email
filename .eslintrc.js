module.exports = {
  "env": {
    "es6": false,
    "node": true,
    "mocha": true
  },
  "extends": [
    "airbnb-base",
    "prettier", 
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "eslint-config-prettier",
    "plugin:prettier/recommended",
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2021,
    "sourceType": "module"
  },  
  "plugins": ["@typescript-eslint","promise"],
  "rules": {
    "new-cap": 0,
    "no-new": 0,
    //"camelcase": [2, {"properties": "never"}],
    "camelcase": "off",
    "prettier/prettier": "error",
    "no-console": "off",
    "max-lines-per-function": ["error", 200],
    'max-lines': ["error",  700 ],
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true, "optionalDependencies": false, "peerDependencies": false}],
    'import/no-mutable-exports': 'off',
    "no-shadow": "off",
    "promise/always-return": "error",
    "promise/no-return-wrap": "error",
    "promise/param-names": "error",
    "promise/catch-or-return": "error",
    "promise/no-native": "off",
    "promise/no-nesting": "warn",
    "promise/no-promise-in-callback": "warn",
    "promise/no-callback-in-promise": "warn",
    "promise/avoid-new": "warn",
    "promise/no-new-statics": "error",
    "promise/no-return-in-finally": "warn",
    "promise/valid-params": "warn",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "ts": "never",
      }
    ]
  }
}
