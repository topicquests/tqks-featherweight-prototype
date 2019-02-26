#!/usr/bin/env node
'use strict';
const importLocal = require('..');

const localFile = importLocal(__filename);

if (localFile) {
	console.log('local');
}
