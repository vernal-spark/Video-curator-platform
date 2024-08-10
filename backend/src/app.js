const express=require('express')
const app=express();
const helmet=require('helmet')
const compression=require('compression')
const cors=require('cors')
const { errorHandler } = require("./middlewares/error");
const routes=require('./routes/index')
const httpStatus=require('http-status');
const ApiError = require('./utils/ApiError');
app.use(helmet());


app.use(express.json());


app.use(express.urlencoded({ extended: true }));


app.use(compression());


app.use(cors());
app.options("*", cors());

app.use('/v1',routes)

app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});


app.use(errorHandler);

module.exports=app;