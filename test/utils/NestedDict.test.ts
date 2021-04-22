const assert = require("assert");
import NestedDict from "../../src/utils/NestedDict";

describe("Nested Dictionary Test", () => {
    let testObject: any = {};
    NestedDict.assign(testObject, ["first", "second", "third"], "test value");
    NestedDict.assign(testObject, ["peepee"], "poopoo");
    NestedDict.assign(testObject, ["funny_number", "sex_number"], 69);
    NestedDict.assign(testObject, ["funny_number", "weed_number"], 420);

    it("Should return all nested entries + value", () => {
        assert.equal(testObject.first.second.third, "test value");
    });

    it("should return \"poopoo\"", () => {
        assert.equal(testObject.peepee, "poopoo");
    });

    it("should return 69", () => {
        assert.equal(testObject.funny_number.sex_number, 69);
    })

    it("should return 420", () => {
        assert.equal(testObject.funny_number.weed_number, 420);
    });
});