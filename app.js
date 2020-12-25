"use-strict"
const express = require("express");
const dotenv = require("dotenv");


// loading config file

dotenv.config({path : "./config/config.env"})

const app = express();