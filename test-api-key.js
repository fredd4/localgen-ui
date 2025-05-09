#!/usr/bin/env node

/**
 * This is a simple script to test if an OpenAI API key is valid.
 * You can run it with: `node test-api-key.js YOUR_API_KEY_HERE`
 * (replace YOUR_API_KEY_HERE with your actual API key)
 */

/* global process */

// Get the API key from command line arguments
const apiKey = process.argv[2];

if (!apiKey) {
  console.error('Please provide an API key as a command line argument.');
  process.exit(1);
}

async function testApiKey(key) {
  try {
    const response = await fetch('https://api.openai.com/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${key}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ API key is valid!');
      console.log(`Found ${data.data.length} models available.`);
      return true;
    } else {
      console.error('❌ API key is invalid.');
      console.error(`Status: ${response.status} - ${response.statusText}`);
      
      try {
        const errorData = await response.json();
        console.error('Error details:', errorData);
      } catch {
        // If we can't parse JSON, just show the raw text
        const text = await response.text();
        console.error('Response:', text);
      }
      
      return false;
    }
  } catch (error) {
    console.error('❌ Error testing API key:', error.message);
    return false;
  }
}

testApiKey(apiKey); 