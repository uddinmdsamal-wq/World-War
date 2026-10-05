export interface HuntingServerKeepaliveState {

    lastKeepaliveAt:
        string | null;

    lastKeepaliveStatus:
        "success" |
        "failed" |
        "never";

    lastKeepaliveStatusCode:
        number | null;

    lastKeepaliveDurationMs:
        number | null;
}

const huntingServerState:
    HuntingServerKeepaliveState = {

    lastKeepaliveAt:
        null,

    lastKeepaliveStatus:
        "never",

    lastKeepaliveStatusCode:
        null,

    lastKeepaliveDurationMs:
        null
};

export function recordHuntingServerKeepaliveSuccess(
    statusCode: number,
    durationMs: number
):
    void {

    huntingServerState.lastKeepaliveAt =
        new Date()
            .toISOString();

    huntingServerState.lastKeepaliveStatus =
        "success";

    huntingServerState.lastKeepaliveStatusCode =
        statusCode;

    huntingServerState.lastKeepaliveDurationMs =
        durationMs;
}

export function recordHuntingServerKeepaliveFailure(
    statusCode: number | null,
    durationMs: number
):
    void {

    huntingServerState.lastKeepaliveAt =
        new Date()
            .toISOString();

    huntingServerState.lastKeepaliveStatus =
        "failed";

    huntingServerState.lastKeepaliveStatusCode =
        statusCode;

    huntingServerState.lastKeepaliveDurationMs =
        durationMs;
}

export function getHuntingServerKeepaliveState():
    HuntingServerKeepaliveState {

    return {
        ...huntingServerState
    };
}
