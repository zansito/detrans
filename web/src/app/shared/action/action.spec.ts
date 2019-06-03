
import { Action } from './action';

describe('Action', function() {

  it('Should have default params', function() {

    const action = new Action('someMethodName');

    expect(action.event).toEqual('click');
    expect(action.args).toEqual([]);
  });
});
