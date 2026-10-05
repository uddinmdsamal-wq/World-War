export const HUNTER_PROTOCOL_NAME =
    "worldwar-hunter";

export const HUNTER_PROTOCOL_VERSION =
    1;

export const HUNTER_HEADER_NAME =
    "X-WorldWar-Hunter";

export const HUNTER_HEADER_VALUE =
    "worldwar-hunting-server";

export const HUNTER_PROTOCOL_HEADER =
    "X-WorldWar-Hunter-Protocol";

export interface HunterPingResponse {
    status:
        "ok";

    service:
        "worldwar-server";

    protocol:
        typeof HUNTER_PROTOCOL_NAME;

    protocolVersion:
        typeof HUNTER_PROTOCOL_VERSION;

    timestamp:
        string;
}