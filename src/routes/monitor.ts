import {
    Router
} from "express";

import {
    getHuntingServerKeepaliveState
} from "../monitor/server-monitor-state.js";

export const monitorRouter =
    Router();

monitorRouter.get(
    "/monitor/status",
    (_req, res) => {

        const keepalive =
            getHuntingServerKeepaliveState();

        res.status(200)
            .json({

                service:
                    "worldwar-server",

                status:
                    "online",

                timestamp:
                    new Date()
                        .toISOString(),

                huntingServer: {

                    lastKeepaliveAt:
                        keepalive.lastKeepaliveAt,

                    lastKeepaliveStatus:
                        keepalive.lastKeepaliveStatus,

                    lastKeepaliveStatusCode:
                        keepalive.lastKeepaliveStatusCode,

                    lastKeepaliveDurationMs:
                        keepalive.lastKeepaliveDurationMs
                }
            });
    }
);
