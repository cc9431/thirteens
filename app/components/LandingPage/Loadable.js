/**
 *
 * Asynchronously loads the component for AppContainer
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
