const paginate = (req, defaultLimit = 10) => {
  const page = +req.query.page || 1
  const page_size = +req.query.page_size || defaultLimit
  const offset = (page - 1) * page_size
  return { offset, page_size, page }
}

const generatePaginatedResult = (data, { total, page, page_size }) => {
  const totalPages = Math.ceil(total / page_size)
  return {
    data,
    meta: {
      total,
      page,
      pages: totalPages,
    },
  }
}

export { paginate, generatePaginatedResult }
