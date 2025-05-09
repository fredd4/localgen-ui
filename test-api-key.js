// Simple script to test OpenAI API key with GPT-image-1 model
/* eslint-env node */
import { OpenAI } from 'openai';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error('❌ No API key found in .env file. Please set OPENAI_API_KEY.');
  process.exit(1);
}

console.log('🔑 API key found in environment variables');
console.log('First few characters:', apiKey.substring(0, 10) + '...');

const openai = new OpenAI({
  apiKey: apiKey,
});

async function testApiKey() {
  console.log('🧪 Testing API key with GPT-image-1 model...');
  
  try {
    // First test if we can list models
    console.log('📋 Listing available models...');
    const models = await openai.models.list();
    console.log(`✅ Successfully listed ${models.data.length} models`);
    
    // Then test image generation
    console.log('🖼️ Testing image generation with GPT-image-1...');
    
    try {
      const response = await openai.images.generate({
        model: "gpt-image-1",
        prompt: "A simple test image of a cute cartoon cat",
        n: 1,
        size: "1024x1024",
        quality: "low",
        moderation: "low",
      });
      
      console.log('✅ Successfully generated image!');
      console.log('📊 Response data:', JSON.stringify(response, null, 2).substring(0, 300) + '...');
      return true;
    } catch (imageError) {
      console.error('❌ Image generation failed:', imageError.message);
      if (imageError.response) {
        console.error('Status:', imageError.response.status);
        console.error('Data:', JSON.stringify(imageError.response.data, null, 2));
      } else if (imageError.error) {
        console.error('Error details:', JSON.stringify(imageError.error, null, 2));
      }
      // Continue execution even if image generation fails
      return false;
    }
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else if (error.error) {
      console.error('Error details:', JSON.stringify(error.error, null, 2));
    }
    return false;
  }
}

testApiKey()
  .then(success => {
    if (success) {
      console.log('🎉 API key is valid and working with GPT-image-1!');
    } else {
      console.log('😞 API key test failed. Please check the errors above.');
    }
  })
  .catch(error => {
    console.error('💥 Unexpected error:', error);
  }); 