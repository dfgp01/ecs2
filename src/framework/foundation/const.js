/**
 * event type
 */
export const EVENT_TYPE_COLLIDE = 1;

export const TEAM_MASK_CODE = [
    1, 2, 4, 8, 16, 32, 64, 128, 256, 512,
    1024, 2048, 4096, 8192, 16384, 32768, 65536, 131072, 262144, 524288
];

/**
 * system priority
 */
export const SYSTEM_PRIORITY_COLLIDE = 100;
export const SYSTEM_PRIORITY_POS_UPDATE = 800;
export const SYSTEM_PRIORITY_LISTENER = 200;
export const SYSTEM_PRIORITY_RENDER_UPDATE = 900;
export const SYSTEM_PRIORITY_DEBUG_RENDER = 1000;
export const SYSTEM_PRIORITY_TILEMAP_UPDATE = 300;

export const EVENT_PRIORITY_NORMAL = 900;

/**
 * debug style
 */
export const DEBUG_BORDER_BLUE = 0;
export const DEBUG_BORDER_BLACK = 1;