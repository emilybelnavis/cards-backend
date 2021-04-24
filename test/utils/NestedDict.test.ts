const assert = require("assert");
import NestedDict from "../../src/utils/NestedDict";

describe("Nested Dictionary Test", () => {
    let testObject: {[key: string]: any} = {};
    NestedDict.assign(testObject, ["ha_ha", "peepee"], "poopoo");
    NestedDict.assign(testObject, ["funny_number", "sex_number"], 69);
    NestedDict.assign(testObject, ["funny_number", "weed_number"], 420);

    it("should return \"poopoo\"", () => {
        assert.equal(testObject.ha_ha.peepee, "poopoo");
    });

    it("should return 69", () => {
        assert.equal(testObject.funny_number.sex_number, 69);
    })

    it("should return 420", () => {
        assert.equal(testObject.funny_number.weed_number, 420);
    });
});