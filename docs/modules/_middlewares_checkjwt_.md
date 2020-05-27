[onpass-server](../README.md) › [Globals](../globals.md) › ["middlewares/checkJwt"](_middlewares_checkjwt_.md)

# Module: "middlewares/checkJwt"

## Index

### Variables

* [config](_middlewares_checkjwt_.md#const-config)

### Functions

* [checkJwt](_middlewares_checkjwt_.md#const-checkjwt)

## Variables

### `Const` config

• **config**: *any* = require("../config.json")

*Defined in [middlewares/checkJwt.ts:3](https://github.com/onpass/onpass-server/blob/fe98951/src/middlewares/checkJwt.ts#L3)*

## Functions

### `Const` checkJwt

▸ **checkJwt**(`req`: Request, `res`: Response, `next`: NextFunction): *Promise‹Response‹any››*

*Defined in [middlewares/checkJwt.ts:13](https://github.com/onpass/onpass-server/blob/fe98951/src/middlewares/checkJwt.ts#L13)*

Verify that the cookie contains the JWT token and set it to request locals.
Must be called before each function that requires authentication.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`req` | Request | the request object |
`res` | Response | the response object |
`next` | NextFunction | next middleware function to call  |

**Returns:** *Promise‹Response‹any››*
