"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENCRYPTION_KEY = exports.POSTMARK_SERVER_TOKEN = exports.TERMILL_BASE_URL = exports.TERMILL_API_KEY = exports.MEDICINE_PLACEHOLDER = exports.HOSPITAL_PLACEHOLDER = exports.PROFILE_PLACEHOLDER = exports.MONGODB_URI = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.MONGODB_URI = process.env.MONGODB_URI ||
    'mongodb+srv://3illbaby:taylorgang@pharma.ybzvrsk.mongodb.net/?retryWrites=true&w=majority';
exports.PROFILE_PLACEHOLDER = 'https://www.kindpng.com/picc/m/722-7221920_placeholder-profile-image-placeholder-png-transparent-png.png';
exports.HOSPITAL_PLACEHOLDER = 'https://www.kindpng.com/picc/m/264-2646273_hydrodent-micro-channel-icon-hospital-navigation-icon-hospital.png';
exports.MEDICINE_PLACEHOLDER = 'https://pixy.org/src/144/1448676.jpg';
exports.TERMILL_API_KEY = process.env.TERMILL_API_KEY;
exports.TERMILL_BASE_URL = process.env.TERMILL_BASE_URL;
exports.POSTMARK_SERVER_TOKEN = process.env.POSTMARK_SERVER_TOKEN;
exports.ENCRYPTION_KEY = 'i02lvumS2enyb9ovJrETPRIwojy8W1X6MdQUaOO6rLc=';
//# sourceMappingURL=constants.js.map