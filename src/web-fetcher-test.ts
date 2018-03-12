import { expect } from 'chai'
import 'mocha'
import * as td from 'testdouble'

import { InternalWebFetcher, ApiGatewayWebFetcher } from './web-fetcher'


describe('InternalWebFetcher', () => {
    afterEach('reset test doubles', () => {
        td.reset();
    });

    it('can be constructed', () => {
        const fetcher = new InternalWebFetcher();
        expect(fetcher).is.not.null;
    });

    it('invokes fetch', () => {
        const fetch = td.replace(global, 'fetch');

        const fetcher = new InternalWebFetcher();
        fetcher.fetch('http://localhost:10003', { method: 'GET' });

        td.verify(fetch('http://localhost:10003', { method: 'GET' }));
    });
});


describe('ApiGatewayWebFetcher', () => {
    it('can be constructed', () => {
        const fetcher = new ApiGatewayWebFetcher('http://localhost:10000');
        expect(fetcher).is.not.null;
    });

    afterEach('reset test doubles', () => {
        td.reset();
    });

    it('invokes fetch', () => {
        const fetch = td.replace(global, 'fetch');

        const fetcher = new ApiGatewayWebFetcher('http://localhost:10000');

        fetcher.fetch('http://localhost:10003', { method: 'GET' });

        td.verify(fetch('http://localhost:10000/real/api-gateway', {
            method: 'POST',
            cache: 'no-cache',
            redirect: 'error',
            referrer: 'client',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uri: 'http://localhost:10003',
                options: { method: 'GET' }
            })
        }));
    });
});
