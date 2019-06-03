
import { DatatablePage } from './datatable-page';

const DEFAULT_URL = '/some/url';

describe('DatatablePage', function() {

  const page = new DatatablePage(DEFAULT_URL);

  it('Should have default params', function() {
    expect(page.rows).toEqual([]);
  });
});

describe('DatatablePage Pagination', function() {

  // let page;

  // beforeEach(() => {
    const page = new DatatablePage(DEFAULT_URL);
  // });

  it('Should start with default pagination params', function() {
    expect(page.number).toEqual(1);
    expect(page.offset).toEqual(0);
    expect(page.limit).toEqual(10);
    expect(page.hasPrev).toEqual(false);
    expect(page.hasNext).toEqual(false);
  });

  // getUrl
  // setRows (__paginate, __removeExtraItems)

  it('Should not back page if at first', function() {
    page.prev();
    expect(page.number).toEqual(1);
    expect(page.offset).toEqual(0);
  });

  it('Should not advance if don\'t has next', function() {

    let oldHasPrev = page.hasPrev,
      oldOffset = page.offset,
      oldNumber = page.number;

    page.hasNext = false;
    page.next();

    expect(page.hasPrev).toEqual(oldHasPrev);
    expect(page.offset).toEqual(oldOffset);
    expect(page.number).toEqual(oldNumber);
  });

  it('Should advance', function() {
    page.hasNext = true;
    page.next();
    expect(page.hasPrev).toEqual(true);
    expect(page.offset).toEqual(10);
    expect(page.number).toEqual(2);
  });

  it('Should prev', function() {
    page.prev();
    expect(page.hasPrev).toEqual(true);
    expect(page.offset).toEqual(0);
    expect(page.number).toEqual(1);
  });
});
