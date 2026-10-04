/* =========================================================
   MANIFEST TYPES
========================================================= */

export type ManifestResourcePriority =
    | "critical"
    | "high"
    | "normal"
    | "optional";


export interface ManifestResource {

    id: string;

    url: string;

    size: number;

    hash: string | null;

    priority:
        ManifestResourcePriority;

    required: boolean;

}


export interface GameManifest {

    manifestVersion: number;

    gameVersion: string;

    buildId: string;

    generatedAt: string;

    resources:
        ManifestResource[];

}


/* =========================================================
   CURRENT GAME MANIFEST
========================================================= */

export function getGameManifest():
    GameManifest {

    return {

        manifestVersion: 1,

        gameVersion: "1.0.0",

        buildId: "ww-2026-001",

        generatedAt:
            new Date().toISOString(),

        resources: []

    };

}