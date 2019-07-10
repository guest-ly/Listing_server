const request = require('supertest');
const app = require('../server/index');

describe('Test path',()=>{
    test('it should response to GET method to /desc', async (done)=>{
        var num = Math.ceil(Math.random()*100)
        request(app)
        .get('/listing/desc/'+num)
        .set('Accept','application/json')
        .expect('Content-type',/json/)
        .expect(200)
        .end((err,res)=>{
            if(err) return done(err);
            done();
        })
    });
    test('it should response to GET method to /amenity', async (done)=>{
        var num = Math.ceil(Math.random()*100)
        request(app)
        .get('/listing/amenity/'+num)
        .set('Accept','application/json')
        .expect('Content-type',/json/)
        .expect(200)
        .end((err,res)=>{
            if(err) return done(err);
            done();
        })
    });
})