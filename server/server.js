import { Express } from "express";
import * as dotenv from "dotenv";
import cors from 'cors';
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

//configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

// initialize express application 
