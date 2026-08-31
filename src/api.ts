import express = require("express");
import cors = require("cors");
import * as dotenv from "dotenv";

const api = express();

api.use(express.json());
api.use(cors());
/* 
    It would be necessary to configure CORS to accept requests only from the front-end domain, because it is a browser restriction. It does not affect Postman or other API testing tools.
    Exemple:
    app.use(cors({
        origin: 'https://my-front-end.com'
    }));
*/
dotenv.config();

api.use(
  // routes here
);

const PORT = process.env.PORT || 3000;

api.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
