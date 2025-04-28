import path from 'path';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import type { Express } from 'express';

// Load the YAML file (YAML 파일 로드)
const swaggerSpec = YAML.load(path.join(__dirname, '../../swagger/swagger.yaml'));

/**
 * Mounts Swagger UI under /api-docs
 * @param app Express application instance
 */

export function setupSwagger(app: Express) {
  // Serve Swagger UI at /api-docs (Swagger UI를 /api-docs에 마운트)
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}