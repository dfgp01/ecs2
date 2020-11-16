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
export const SYSTEM_PRIORITY_ACTION = 50;
export const SYSTEM_PRIORITY_COLLIDE = 100;
export const SYSTEM_PRIORITY_POS_UPDATE = 800;
export const SYSTEM_PRIORITY_ISO_UPDATE = 810;
export const SYSTEM_PRIORITY_LISTENER = 200;
export const SYSTEM_PRIORITY_RENDER_UPDATE = 900;
export const SYSTEM_PRIORITY_FRAME_UPDATE = 1000;
export const SYSTEM_PRIORITY_DEBUG_RENDER = 1100;
export const SYSTEM_PRIORITY_TILEMAP_UPDATE = 300;

export const EVENT_PRIORITY_NORMAL = 900;

/**
 * debug style
 */
export const DEBUG_BORDER_BLACK = 0;
export const DEBUG_BORDER_BLUE = 1;
export const DEBUG_BORDER_GREEN = 2;
export const DEBUG_BORDER_RED = 3;
export const DEBUG_BORDER_YELLOW = 4;
export const DEBUG_BORDER_PINK = 5;
export const DEBUG_BORDER_GREENBLUE = 6;
export const DEBUG_BORDER_WHITE = 7;

export const DEBUG_FILL_BLACK = 129;
export const DEBUG_FILL_BLUE = 130;
export const DEBUG_FILL_GREEN = 131;
export const DEBUG_FILL_RED = 132;
export const DEBUG_FILL_YELLOW = 133;
export const DEBUG_FILL_PINK = 134;
export const DEBUG_FILL_GREENBLUE = 135;
export const DEBUG_FILL_WHITE = 136;