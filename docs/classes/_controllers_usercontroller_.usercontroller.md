[onpass-server](../README.md) › [Globals](../globals.md) › ["controllers/UserController"](../modules/_controllers_usercontroller_.md) › [UserController](_controllers_usercontroller_.usercontroller.md)

# Class: UserController

The controller for all things related to users

## Hierarchy

* **UserController**

## Index

### Methods

* [deleteUser](_controllers_usercontroller_.usercontroller.md#static-deleteuser)
* [editUser](_controllers_usercontroller_.usercontroller.md#static-edituser)
* [getOneById](_controllers_usercontroller_.usercontroller.md#static-getonebyid)
* [isLoggedIn](_controllers_usercontroller_.usercontroller.md#static-isloggedin)
* [listAll](_controllers_usercontroller_.usercontroller.md#static-listall)
* [newUser](_controllers_usercontroller_.usercontroller.md#static-newuser)

## Methods

### `Static` deleteUser

▸ **deleteUser**(`req`: Request, `res`: Response): *Promise‹Response‹any››*

*Defined in [controllers/UserController.ts:126](https://github.com/onpass/onpass-server/blob/fe98951/src/controllers/UserController.ts#L126)*

The function that deletes the user.
Request body must contain the user's id, which is a number.

**`summary`** Delete user

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`req` | Request | the request object |
`res` | Response | the response object |

**Returns:** *Promise‹Response‹any››*

___

### `Static` editUser

▸ **editUser**(`req`: Request, `res`: Response): *Promise‹Response‹any››*

*Defined in [controllers/UserController.ts:93](https://github.com/onpass/onpass-server/blob/fe98951/src/controllers/UserController.ts#L93)*

The function that modifies the user data.
Request body must contain the email, the username and the passowrd, all of which strings and the user's id, which is a number.

**`summary`** Modify user

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`req` | Request | the request object |
`res` | Response | the response object |

**Returns:** *Promise‹Response‹any››*

___

### `Static` getOneById

▸ **getOneById**(`req`: Request, `res`: Response): *Promise‹void›*

*Defined in [controllers/UserController.ts:39](https://github.com/onpass/onpass-server/blob/fe98951/src/controllers/UserController.ts#L39)*

The function that returns a user based on an id.
Request body must contain an id, which is a number.
Should not be exposed.

**`summary`** Get a single user based on id

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`req` | Request | the request object |
`res` | Response | the response object |

**Returns:** *Promise‹void›*

___

### `Static` isLoggedIn

▸ **isLoggedIn**(`req`: Request, `res`: Response): *Promise‹void›*

*Defined in [controllers/UserController.ts:141](https://github.com/onpass/onpass-server/blob/fe98951/src/controllers/UserController.ts#L141)*

**Parameters:**

Name | Type |
------ | ------ |
`req` | Request |
`res` | Response |

**Returns:** *Promise‹void›*

___

### `Static` listAll

▸ **listAll**(`req`: Request, `res`: Response): *Promise‹void›*

*Defined in [controllers/UserController.ts:20](https://github.com/onpass/onpass-server/blob/fe98951/src/controllers/UserController.ts#L20)*

The function that returns all users on a server.
Request body should be empty.
Should not be exposed.

**`summary`** Return all users on a server

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`req` | Request | the request object |
`res` | Response | the response object |

**Returns:** *Promise‹void›*

___

### `Static` newUser

▸ **newUser**(`req`: Request, `res`: Response): *Promise‹Response‹any››*

*Defined in [controllers/UserController.ts:63](https://github.com/onpass/onpass-server/blob/fe98951/src/controllers/UserController.ts#L63)*

The function that creates a new user.
Request body must contain the email, the username and the passowrd, all of which strings.

**`summary`** Create new user

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`req` | Request | the request object |
`res` | Response | the response object |

**Returns:** *Promise‹Response‹any››*
