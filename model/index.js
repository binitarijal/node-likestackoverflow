//database related , table name and all
const dbConfig = require("../config/dbConfig");
const{Sequelize, DataTypes }=require("sequelize");
//sequelize lai config diyera database connect gardey vaneko
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER,dbConfig.PASSWORD,
    {
        host:dbConfig.HOST,
        dialect:dbConfig.dialect,
        port:3307,
        
        pool:{
            max:dbConfig.pool.max,
            min:dbConfig.pool.min,
            acquire:dbConfig.pool.acquire,
            idle:dbConfig.pool.idle,
        },
    });

    sequelize
    .authenticate()
    .then(()=>{
        console.log("connected!!");
    })
    .catch((err)=>{
        console.log("error"+err);
    });
const db={};
db.Sequelize=Sequelize;
db.sequelize=sequelize

//importing model files
db.users=require("./userModel.js")(sequelize , DataTypes);

//migrating code
db.sequelize.sync({force:false}).then(()=>{
    console.log("yes resync done");
});

module.exports=db;