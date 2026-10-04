import express from "express";

import {
    manifestRouter
} from "./routes/manifest.js";


const app =
    express();


const PORT =
    Number(process.env.PORT) || 3000;


/* =========================================================
   MIDDLEWARE
========================================================= */

app.use(
    express.json()
);


/* =========================================================
   CORS
========================================================= */

app.use(
    (_req, res, next) => {

        res.header(
            "Access-Control-Allow-Origin",
            "*"
        );


        res.header(
            "Access-Control-Allow-Methods",
            "GET,HEAD,OPTIONS"
        );


        res.header(
            "Access-Control-Allow-Headers",
            "Content-Type"
        );


        if (
            _req.method ===
            "OPTIONS"
        ) {

            res.sendStatus(204);

            return;

        }


        next();

    }
);


/* =========================================================
   ROOT API
========================================================= */

app.get(
    "/",
    (_req, res) => {

        res.json({

            name:
                "WORLD WAR",

            server:
                "online",

            version:
                "1.0.0"

        });

    }
);


/* =========================================================
   HEALTH API
========================================================= */

app.get(
    "/health",
    (_req, res) => {

        res.status(200)
            .json({

                status:
                    "ok",

                service:
                    "worldwar-server",

                timestamp:
                    new Date()
                        .toISOString()

            });

    }
);


/* =========================================================
   MANIFEST API
========================================================= */

app.use(
    manifestRouter
);


/* =========================================================
   START SERVER
========================================================= */

app.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            `WORLD WAR server running on port ${PORT}`
        );

    }
);