import React from 'react'
import {OPENAI_KEY} from './constant'
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: OPENAI_KEY, // This is the default and can be omitted
  dangerouslyAllowBrowser: true,
});



export default openai