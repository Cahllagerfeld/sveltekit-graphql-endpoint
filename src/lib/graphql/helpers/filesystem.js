import fs from 'fs';

/**
 *
 * @param {String} path
 * @param {*} data
 */
export const write = (path, data) => {
    fs.writeFileSync(path, data, {encoding: "utf-8"})
};
