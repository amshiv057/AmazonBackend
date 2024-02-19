const _ = require("lodash");
require('dotenv').config();
// import config from "./config.json";
// console.log(config);
const objectval = JSON.parse(process.env.OBJECT_VAL);
const defaultConfig = objectval.development;
// const defaultConfig = config.development;

// const environment = 'development';

const environment = 'production';

// const environmentConfig = config[environment];
const environmentConfig = objectval[environment];

const finalConfig = _.merge(defaultConfig, environmentConfig);
global.gConfig = finalConfig;