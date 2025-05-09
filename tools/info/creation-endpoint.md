<Endpoint-Reference>
openapi: 3.1.0
info:
  title: OpenAI Image Generation API
  description: API for generating images from text prompts using GPT-image-1 model.
  version: 1.0.0
servers:
  - url: https://api.openai.com/v1
    description: OpenAI API Server
paths:
  /images/generations:
    post:
      operationId: generateImage
      summary: Generate an image from a text prompt
      description: Creates one or more images based on the given prompt using GPT-image-1 model.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - prompt
              properties:
                prompt:
                  type: string
                  description: A text description of the desired image.
                  maxLength: 1000
                n:
                  type: integer
                  description: Number of images to generate (optional, defaults to 1).
                  default: 1
                  maximum: 10
                size:
                  type: string
                  description: Size of the generated images. Must be one of '256x256', '512x512', or '1024x1024'. Defaults to '1024x1024'.
                  enum: [256x256, 512x512, 1024x1024]
                  default: 1024x1024
                response_format:
                  type: string
                  description: The format in which the generated images are returned. Must be either 'url' or 'b64_json'. Defaults to 'url'.
                  enum: [url, b64_json]
                  default: url
                user:
                  type: string
                  description: Unique identifier for the user (optional).
      responses:
        '200':
          description: Successfully generated images
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      type: object
                      properties:
                        url:
                          type: string
                          description: URL of the generated image (if response_format is 'url').
                        b64_json:
                          type: string
                          description: Base64-encoded image data (if response_format is 'b64_json').
        '400':
          description: Bad request, likely due to invalid parameters
        '401':
          description: Unauthorized, likely due to an invalid API key
        '500':
          description: Internal server error
components:
  securitySchemes:
    api_key:
      type: apiKey
      in: header
      name: Authorization
      description: Use 'Bearer {API_KEY}' to authenticate
security:
  - api_key: []
</Endpoint-Reference>