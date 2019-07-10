const request = require('supertest');
const app = require('../server/index');

describe('Test the root path',()=>{
    test('it should response to GET method to /desc',  (done)=>{
        request(app)
        .get('/listing/desc/1')
        .set('Accept','application/json')
        .expect('Content-type',/json/)
        .expect(200)
        .end((err,res)=>{
            if(err) return done(err);
            done();
        })
    });
    test('it should response to GET method to /amenity',  (done)=>{
        request(app)
        .get('/listing/amenity/1')
        .set('Accept','application/json')
        .expect('Content-type',/json/)
        .expect(200)
        .end((err,res)=>{
            if(err) return done(err);
            done();
        })
    });
})