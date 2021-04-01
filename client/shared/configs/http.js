/**
 * HTTP config module.
 *
 * @module configs/http
 */

import server from '@/../server/core/configs/server';

const { protocol, hostname, port } = window.location;

export default {
  baseURL: `${protocol}//${hostname}${port ? `:${server.port}` : ''}/api/`
};
