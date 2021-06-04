const cryptoHash = require('./crypto-hash');

describe('cryptoHash()', () => {

  it('generates a SHA-256 Hashed Output', () => {
    expect(cryptoHash('foo'))
      .toEqual('ae6fa5931c1f3a161c5ab71d08149a08977ff3d3948f42dc67dcf6c233547864');
  });
  
  it('produces the same hash with the same input arguments in any order', () => {
    expect(cryptoHash('one', 'two', 'three'))
      .toEqual(cryptoHash('three', 'one', 'two'))
  });

  it('produces a unique hash when the properties have changed on input', () => {
    const foo = {};
    const originalHash = cryptoHash(foo);
    foo['newVal'] = 'newVal';
    
    expect(cryptoHash(foo))
      .not.toEqual(originalHash);
  });
});