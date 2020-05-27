[onpass-server](../README.md) › [Globals](../globals.md) › ["entity/User"](../modules/_entity_user_.md) › [User](_entity_user_.user.md)

# Class: User

## Hierarchy

* **User**

## Index

### Properties

* [email](_entity_user_.user.md#email)
* [entries](_entity_user_.user.md#entries)
* [id](_entity_user_.user.md#id)
* [password](_entity_user_.user.md#password)
* [username](_entity_user_.user.md#username)

### Methods

* [checkPassword](_entity_user_.user.md#checkpassword)
* [hashPassword](_entity_user_.user.md#hashpassword)

## Properties

###  email

• **email**: *string*

*Defined in [entity/User.ts:21](https://github.com/onpass/onpass-server/blob/fe98951/src/entity/User.ts#L21)*

___

###  entries

• **entries**: *[Entry](_entity_entry_.entry.md)[]*

*Defined in [entity/User.ts:27](https://github.com/onpass/onpass-server/blob/fe98951/src/entity/User.ts#L27)*

___

###  id

• **id**: *number*

*Defined in [entity/User.ts:13](https://github.com/onpass/onpass-server/blob/fe98951/src/entity/User.ts#L13)*

___

###  password

• **password**: *string*

*Defined in [entity/User.ts:24](https://github.com/onpass/onpass-server/blob/fe98951/src/entity/User.ts#L24)*

___

###  username

• **username**: *string*

*Defined in [entity/User.ts:18](https://github.com/onpass/onpass-server/blob/fe98951/src/entity/User.ts#L18)*

## Methods

###  checkPassword

▸ **checkPassword**(`unencryptedPassword`: string): *boolean*

*Defined in [entity/User.ts:47](https://github.com/onpass/onpass-server/blob/fe98951/src/entity/User.ts#L47)*

Check the hashed password against an unencrypted password

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unencryptedPassword` | string | the password to check against  |

**Returns:** *boolean*

___

###  hashPassword

▸ **hashPassword**(`salt`: string): *void*

*Defined in [entity/User.ts:35](https://github.com/onpass/onpass-server/blob/fe98951/src/entity/User.ts#L35)*

Hash the password of the user. Always call before saving to the database

**`summary`** Hash user's password

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`salt` | string | "" | the salt to use for hashing |

**Returns:** *void*
