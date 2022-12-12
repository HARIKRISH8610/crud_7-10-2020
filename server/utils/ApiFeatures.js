class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    const queryObj = { ...this.queryString };
    const excludeQuery = ["sort", "limit", "fields", "page"];
    excludeQuery.map((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      console.log(sortBy);
      this.query.sort(sortBy);
    }
    return this;
  }
  fields() {
    if (this.queryString.fields) {
      const fieldBy = this.queryString.fields.split(",").join(" ");
      this.query.select(fieldBy);
    } else {
      this.query.select("-__v");
    }
    return this;
  }
  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = ApiFeatures;
