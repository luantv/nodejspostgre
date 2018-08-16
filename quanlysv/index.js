var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
var pg = require('pg');
app.listen(3000);

var config = {
  user: 'postgre',
  database: 'sinhvien',
  password: '12345',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
};
var pool = new pg.Pool(config);

app.get("/sinhvien/list", function(req, res) {
	pool.connect(function(err, client, done) {
		if (err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('SELECT * FROM sinhvien', function(err, result) {
			done();

			if (err) {
				res.end();
				return console.error('error running query', err);
			}
			// console.log(result.rows[0].hoten);
			res.render("sinhvien_list", {danhsach:result});
		});
	});
});

app.get("/sinhvien/them", function(req, res) {
	res.render("sinhvien_insert");
});

app.post("/sinhvien/them", function(req, res) {

});


app.get("/", function(req, res){
	res.render("main");
});