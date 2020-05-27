[onpass-server](../README.md) › [Globals](../globals.md) › ["controllers/AuthController"](../modules/_controllers_authcontroller_.md) › [AuthController](_controllers_authcontroller_.authcontroller.md)

# Class: AuthController

The controller for all things related to authentication

## Hierarchy

* **AuthController**

## Index

### Methods

* [check](_controllers_authcontroller_.authcontroller.md#static-check)
* [login](_controllers_authcontroller_.authcontroller.md#static-login)
* [logout](_controllers_authcontroller_.authcontroller.md#static-logout)

## Methods

### `Static` check

▸ **check**(`req`: Request, `res`: Response): *Promise‹void›*

*Defined in [controllers/AuthController.ts:79](https://github.com/onpass/onpass-server/blob/fe98951/src/controllers/AuthController.ts#L79)*

The function that checks if the user is logged in.
Request body should be empty.

**`summary`** Check log in

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`req` | Request | the request object |
`res` | Response | the response object |

**Returns:** *Promise‹void›*

___

### `Static` login

▸ **login**(`req`: Request, `res`: Response): *Promise‹void›*

*Defined in [controllers/AuthController.ts:21](https://github.com/onpass/onpass-server/blob/fe98951/src/controllers/AuthController.ts#L21)*

The function that authenticates a user and creates a cookie.
Request body must contain the username and the password, both of which are string.

**`summary`** Authenticate a user

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`req` | Request | the request object |
`res` | Response | the response object |

**Returns:** *Promise‹void›*

___

### `Static` logout

▸ **logout**(`req`: Request, `res`: Response): *Promise‹void›*

*Defined in [controllers/AuthController.ts:64](https://github.com/onpass/onpass-server/blob/fe98951/src/controllers/AuthController.ts#L64)*

The function that logs out a user and destroys the cookie.
Request body should be empty.

**`summary`** Log out a user

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`req` | Request | the request object |
`res` | Response | the response object |

**Returns:** *Promise‹void›*
