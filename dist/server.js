"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const process_message_1 = __importDefault(require("./process-message"));
const app = express_1.default();
const port = process.env.PORT || 5000;
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'client/build')));
app.post('/chat', (req, res) => {
    const { message } = req.body;
    process_message_1.default(message);
});
app.set('port', port);
const server = app.listen(port, () => {
    console.log(`Express running → PORT ${port}`);
});
//# sourceMappingURL=server.js.map