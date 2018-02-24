import { expect } from 'chai'
import 'mocha'

import { MessageWith0ArgMarshaller } from './messages'


describe('MessageWith0ArgMarshaller', () => {
    it('quick-extract', () => {
        const marshaller = new MessageWith0ArgMarshaller();
        expect(marshaller.extract([['en', 'Hello'], ['ro', 'Salut']]))
            .to.eql({ 'en': 'Hello', 'ro': 'Salut' });
    });

    it('quick-pack', () => {
        const marshaller = new MessageWith0ArgMarshaller();
        expect(marshaller.pack({ 'en': 'Hello', 'ro': 'Salut' }))
            .to.eql([['en', 'Hello'], ['ro', 'Salut']]);
    });
});
