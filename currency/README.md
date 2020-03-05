# Currency 

##Installation
Before using the function you need to execute a bunch of command to install required library.

```sh
❯ cd /path/to/workspace/3-musketeers/currency
❯ npm install # or yarn install

```
What those line do ?
'npm install' will install all the packages specified in package.json if any file isn't specified after install.

##How To Use It ?
1. The way to use it
	The program is here to convert the amount of currency that you want to an other.
	To do so you have to give the alount then the initial currency and then the convert to currency.
```sh
❯ node cli.js 10 EUR USD
 #It wil convert 10 euro to US dollars

```
	To know the available currency you can execute these command
	```sh
❯ node cli.js --all_currency

```
	It will display a list of all available currency
2. Help() command 
	if tou need any help during your utilisation you can write this command line
```sh
❯ node cli.js --help

```
This will show u hox to use the code.

