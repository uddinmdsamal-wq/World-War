import {
    Router
} from "express";

import {
    getGameManifest
} from "../manifest/game-manifest.js";


/* =========================================================
   MANIFEST ROUTER
========================================================= */

export const manifestRouter =
    Router();


/* =========================================================
   GET /manifest
========================================================= */

manifestRouter.get(
    "/manifest",
    (_req, res) => {

        const manifest =
            getGameManifest();


        res.status(200)
            .json(manifest);

    }
);