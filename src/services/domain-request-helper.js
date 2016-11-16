import lodash from 'lodash';

export class DomainPaginateHelper {
  constructor(req) {
    const sort = req.query.page_sort;
    if (sort) {
      this.sort = {};
      if (sort instanceof Array) {
        sort.forEach(field => {
          addSortField(this.sort, field);
        });
      } else {
        addSortField(this.sort, sort);
      }
    }
    this.offset = req.query.page_offset;
    this.limit = req.query.page_limit ? parseInt(req.query.page_limit) : 25;
    this.populate = req.query.page_populate;
    this.select = req.query.page_select;
  }

  setLimit(limit) {
    this.limit = limit;
  }

  setOffset(offset) {
    this.offset = offset;
  }

  setPopulate(populate) {
    this.populate = populate;
  }

  setSelect(select) {
    this.select = select;
  }

  setSort(sort) {
    this.sort = sort;
  }
}

function addSortField(sort, field) {
  if (field.charAt(0) === '-') {
    field = field.substring(1);
    lodash.set(sort, field, -1);
  } else {
    lodash.set(sort, field, 1);
  }
}