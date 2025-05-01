"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const path_1 = __importDefault(require("path"));
const yamljs_1 = __importDefault(require("yamljs"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// Load the YAML file (YAML 파일 로드)
const swaggerSpec = yamljs_1.default.load(path_1.default.join(__dirname, '../../swagger/swagger.yaml'));
/**
 * Mounts Swagger UI under /api-docs
 * @param app Express application instance
 */
function setupSwagger(app) {
    // Serve Swagger UI at /api-docs (Swagger UI를 /api-docs에 마운트)
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
}
