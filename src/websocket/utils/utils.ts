import {IncomingMessage} from "node:http";


export const isTokenGodot = (token: string | null): boolean => {
    return token === process.env.GODOT_SERVER_TOKEN
}


export const extractTokenFromURL = (request: IncomingMessage): string | null => {
    const base = `http://${request.headers.host}`;
    const u = new URL(request.url || '/', base);
    return u.searchParams.get('token')
}