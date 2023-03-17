let postModel = require('../models/postModel')
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('/GET POSTS', ()=>{
    it('it should GET all the posts', (done)=>{
        chai.request(server)
        .get('/api/all_posts')
        .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.be.a('array');
        done()
        })
    })
})