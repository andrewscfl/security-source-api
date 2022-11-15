import {Router} from 'express'

export interface GlobalRouteHandler {
    path: string,
    handler: Router
}
