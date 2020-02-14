import { assert, expect } from 'chai';
import 'mocha';
import { isObject, isNumber, isString, isDate, isBoolean, isUndefined, isFunction } from '../lib/utils';

describe("utils", () => {

    it("can detect object", () => {
        expect(isObject({})).to.eql(true);
    });

    it("a number is not an object", () => {
        expect(isObject(5)).to.eql(false);        
    });

    it("a string is not an object", () => {
        expect(isObject("hello")).to.eql(false);
    });

    it("a date is not a object", () => {
        expect(isObject(new Date())).to.eql(false);
    });

    it("a array is not a object", () => {
        expect(isObject([])).to.eql(false);
    });

    it("a function is not a object", () => {
        expect(isObject(() => {})).to.eql(false);
    });
    
    it("can detect number", () => {
        expect(isNumber(5)).to.eql(true);
    });

    it("can detect string", () => {
        expect(isString("hello")).to.eql(true);
    });

    it("can detect date", () => {
        expect(isDate(new Date())).to.eql(true);
    });

    it("can detect boolean", () => {
        expect(isBoolean(true)).to.eql(true);
        expect(isBoolean(false)).to.eql(true);
    });
    
    it("can detect undefined", () => {
        expect(isUndefined(undefined)).to.eql(true);
        expect(isUndefined(null)).to.eql(false);
        expect(isUndefined(0)).to.eql(false);
    });

    it("can detect function", () => {
        expect(isFunction(() => {})).to.eql(true);
    });
});
