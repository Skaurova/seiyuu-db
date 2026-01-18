import type { AxiosAdapter, AxiosResponse } from "axios";
import { fileMap, FAKE_DELAY } from "./FakerService";

const fakerAdapter: AxiosAdapter = async (config) => {
    return new Promise(async (resolve, reject) => {
        const method = config.method?.toUpperCase() || "GET";
        const endpoint = `${method} ${config.url}`;

        const handler = fileMap[endpoint];

        if (!handler) {
            return reject({
                status: 404,
                config,
                data: { error: `Fake endpoint not found: ${endpoint}` },
            });
        }

        const fakeResponse = await handler(config);

        setTimeout(() => {
            const response: AxiosResponse = {
                data: fakeResponse.data,
                status: fakeResponse.status,
                statusText: fakeResponse.statusText,
                headers: fakeResponse.headers,
                config,
            };

            resolve(response);
        }, FAKE_DELAY);
    });
};

export default fakerAdapter;
