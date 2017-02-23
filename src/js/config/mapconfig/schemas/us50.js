import {toNumber} from 'lodash';

const convertPostaltoFIPS = require('us-abbreviations')('postal','fips');
const convertPostaltoFullFips = require('us-abbreviations')('full','fips');

const toTitleCase = require('./../../../util/helper.js').toTitleCase;

const us = {
		label: 'U.S. 50 State',
		name: 'states50',
		proj: 'albersUsa',
		translate: [310, 165],
		translateCartogram: [270, 165],
		precision: 1,
		scale: 710,
		topojson : require('./../mapfiles/us-50/us-states-sorted.json'),
		feature: 'states',
		adjustLabels: function(adjusty=-4,adjustx=-4, label) {

			if (label == 'VT') {
				adjusty = -25;
			}
			if (label == 'NH') {
				adjustx = 25;
				adjusty = -5;
			}
			if (label == 'MA') {
				adjusty = -3;
				adjustx = 26;
			}
			if (label == 'RI') {
				adjustx = 16;
				adjusty = 2;
			}
			if (label == 'CT') {
				adjustx = 12;
				adjusty = 12;
			}
			if (label == 'NJ') {
				adjustx = 15;
			}
			if (label == 'DC') {
				label = '';
			}
			if (label == 'DE') {
				adjustx = 31;
				adjusty = -5;
			}
			if (label == 'MD') {
				adjustx = 31;
				adjusty = 10;
			}
			if (label == 'FL') {
				adjustx = 9;
			}
			if (label == 'LA') {
				adjustx = -4;
			}
			if (label == 'HI') {
				adjustx = -12;
			}
			if (label == 'PA') {
				adjustx = 0;
			}
			if (label == 'WA') {
				adjustx = 0;
			}
			if (label == 'AZ') {
				adjustx = 4;
				adjusty = 4;
			}
			if (label == 'NY') {
				adjusty = -7;
			}
			if (label == 'IA') {
				adjusty = -2;
				adjustx = -1;
			}
			if (label == 'OR') {
				adjusty = 2;
				adjustx = -2;
			}

			return [adjusty,adjustx,label];
		},
		matchLogic(input) {
			if (typeof input == 'string') {
				input = toTitleCase(input.trim());
				if (input.length === 2) input = input.toUpperCase();
			}

			return toNumber(convertPostaltoFIPS(input)) || toNumber(convertPostaltoFullFips(input)) || toNumber(input);
		},
		test: function(column_val, polygon_val) {
			 if (typeof column_val == 'string') {
				column_val = toTitleCase(column_val.trim());
				if (column_val.length === 2) column_val = column_val.toUpperCase();
			}

			const column_val_converted = this.matchLogic(column_val); //

			return (toNumber(column_val_converted) == toNumber(polygon_val.id));
		}
	}

module.exports = us;
