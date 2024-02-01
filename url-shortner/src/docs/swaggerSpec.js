import swaggerJSDoc from "swagger-jsdoc";

const swaggerSpec = swaggerJSDoc({
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Express API for learning",
      version: "1.0.0",
      description:
        "This is REST API made with express for just learning purpose.",
      contact: {
        name: "ABhi Trivedi",
        email: "abhi02.trivedi@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development Server",
      },
    ],
    basePath: "",
    paths: {
      "/api/url": {
        post: {
          tags: ["Users"],
          summary: "Create new url",
          description: "Post request",
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    urlName: {
                      type: "string",
                      example: "http://localhost:3000",
                    },
                  },
                },
              },
            },
            required: true,
          },
          responses: {
            201: {
              description: "User created successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      shortUrl: {
                        type: "string",
                        example: "http://localhost:3000/someId",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
});

export default swaggerSpec;
