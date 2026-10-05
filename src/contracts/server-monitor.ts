export interface ServerMonitorStatus {
    service:
        "worldwar-server";

    status:
        "online";

    timestamp:
        string;

    huntingServer:
        {
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
        };

    hunter:
        {
            lastPingAt:
                string | null;
        };
}