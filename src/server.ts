import express from "express";

import {
    manifestRouter
} from "./routes/manifest.js";

import {
    hunterRouter
} from "./routes/hunter.js";

import {
    monitorRouter
} from "./routes/monitor.js";

const app =
    express();

const PORT =
    Number(process.env.PORT) || 3000;

app.use(
    express.json()
);

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
            "Content-Type,X-WorldWar-Hunter,X-WorldWar-Hunter-Protocol,X-WorldWar-Keepalive"
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

app.use(
    manifestRouter
);

app.use(
    hunterRouter
);

app.use(
    monitorRouter
);

app.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            `WORLD WAR server running on port ${PORT}`
        );
    }
);