export enum TILE_STATUS {
    WHITE = 'WHITE',
    BLACK = 'BLACK',
    AVAILABLE = 'AVAILABLE',
}

export enum PLAYERACTIONTYPE{
    SELECT_BLACK = 'SELECT_BLACK',
    SELECT_WHITE = 'SELECT_WHITE'
   
}

export const API_HOST = process.env.REACT_APP_API_HOST || ''