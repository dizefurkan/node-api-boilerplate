module.exports = {
  development: {
    url: 'postgres://postgres:12345@localhost:5432/nodeapi',
    dialect: 'postgres'
  },
  test: {
    url: process.env.database || 'postgres://postgres:12345@localhost:5432/nodeapi',
    dialect: 'postgres'
  },
  production: {
    url: process.env.database || 'postgres://postgres:12345@localhost:5432/nodeapi',
    dialect: 'postgres'
  }
};
