[onpass-server](../README.md) › [Globals](../globals.md) › ["controllers/EntryController"](../modules/_controllers_entrycontroller_.md) › [EntryController](_controllers_entrycontroller_.entrycontroller.md)

# Class: EntryController

The controller for all things related to entries

## Hierarchy

* **EntryController**

## Index

### Methods

* [deleteEntry](_controllers_entrycontroller_.entrycontroller.md#static-deleteentry)
* [editEntry](_controllers_entrycontroller_.entrycontroller.md#static-editentry)
* [getAllByWebsite](_controllers_entrycontroller_.entrycontroller.md#static-getallbywebsite)
* [getOneById](_controllers_entrycontroller_.entrycontroller.md#static-getonebyid)
* [listAll](_controllers_entrycontroller_.entrycontroller.md#static-listall)
* [newEntry](_controllers_entrycontroller_.entrycontroller.md#static-newentry)
* [newPassword](_controllers_entrycontroller_.entrycontroller.md#static-newpassword)

## Methods

### `Static` deleteEntry

▸ **deleteEntry**(`req`: Request, `res`: Response): *Promise‹void›*

*Defined in [controllers/EntryController.ts:280](https://github.com/onpass/onpass-server/blob/fe98951/src/controllers/EntryController.ts#L280)*

The function that deltes an entry by id.
Must call the checkJwt middleware before this is executed.
Request body must the id, which is a number.

**`summary`** Delete an entry

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`req` | Request | the request object |
`res` | Response | the response object |

**Returns:** *Promise‹void›*

___

### `Static` editEntry

▸ **editEntry**(`req`: Request, `res`: Response): *Promise‹void›*

*Defined in [controllers/EntryController.ts:233](https://github.com/onpass/onpass-server/blob/fe98951/src/controllers/EntryController.ts#L233)*

The function that modifies an entry by id.
Must call the checkJwt middleware before this is executed.
Request body must contain the website, the login and the passowrd, all of which strings and the id, which is a number.

**`summary`** Modify an entry

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`req` | Request | the request object |
`res` | Response | the response object |

**Returns:** *Promise‹void›*

___

### `Static` getAllByWebsite

▸ **getAllByWebsite**(`req`: Request, `res`: Response): *Promise‹void›*

*Defined in [controllers/EntryController.ts:150](https://github.com/onpass/onpass-server/blob/fe98951/src/controllers/EntryController.ts#L150)*

The function that returns all entries for a website for a user in a cookie.
Must call the checkJwt middleware before this is executed.
Request body must contain the website, which is a string.

**`summary`** Get all entries for a website for a user

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`req` | Request | the request object |
`res` | Response | the response object |

**Returns:** *Promise‹void›*

___

### `Static` getOneById

▸ **getOneById**(`req`: Request, `res`: Response): *Promise‹void›*

*Defined in [controllers/EntryController.ts:123](https://github.com/onpass/onpass-server/blob/fe98951/src/controllers/EntryController.ts#L123)*

The function that returns a single entry by id.
Must call the checkJwt middleware before this is executed.
Request body must contain the id parameter, which is a number.

**`summary`** Generate an entry for an id from a request

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`req` | Request | the request object |
`res` | Response | the response object |

**Returns:** *Promise‹void›*

___

### `Static` listAll

▸ **listAll**(`req`: Request, `res`: Response): *Promise‹void›*

*Defined in [controllers/EntryController.ts:89](https://github.com/onpass/onpass-server/blob/fe98951/src/controllers/EntryController.ts#L89)*

The function that returns all entries for a user that's stored in a cookie.
Must call the checkJwt middleware before this is executed.
Request body should be empty.

**`summary`** Generate a new password from a request

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`req` | Request | the request object |
`res` | Response | the response object |

**Returns:** *Promise‹void›*

___

### `Static` newEntry

▸ **newEntry**(`req`: Request, `res`: Response): *Promise‹void›*

*Defined in [controllers/EntryController.ts:185](https://github.com/onpass/onpass-server/blob/fe98951/src/controllers/EntryController.ts#L185)*

The function that creates a new entry for a user in a cookie.
Must call the checkJwt middleware before this is executed.
Request body must contain the website, the login and the passowrd, all of which strings.

**`summary`** Create a new entry

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`req` | Request | the request object |
`res` | Response | the response object |

**Returns:** *Promise‹void›*

___

### `Static` newPassword

▸ **newPassword**(`req`: Request, `res`: Response): *Promise‹void›*

*Defined in [controllers/EntryController.ts:24](https://github.com/onpass/onpass-server/blob/fe98951/src/controllers/EntryController.ts#L24)*

The function that generates a new password based on a request.
Request body must contain length and flags for letters, numbers and symbols.

**`summary`** Generate a new password from a request

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`req` | Request | the request object |
`res` | Response | the response object |

**Returns:** *Promise‹void›*
