# Currency 
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Installation](#-Installation)
- [How To Use It ?](#%E2%80%8D-How-To-Use-It-?)


<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

Make sure you have installed [Node.js](https://nodejs.org/en/download/)

Before using the program you need to execute a bunch of command to install the required library.

```sh
❯ cd /path/to/workspace/3-musketeers/currency
❯ npm install # or yarn install

```

What those line do ?
'npm install' will install all the packages specified in package.json if any file isn't specified after install.

## How To Use It ?

1. The way to use it

	The program convert the amount of currency that you want to an other.
	
	To do so you have to give the amount then the initial currency and then the convert to currency.
```sh
 #Example
❯ node cli.js 10 EUR USD
 #It wil convert 10 euro to US dollars
 
```

	To know the available currency you can execute these command
	
	
```sh
❯ node cli.js --all_currency

```

It will display a list of all available currency

2. Help() command 

	If tou need any help during your utilisation you can write this commands
	
```sh
❯ node cli.js --help

```
This will show u hox to use the code.


## Test
You can performe several test by entering the following command.


All the test code is available in the [index.test.js](/currency/index.test.js)
```sh
❯ npm test

```