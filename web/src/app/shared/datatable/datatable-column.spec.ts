import { DatatableColumn } from './datatable-column';

describe('DatatableColumn', function() {

  it('Should have default params', function() {

    const column = new DatatableColumn('someProp');

    expect(column.size).toEqual(1);
    expect(column.alignment).toEqual('left');
  });
});
