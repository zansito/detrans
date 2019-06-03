
import { Label } from './label';

describe('Label', function() {

  const label = new Label('someLabel');

  it('Should have default params', function() {
    expect(label.i18n).toEqual(true);
    expect(label.alignment).toEqual('left');
  });

  it('Should have toString implementation with "value" prop', function() {
    expect(label.toString()).toEqual(label.value);
  })
});
