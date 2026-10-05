import {
    HUNTING_SERVER_KEEPALIVE_HEADER,
    HUNTING_SERVER_KEEPALIVE_VALUE,
    HUNTING_SERVER_KEEPALIVE_PATH,
    HUNTING_SERVER_KEEPALIVE_DELAY_MS
} from "../contracts/hunting-server-keepalive.js";

import {
    recordHuntingServerKeepaliveSuccess,
    recordHuntingServerKeepaliveFailure
} from "../monitor/server-monitor-state.js";

const DEFAULT_HUNTING_SERVER_URL =
    "http://127.0.0.1:3001";

const REQUEST_TIMEOUT_MS =
    10_000;

let keepaliveTimer:
    ReturnType<typeof setTimeout> |
    null = null;

function getHuntingServerUrl():
    string {

    const configuredUrl =
        process.env.HUNTING_SERVER_URL;

    return (
        configuredUrl ??
        DEFAULT_HUNTING_SERVER_URL
    );
}

function buildKeepaliveUrl():
    string {

    const baseUrl =
        getHuntingServerUrl()
            .replace(
                /\/+$/,
                ""
            );

    return (
        baseUrl +
        HUNTING_SERVER_KEEPALIVE_PATH
    );
}

async function wakeHuntingServer():
    Promise<void> {

    const startedAt =
        Date.now();

    const controller =
        new AbortController();

    const timeout =
        setTimeout(
            () => {
                controller.abort();
            },
            REQUEST_TIMEOUT_MS
        );

    try {

        const response =
            await fetch(
                buildKeepaliveUrl(),
                {
                    method:
                        "GET",

                    headers: {

                        [HUNTING_SERVER_KEEPALIVE_HEADER]:
                            HUNTING_SERVER_KEEPALIVE_VALUE
                    },

                    signal:
                        controller.signal
                }
            );

        const durationMs =
            Date.now() -
            startedAt;

        if (
            response.ok
        ) {

            recordHuntingServerKeepaliveSuccess(
                response.status,
                durationMs
            );

            console.log(
                `[KEEPALIVE] Hunting Server responded with ${response.status} in ${durationMs}ms.`
            );

            return;
        }

        recordHuntingServerKeepaliveFailure(
            response.status,
            durationMs
        );

        console.error(
            `[KEEPALIVE] Hunting Server returned HTTP ${response.status} in ${durationMs}ms.`
        );

    } catch {

        const durationMs =
            Date.now() -
            startedAt;

        recordHuntingServerKeepaliveFailure(
            null,
            durationMs
        );

        console.error(
            "[KEEPALIVE] Hunting Server request failed."
        );

    } finally {

        clearTimeout(
            timeout
        );
    }
}

export function scheduleHuntingServerKeepalive():
    void {

    if (
        keepaliveTimer !== null
    ) {
        return;
    }

    keepaliveTimer =
        setTimeout(
            () => {

                keepaliveTimer =
                    null;

                void wakeHuntingServer();

            },
            HUNTING_SERVER_KEEPALIVE_DELAY_MS
        );

    console.log(
        "[KEEPALIVE] Hunting Server wake request scheduled for 5 seconds."
    );
}