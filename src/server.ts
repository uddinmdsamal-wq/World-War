import express from "express";

const app = express();

const PORT =
    Number(process.env.PORT) || 3000;

app.use(express.json());


/* =========================================================
   CORS
========================================================= */

app.use((_req, res, next) => {

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

    if (_req.method === "OPTIONS") {

        res.sendStatus(204);

        return;

    }

    next();

});


/* =========================================================
   ROOT
========================================================= */

app.get("/", (_req, res) => {

    res.json({
        name: "WORLD WAR",
        server: "online",
        version: "1.0.0"
    });

});


/* =========================================================
   HEALTH CHECK
========================================================= */

app.get("/health", (_req, res) => {

    res.status(200).json({

        status: "ok",

        service:
            "worldwar-server",

        timestamp:
            new Date().toISOString()

    });

});


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