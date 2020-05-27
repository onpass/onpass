[onpass-server](../README.md) › [Globals](../globals.md) › ["entity/Entry"](../modules/_entity_entry_.md) › [Entry](_entity_entry_.entry.md)

# Class: Entry

## Hierarchy

* **Entry**

## Index

### Properties

* [id](_entity_entry_.entry.md#id)
* [login](_entity_entry_.entry.md#login)
* [password](_entity_entry_.entry.md#password)
* [user](_entity_entry_.entry.md#user)
* [website](_entity_entry_.entry.md#website)

### Methods

* [decryptData](_entity_entry_.entry.md#decryptdata)
* [encryptData](_entity_entry_.entry.md#encryptdata)

## Properties

###  id

• **id**: *number*

*Defined in [entity/Entry.ts:13](https://github.com/onpass/onpass-server/blob/fe98951/src/entity/Entry.ts#L13)*

___

###  login

• **login**: *string*

*Defined in [entity/Entry.ts:19](https://github.com/onpass/onpass-server/blob/fe98951/src/entity/Entry.ts#L19)*

___

###  password

• **password**: *string*

*Defined in [entity/Entry.ts:22](https://github.com/onpass/onpass-server/blob/fe98951/src/entity/Entry.ts#L22)*

___

###  user

• **user**: *[User](_entity_user_.user.md)*

*Defined in [entity/Entry.ts:25](https://github.com/onpass/onpass-server/blob/fe98951/src/entity/Entry.ts#L25)*

___

###  website

• **website**: *string*

*Defined in [entity/Entry.ts:16](https://github.com/onpass/onpass-server/blob/fe98951/src/entity/Entry.ts#L16)*

## Methods

###  decryptData

▸ **decryptData**(): *void*

*Defined in [entity/Entry.ts:46](https://github.com/onpass/onpass-server/blob/fe98951/src/entity/Entry.ts#L46)*

Decrypt the entry's data before sending it in a request
Uses the user's hashed password as the key

**`summary`** Decrypt entry's data

**Returns:** *void*

___

###  encryptData

▸ **encryptData**(): *void*

*Defined in [entity/Entry.ts:33](https://github.com/onpass/onpass-server/blob/fe98951/src/entity/Entry.ts#L33)*

Encrypt the entry's data before storing it in a database
Uses the user's hashed password as the key

**`summary`** Encrypt entry's data

**Returns:** *void*
