import { expect } from 'chai'
import 'mocha'

import { devOnly } from './dev-only'
import { Env } from './env'


describe('devOnly', () => {
    class X {
        @devOnly(Env.Local)
        localFn(): string { return 'A'; }

        @devOnly(Env.Local)
        localFn2Args(x: number, y: number): number { return x + y; }

        @devOnly(Env.Test)
        testFn(): string { return 'B'; }

        @devOnly(Env.Staging)
        stagingFn(): string { return 'C'; }

        @devOnly(Env.Prod)
        prodFn(): string { return 'D'; }
    }

    it('should allow calling when the environment is local', () => {
        const x = new X();
        expect(x.localFn()).to.eql('A');
    });

    it('should preserve arguments when the environment is local', () => {
        const x = new X();
        expect(x.localFn2Args(10, 30)).to.eql(40);
    });

    it('should allow calling when the environment is test', () => {
        const x = new X();
        expect(x.testFn()).to.eql('B');
    });

    it('should allow calling when the environment is staging', () => {
        const x = new X();
        expect(x.stagingFn()).to.eql('C');
    });

    it('should throw when the environment is prod', () => {
        const x = new X();
        expect(() => x.prodFn()).to.throw('Calling dev only code in a non-dev environment');
    });
});
