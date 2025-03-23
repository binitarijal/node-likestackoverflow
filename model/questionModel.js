module.exports=(sequelize,DataTypes)=>{
    const Questions=sequelize.define("questions",{
        title:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        image:{
            type:DataTypes.STRING,
            
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    })
    return Questions;
}