import { invokeUserFn, loadUserFn } from "./lib/user-fn";
import "./lib/load-globals";
import { isArray } from "../lib/utils";
import { inputJson, outputJson } from "../lib/io";

async function main() {
    const argv = process.argv.slice(2);
    const keySelectorFn = loadUserFn(argv, `r => r.key`);
    const valueSelectorFn = loadUserFn(argv, `r => r.value`);

    const data = await inputJson();
    if (!isArray(data)) {
        throw new Error(`Expected input to 'to-object' to be an array.`);
    }

    const reduced = data.reduce((a: any, r: any) => {
        const key = invokeUserFn({
            fn: () => keySelectorFn.fn(r),
            loadSourceCode: keySelectorFn.loadSourceCode,
            fileName: keySelectorFn.fileName,
        });
        const value = invokeUserFn({
            fn: () => valueSelectorFn.fn(r),
            loadSourceCode: valueSelectorFn.loadSourceCode,
            fileName: valueSelectorFn.fileName,
        });
        a[key] = value;
        return a;
    }, {});

    outputJson(reduced);
}

main()
    .catch(err => {
        console.error(`Failed with error:`);
        console.error(err);
        process.exit(1);
    });