import { Router } from "express";

import Url from "../model/url.model.js";

const router = Router();

// GET /api/url
// Get all urls from db
/**
 * @swagger
 * /api/url:
 *  get:
 *    summary: Retrieves a list of urls
 *    description: Retrieve list of urls. Can be usefull for populate urls that are saved in db.
 *    responses:
 *      200:
 *        description: A list of urls
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        description: A url id
 *                        example: 0
 *                      url:
 *                        type: string
 *                        description: Name of the url string.
 *                        example: https://google.com
 */
router.get("/", async (req, res, next) => {
  try {
    const data = await Url.find({});
    if (data.length === 0) {
      const err = new Error();
      err.status = 500;
      err.message = "internal error.";
      throw err;
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// POST /api/url
// Store original url and get short url back
router.post("/", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

export default router;
