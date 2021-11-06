const slugify = require("slugify");

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      if (data.name) {
        data.slug = slugify(data.name, { lower: true });
      }
    },
    beforeUpdate: async (data) => {
      if (data.name) {
        data.slug = slugify(data.name, { lower: true });
      }
    },
  },
};
