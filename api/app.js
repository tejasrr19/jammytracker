"use strict";

const koa = require("koa");
const router = require("koa-router")();
const cors = require("koa-cors");
const request = require("request-promise");
const config = require("../config/api_config.json");
// Constants
const PORT = 3000;

// App
const app = new koa();

router.get("/detailedStats", async (ctx, next) => {
  var query = ctx.query;
  var options = {
    uri: `${config.bftracker_url}/Stats/DetailedStats?platform=${
      query.platform
    }&displayName=${query.displayName}`,
    json: true,
    headers: {
      "Content-Type": "application/json",
      "TRN-Api-Key": config.bftracker_api_key
    }
  };
  try {
    var result = await request(options);
    ctx.body = result;
  } catch (e) {
    console.error(e);
  }
});

app.use(router.routes());

app.listen(PORT);
