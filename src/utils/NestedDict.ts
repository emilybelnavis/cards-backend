export default abstract class NestedDict {
    static assign(object: any, keyPath: string[], value: string | number) {
        let lastKeyIndex = keyPath.length - 1;
        for (let i = 0; i < lastKeyIndex; ++i) {
            let key = keyPath[i]
            if (!(key in object)) {
                object[key] = {}
            }
            object = object[key];
        }
        object[keyPath[lastKeyIndex]] = value;
    }
}