import {ProtectedPhishingRoutes, OpenPhishingRoutes} from './phishing'
import accountRoutes from './accounts'

export const GlobalRoutes =  [accountRoutes,OpenPhishingRoutes]
export const ProtectedRoutes = [ProtectedPhishingRoutes]

