// const chai = require("chai");
// const chaiHttp = require("chai-http");
const request = require("supertest");

const app = require("../src/app.js");

// chai.should();
// chai.use(chaiHttp);

// describe("Test API", () => {
//   it("Should just test", (done) => {
//     chai
//       .request(app)
//       .get("/hello")
//       .end((err, res) => {
//         res.should.have.status(200);
//         done();
//       });
//   });
// });

describe("Test API", () => {
  test("should test api", () => {
    return request(app)
      .get("/")
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
});
