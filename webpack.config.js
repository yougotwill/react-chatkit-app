const path = require('path')

module.exports = {
  "output": {
    "filename": "[name].pack.js",
    "path": path.resolve(__dirname, 'build'),
  },
  "devServer": {
    port: 8080
  },
  "mode": "development",
  "module": {
    "rules": [
      {
        "use": {
          "loader": "babel-loader",
          "options": {
            "presets": [
              "babel-preset-env",
              "babel-preset-react"
            ]
          }
        },
        "exclude": /node_modules/,
        "test": /\.js$/
      }
    ]
  },
  "entry": {
    "index": "./index"
  }
};
