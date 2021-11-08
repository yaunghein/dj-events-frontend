"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  //create events with attached user
  async create(context) {
    let entity;
    if (context.is("multipart")) {
      const { data, files } = parseMultipartData(context);
      data.user = context.state.user.id;
      entity = await strapi.services.events.create(data, { files });
    } else {
      context.request.body.user = context.state.user.id;
      entity = await strapi.services.events.create(context.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.events });
  },

  //update login user's events
  async update(context) {
    const { id } = context.params;

    let entity;

    const [events] = await strapi.services.events.find({
      id: context.params.id,
      "user.id": context.state.user.id,
    });

    if (!events) {
      return context.unauthorized(`You can't update this entry`);
    }

    if (context.is("multipart")) {
      const { data, files } = parseMultipartData(context);
      entity = await strapi.services.events.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.events.update(
        { id },
        context.request.body
      );
    }

    return sanitizeEntity(entity, { model: strapi.models.events });
  },

  // Delete a user event
  async delete(context) {
    const { id } = context.params;

    const [events] = await strapi.services.events.find({
      id: context.params.id,
      "user.id": context.state.user.id,
    });

    if (!events) {
      return context.unauthorized(`You can't delete this entry`);
    }

    const entity = await strapi.services.events.delete({ id });
    return sanitizeEntity(entity, { model: strapi.models.events });
  },

  //get events for login user
  async me(context) {
    const loginUser = context.state.user;
    //check if there is no login user
    if (!loginUser) {
      return context.badRequest(null, [
        { messages: [{ id: "No userization header was found." }] },
      ]);
    }

    //if there is a login user, give me all the events related to that user's id
    const data = await strapi.services.events.find({ user: loginUser.id });
    if (!data) {
      return context.notFound();
    }

    return sanitizeEntity(data, { model: strapi.models.events });
  },
};
