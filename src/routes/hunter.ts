import {
    Router
} from "express";

import {
    HUNTER_HEADER_NAME,
    HUNTER_HEADER_VALUE,
    HUNTER_PROTOCOL_HEADER,
    HUNTER_PROTOCOL_VERSION,
    HUNTER_PROTOCOL_NAME
} from "../contracts/hunter-protocol.js";

import type {
    HunterPingResponse
} from "../contracts/hunter-protocol.js";

import {
    scheduleHuntingServerKeepalive
} from "../keepalive/hunting-server-keepalive.js";

export const hunterRouter =
    Router();

hunterRouter.get(
    "/hunter/ping",
    (
        req,
        res
    ) => {

        const hunterHeader =
            req.get(
                HUNTER_HEADER_NAME
            );

        const protocolHeader =
            req.get(
                HUNTER_PROTOCOL_HEADER
            );

        if (
            hunterHeader !==
            HUNTER_HEADER_VALUE
        ) {

            res.status(403)
                .json({
                    status:
                        "forbidden"
                });

            return;
        }

        const protocolVersion =
            Array.isArray(
                protocolHeader
            )
                ? protocolHeader[0]
                : protocolHeader;

        if (
            protocolVersion ===
            undefined ||
            protocolVersion !==
            String(
                HUNTER_PROTOCOL_VERSION
            )
        ) {

            res.status(400)
                .json({
                    status:
                        "unsupported-protocol"
                });

            return;
        }

        const response:
            HunterPingResponse = {
            status:
                "ok",

            service:
                "worldwar-server",

            protocol:
                HUNTER_PROTOCOL_NAME,

            protocolVersion:
                HUNTER_PROTOCOL_VERSION,

            timestamp:
                new Date()
                    .toISOString()
        };

        scheduleHuntingServerKeepalive();

        res.status(200)
            .json(
                response
            );
    }
);